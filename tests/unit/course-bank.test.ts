import { describe, expect, it, vi } from "vitest";
import {
  COURSE_BANK_CACHE_KEY,
  COURSE_BANK_CACHE_TTL_MS,
  fetchCourseBankCatalog,
  loadCourseBankCatalog,
  readCourseBankCache,
  writeCourseBankCache,
  type StorageLike,
} from "../../src/scripts/course-bank/cache";
import {
  buildCourseFileUrl,
  getCourseFileColor,
  isSafePath,
  isSafePathSegment,
  parseCourseBankCatalog,
  type CourseBankCatalog,
} from "../../src/scripts/course-bank/catalog";
import {
  courseBankCatalogFixture as catalog,
  courseBankRevision,
} from "../fixtures/course-bank";

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();
  removed: string[] = [];
  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
  removeItem(key: string): void {
    this.removed.push(key);
    this.values.delete(key);
  }
}

const response = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

describe("course-bank v2 catalog", () => {
  it("validates the complete manifest and its generated UI inventory", () => {
    const parsed = parseCourseBankCatalog(catalog);
    expect(parsed).toEqual(catalog);
    expect(parsed?.categories.map(({ id }) => id)).toEqual([
      "foundations",
      "advanced",
      "cyber",
      "living",
      "future",
    ]);
    expect(parsed?.categories.map(({ courses }) => courses.length)).toEqual([
      9, 12, 6, 12, 11,
    ]);
    expect(parsed?.categories.flatMap(({ courses }) => courses)).toHaveLength(
      50,
    );
  });

  it("rejects malformed revisions, traversal, unsafe hosts, and mismatched file paths", () => {
    expect(
      parseCourseBankCatalog({ ...catalog, sourceRevision: "main" }),
    ).toBeNull();
    expect(
      parseCourseBankCatalog({
        ...catalog,
        repository: {
          rawBase: "https://raw.githubusercontent.com.example.test/repository",
        },
      }),
    ).toBeNull();
    const invalid = structuredClone(catalog);
    invalid.categories[0].courses[0].files[0].path = "../private.pdf";
    expect(parseCourseBankCatalog(invalid)).toBeNull();

    const duplicateCode = structuredClone(catalog);
    duplicateCode.categories[0].courses[1].code =
      duplicateCode.categories[0].courses[0].code;
    expect(parseCourseBankCatalog(duplicateCode)).toBeNull();

    const mismatchedFilename = structuredClone(catalog);
    mismatchedFilename.categories[0].courses[0].files[0].filename =
      "Different.pdf";
    expect(parseCourseBankCatalog(mismatchedFilename)).toBeNull();
  });

  it("encodes each segment and pins files to the validated revision", () => {
    expect(
      buildCourseFileUrl(
        "https://raw.githubusercontent.com/GE-Union/CourseBank",
        courseBankRevision,
        "polytechnical-foundations/maths1a/Exam #1 + løsning.pdf",
      ),
    ).toBe(
      `https://raw.githubusercontent.com/GE-Union/CourseBank/${courseBankRevision}/polytechnical-foundations/maths1a/Exam%20%231%20%2B%20l%C3%B8sning.pdf`,
    );
    expect(() =>
      buildCourseFileUrl("https://example.com", courseBankRevision, "../x"),
    ).toThrow("Unsafe course-bank URL");
  });

  it("accepts safe Unicode paths and rejects hidden or traversing segments", () => {
    expect(isSafePath("living-systems/Notes Søren.pdf")).toBe(true);
    for (const unsafe of ["", ".", "..", ".hidden", "../x", "a\\b", "a\0b"]) {
      expect(isSafePathSegment(unsafe), unsafe).toBe(false);
    }
  });

  it("keeps file display colors and a stable fallback", () => {
    expect(getCourseFileColor("pdf")).toBe("#D32F2F");
    expect(getCourseFileColor("IPYNB")).toBe("#F37C2F");
    expect(getCourseFileColor("py")).toBe("#1e73be");
  });

  it("uses normal browser caching for the remote manifest", async () => {
    const fetchImpl = vi.fn(async () => response(catalog));
    await expect(
      fetchCourseBankCatalog(
        "https://example.com/catalog.v2.json",
        fetchImpl as unknown as typeof fetch,
      ),
    ).resolves.toEqual(catalog);
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/catalog.v2.json",
      expect.objectContaining({ cache: "default" }),
    );
  });
});

describe("course-bank cache", () => {
  it("uses a schema-versioned key and a 90-minute TTL", () => {
    expect(COURSE_BANK_CACHE_KEY).toBe("geu:course-bank:catalog:v2");
    expect(COURSE_BANK_CACHE_TTL_MS).toBe(5_400_000);
  });

  it("classifies entries immediately below and at expiry", () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, catalog, 1_000);
    expect(
      readCourseBankCache(storage, 1_000 + COURSE_BANK_CACHE_TTL_MS - 1).state,
    ).toBe("fresh");
    expect(
      readCourseBankCache(storage, 1_000 + COURSE_BANK_CACHE_TTL_MS).state,
    ).toBe("stale");
  });

  it("removes corrupt, invalid, and future-dated entries", () => {
    const storage = new MemoryStorage();
    for (const value of [
      "not json",
      JSON.stringify({ timestamp: 10, data: { schemaVersion: 1 } }),
      JSON.stringify({ timestamp: 101, data: catalog }),
    ]) {
      storage.values.set(COURSE_BANK_CACHE_KEY, value);
      expect(readCourseBankCache(storage, 100).state).toBe("missing");
    }
    expect(storage.removed).toHaveLength(3);
  });

  it("returns a fresh cache without requesting the network", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, catalog, 100);
    const fetchImpl = vi.fn() as unknown as typeof fetch;
    await expect(
      loadCourseBankCatalog({
        url: "https://example.com/catalog.v2.json",
        storage,
        now: 101,
        fetchImpl,
      }),
    ).resolves.toMatchObject({ source: "cache", data: catalog });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("refreshes expired data and falls back to it on a later failure", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, catalog, 100);
    const updated: CourseBankCatalog = {
      ...catalog,
      site: { ...catalog.site, tagline: "Updated" },
    };
    const now = 100 + COURSE_BANK_CACHE_TTL_MS;
    await expect(
      loadCourseBankCatalog({
        url: "https://example.com/catalog.v2.json",
        storage,
        now,
        fetchImpl: vi.fn(async () =>
          response(updated),
        ) as unknown as typeof fetch,
      }),
    ).resolves.toEqual({ source: "network", data: updated });

    const loaded = await loadCourseBankCatalog({
      url: "https://example.com/catalog.v2.json",
      storage,
      now: now + COURSE_BANK_CACHE_TTL_MS,
      fetchImpl: vi.fn(async () =>
        response({}, 500),
      ) as unknown as typeof fetch,
    });
    expect(loaded.source).toBe("stale");
    expect(loaded.data.site.tagline).toBe("Updated");
    expect(loaded.warning?.message).toContain("500");
  });

  it("bypasses fresh cache on explicit retry and tolerates blocked storage", async () => {
    const blocked: StorageLike = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    expect(readCourseBankCache(blocked)).toEqual({ state: "missing" });
    expect(() => writeCourseBankCache(blocked, catalog)).not.toThrow();

    const storage = new MemoryStorage();
    writeCourseBankCache(storage, catalog, 100);
    const fetchImpl = vi.fn(async () => response(catalog));
    await loadCourseBankCatalog({
      url: "https://example.com/catalog.v2.json",
      storage,
      now: 101,
      forceRefresh: true,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/catalog.v2.json",
      expect.objectContaining({ cache: "reload" }),
    );
  });
});
