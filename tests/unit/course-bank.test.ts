import { describe, expect, it, vi } from "vitest";
import { courseCategories } from "../../src/data/course-bank";
import {
  buildCourseFileUrl,
  COURSE_BANK_CACHE_KEY,
  COURSE_BANK_CACHE_TTL_MS,
  getCourseFileType,
  getFolderFiles,
  isSafeFolderPath,
  isSafePathSegment,
  loadCourseBankStructure,
  parseCourseBankStructure,
  parseCourseFile,
  readCourseBankCache,
  writeCourseBankCache,
  type StorageLike,
} from "../../src/scripts/course-bank-utils";

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

const structure = {
  "polytechnical-foundations": {
    maths1a: ["Notes-a-Ada_Lovelace.pdf"],
    empty: [],
  },
};

const response = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

describe("course-bank catalog", () => {
  it("preserves the five legacy categories and all 49 course mappings", () => {
    expect(courseCategories.map(({ id }) => id)).toEqual([
      "foundations",
      "advanced",
      "cyber",
      "living",
      "future",
    ]);
    expect(courseCategories.map(({ courses }) => courses.length)).toEqual([
      9, 11, 6, 12, 11,
    ]);

    const courses = courseCategories.flatMap(({ courses }) => courses);
    expect(courses).toHaveLength(49);
    expect(new Set(courses.map(({ folder }) => folder)).size).toBe(49);
    expect(
      courses.every(
        ({ name, code, description }) => name && code && description,
      ),
    ).toBe(true);
  });

  it("keeps the source anomalies explicit rather than silently correcting them", () => {
    expect(courseCategories[1].label).toBe("Advanced Systems");
    expect(courseCategories[1].description).toContain("Advanced Materials");
    expect(courseCategories[2].courses[2].code).toBe("26020");
    expect(courseCategories[0].courses.at(-1)).toMatchObject({
      name: "Mathematics 2",
      folder: "rest-of-obligatory-courses/maths2",
      separated: true,
    });
  });
});

describe("course-bank file helpers", () => {
  it("parses the legacy author convention and underscore display conversion", () => {
    expect(parseCourseFile("Lecture_notes-a-Ada_Lovelace.pdf")).toEqual({
      displayName: "Lecture notes",
      author: "Ada Lovelace",
      extension: "PDF",
    });
    expect(parseCourseFile("Past_Exams.pdf")).toEqual({
      displayName: "Past Exams.pdf",
      author: "Unknown",
      extension: "PDF",
    });
    expect(parseCourseFile("Øvelser-a-Søren_Å.pdf")).toEqual({
      displayName: "Øvelser",
      author: "Søren Å",
      extension: "PDF",
    });
  });

  it("preserves the legacy first author segment when separators repeat", () => {
    expect(parseCourseFile("Notes-a-First-a-Second.pdf").author).toBe("First");
  });

  it("rejects traversal and path separators while accepting safe filenames", () => {
    for (const unsafe of [
      "",
      ".",
      "..",
      "../secret.pdf",
      "a/b.pdf",
      "a\\b.pdf",
      "bad\0.pdf",
    ]) {
      expect(isSafePathSegment(unsafe), unsafe).toBe(false);
    }
    expect(isSafePathSegment("Exam #1 + løsning.pdf")).toBe(true);
    expect(isSafeFolderPath("polytechnical-foundations/maths1a")).toBe(true);
    expect(isSafeFolderPath("polytechnical-foundations/../secret")).toBe(false);
  });

  it("encodes every repository path segment", () => {
    expect(
      buildCourseFileUrl(
        "https://raw.githubusercontent.com/GE-Union/CourseBank/main/",
        "polytechnical-foundations/maths1a",
        "Exam #1 + løsning.pdf",
      ),
    ).toBe(
      "https://raw.githubusercontent.com/GE-Union/CourseBank/main/polytechnical-foundations/maths1a/Exam%20%231%20%2B%20l%C3%B8sning.pdf",
    );
    expect(() =>
      buildCourseFileUrl("https://example.com/", "../outside", "notes.pdf"),
    ).toThrow("Unsafe course-bank path");
  });

  it("keeps the legacy extension colors and a stable fallback", () => {
    expect(getCourseFileType("pdf")).toEqual({
      color: "#D32F2F",
      mime: "application/pdf",
    });
    expect(getCourseFileType("IPYNB")).toEqual({
      color: "#F37C2F",
      mime: "application/json",
    });
    expect(getCourseFileType("py")).toEqual({
      color: "#1e73be",
      mime: "application/octet-stream",
    });
  });

  it("validates the remote structure and distinguishes missing from empty folders", () => {
    const parsed = parseCourseBankStructure(structure);
    expect(parsed).not.toBeNull();
    expect(
      getFolderFiles(parsed!, "polytechnical-foundations/maths1a"),
    ).toEqual(["Notes-a-Ada_Lovelace.pdf"]);
    expect(getFolderFiles(parsed!, "polytechnical-foundations/empty")).toEqual(
      [],
    );
    expect(
      getFolderFiles(parsed!, "polytechnical-foundations/missing"),
    ).toBeNull();
    expect(parseCourseBankStructure({ root: ["../secret.pdf"] })).toBeNull();
    expect(parseCourseBankStructure({ root: "not-an-array" })).toBeNull();
  });
});

describe("course-bank cache", () => {
  it("uses the versioned key and a real 90-minute TTL", () => {
    expect(COURSE_BANK_CACHE_KEY).toBe("geu:course-bank:structure:v1");
    expect(COURSE_BANK_CACHE_TTL_MS).toBe(5_400_000);
  });

  it("classifies entries just below and at the expiry boundary", () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, structure, 1_000);
    expect(
      readCourseBankCache(storage, 1_000 + COURSE_BANK_CACHE_TTL_MS - 1).state,
    ).toBe("fresh");
    expect(
      readCourseBankCache(storage, 1_000 + COURSE_BANK_CACHE_TTL_MS).state,
    ).toBe("stale");
  });

  it("removes corrupt, malformed, and future-dated entries", () => {
    const storage = new MemoryStorage();
    for (const value of [
      "not json",
      JSON.stringify({ timestamp: 10, data: { root: "bad" } }),
      JSON.stringify({ timestamp: 101, data: structure }),
    ]) {
      storage.values.set(COURSE_BANK_CACHE_KEY, value);
      expect(readCourseBankCache(storage, 100).state).toBe("missing");
    }
    expect(storage.removed).toHaveLength(3);
  });

  it("treats unavailable storage as a non-fatal cache miss", () => {
    const throwingStorage: StorageLike = {
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
    expect(readCourseBankCache(throwingStorage)).toEqual({ state: "missing" });
    expect(() =>
      writeCourseBankCache(throwingStorage, structure),
    ).not.toThrow();
  });

  it("returns a fresh cache without requesting the network", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, structure, 100);
    const fetchImpl = vi.fn() as unknown as typeof fetch;

    await expect(
      loadCourseBankStructure({
        url: "https://example.com/structure.json",
        storage,
        now: 101,
        fetchImpl,
      }),
    ).resolves.toMatchObject({ source: "cache", data: structure });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("refreshes an expired entry and writes the new timestamp", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, structure, 100);
    const updated = { root: { course: ["New_notes.pdf"] } };
    const fetchImpl = vi.fn(async () =>
      response(updated),
    ) as unknown as typeof fetch;
    const now = 100 + COURSE_BANK_CACHE_TTL_MS;

    await expect(
      loadCourseBankStructure({
        url: "https://example.com/structure.json",
        storage,
        now,
        fetchImpl,
      }),
    ).resolves.toEqual({ source: "network", data: updated });
    expect(JSON.parse(storage.getItem(COURSE_BANK_CACHE_KEY)!)).toEqual({
      timestamp: now,
      data: updated,
    });
  });

  it("falls back to validated stale data when refresh fails", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, structure, 100);
    const fetchImpl = vi.fn(async () =>
      response({}, 500),
    ) as unknown as typeof fetch;

    const loaded = await loadCourseBankStructure({
      url: "https://example.com/structure.json",
      storage,
      now: 100 + COURSE_BANK_CACHE_TTL_MS,
      fetchImpl,
    });
    expect(loaded.source).toBe("stale");
    expect(loaded.data).toEqual(structure);
    expect(loaded.warning?.message).toContain("500");
  });

  it("bypasses a fresh cache when retry forces a refresh", async () => {
    const storage = new MemoryStorage();
    writeCourseBankCache(storage, structure, 100);
    const updated = { root: { course: ["Retry.pdf"] } };
    const fetchImpl = vi.fn(async () =>
      response(updated),
    ) as unknown as typeof fetch;

    await expect(
      loadCourseBankStructure({
        url: "https://example.com/structure.json",
        storage,
        now: 101,
        forceRefresh: true,
        fetchImpl,
      }),
    ).resolves.toEqual({ source: "network", data: updated });
    expect(fetchImpl).toHaveBeenCalledOnce();
  });
});
