export const COURSE_BANK_CACHE_KEY = "geu:course-bank:structure:v1";
export const COURSE_BANK_CACHE_TTL_MS = 90 * 60 * 1000;
export const COURSE_BANK_REQUEST_TIMEOUT_MS = 10_000;

export interface CourseBankDirectory {
  [name: string]: CourseBankDirectory | string[];
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface ParsedCourseFile {
  displayName: string;
  author: string;
  extension: string;
}

export interface CourseFileType {
  color: string;
  mime: string;
}

export type CacheResult =
  | { state: "missing" }
  | {
      state: "fresh" | "stale";
      data: CourseBankDirectory;
      timestamp: number;
    };

export interface LoadedCourseBank {
  data: CourseBankDirectory;
  source: "cache" | "network" | "stale";
  warning?: Error;
}

export interface LoadCourseBankOptions {
  url: string;
  storage?: StorageLike;
  forceRefresh?: boolean;
  now?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

const DEFAULT_FILE_TYPE: CourseFileType = {
  color: "#1e73be",
  mime: "application/octet-stream",
};

const FILE_TYPES: Readonly<Record<string, CourseFileType>> = {
  PDF: { color: "#D32F2F", mime: "application/pdf" },
  IPYNB: { color: "#F37C2F", mime: "application/json" },
  ZIP: { color: "#595959", mime: "application/zip" },
  DOCX: {
    color: "#2A5699",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  XLSX: {
    color: "#1D6F42",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  PPTX: {
    color: "#D24726",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  TXT: { color: "#616161", mime: "text/plain" },
  JSON: { color: DEFAULT_FILE_TYPE.color, mime: "application/json" },
  CSV: { color: DEFAULT_FILE_TYPE.color, mime: "text/csv" },
  HTML: { color: DEFAULT_FILE_TYPE.color, mime: "text/html" },
  SVG: { color: DEFAULT_FILE_TYPE.color, mime: "image/svg+xml" },
  PNG: { color: DEFAULT_FILE_TYPE.color, mime: "image/png" },
  JPG: { color: DEFAULT_FILE_TYPE.color, mime: "image/jpeg" },
  JPEG: { color: DEFAULT_FILE_TYPE.color, mime: "image/jpeg" },
};

export function isSafePathSegment(value: string): boolean {
  const hasControlCharacter = [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });

  return (
    value.length > 0 &&
    value !== "." &&
    value !== ".." &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !hasControlCharacter
  );
}

export function isSafeFolderPath(folder: string): boolean {
  const segments = folder.split("/");
  return segments.length > 0 && segments.every(isSafePathSegment);
}

export function parseCourseFile(file: string): ParsedCourseFile {
  const [rawName = file, rawAuthor] = file.split("-a-");
  const extensionMatch = file.match(/\.([^./]+)$/);
  const extension = extensionMatch?.[1].toUpperCase() ?? "";
  const parsedAuthor = rawAuthor
    ?.replace(/_/g, " ")
    .replace(/\.[^/.]+$/, "")
    .trim();

  return {
    displayName: rawName.replace(/_/g, " "),
    author: parsedAuthor || "Unknown",
    extension,
  };
}

export function getCourseFileType(extension: string): CourseFileType {
  return FILE_TYPES[extension.toUpperCase()] ?? DEFAULT_FILE_TYPE;
}

export function buildCourseFileUrl(
  rawBase: string,
  folder: string,
  file: string,
): string {
  if (!isSafeFolderPath(folder) || !isSafePathSegment(file)) {
    throw new Error("Unsafe course-bank path");
  }

  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  const encodedPath = [...folder.split("/"), file]
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return new URL(encodedPath, base).toString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseDirectory(value: unknown): CourseBankDirectory | null {
  if (!isRecord(value)) return null;

  const parsed: CourseBankDirectory = {};
  for (const [name, child] of Object.entries(value)) {
    if (!isSafePathSegment(name)) return null;

    if (Array.isArray(child)) {
      if (
        !child.every(
          (file): file is string =>
            typeof file === "string" && isSafePathSegment(file),
        )
      ) {
        return null;
      }
      parsed[name] = [...child];
      continue;
    }

    const directory = parseDirectory(child);
    if (!directory) return null;
    parsed[name] = directory;
  }

  return parsed;
}

export function parseCourseBankStructure(
  value: unknown,
): CourseBankDirectory | null {
  return parseDirectory(value);
}

export function getFolderFiles(
  structure: CourseBankDirectory,
  folder: string,
): readonly string[] | null {
  if (!isSafeFolderPath(folder)) return null;

  let current: CourseBankDirectory | string[] = structure;
  for (const segment of folder.split("/")) {
    if (Array.isArray(current)) return null;
    const next: CourseBankDirectory | string[] | undefined = current[segment];
    if (!next) return null;
    current = next;
  }

  return Array.isArray(current) ? current : null;
}

export function readCourseBankCache(
  storage: StorageLike | undefined,
  now = Date.now(),
): CacheResult {
  if (!storage) return { state: "missing" };

  try {
    const raw = storage.getItem(COURSE_BANK_CACHE_KEY);
    if (!raw) return { state: "missing" };

    const cached: unknown = JSON.parse(raw);
    if (!isRecord(cached) || typeof cached.timestamp !== "number") {
      storage.removeItem(COURSE_BANK_CACHE_KEY);
      return { state: "missing" };
    }

    const data = parseCourseBankStructure(cached.data);
    if (
      !data ||
      !Number.isFinite(cached.timestamp) ||
      cached.timestamp < 0 ||
      cached.timestamp > now
    ) {
      storage.removeItem(COURSE_BANK_CACHE_KEY);
      return { state: "missing" };
    }

    return {
      state:
        now - cached.timestamp < COURSE_BANK_CACHE_TTL_MS ? "fresh" : "stale",
      data,
      timestamp: cached.timestamp,
    };
  } catch {
    try {
      storage.removeItem(COURSE_BANK_CACHE_KEY);
    } catch {
      // Storage can be unavailable in privacy modes; fetching still works.
    }
    return { state: "missing" };
  }
}

export function writeCourseBankCache(
  storage: StorageLike | undefined,
  data: CourseBankDirectory,
  timestamp = Date.now(),
): void {
  if (!storage) return;
  try {
    storage.setItem(COURSE_BANK_CACHE_KEY, JSON.stringify({ timestamp, data }));
  } catch {
    // A quota/security error must not prevent the live data from rendering.
  }
}

export async function fetchCourseBankStructure(
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = COURSE_BANK_REQUEST_TIMEOUT_MS,
): Promise<CourseBankDirectory> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Course-bank request failed (${response.status})`);
    }

    const data = parseCourseBankStructure(await response.json());
    if (!data) throw new Error("Course-bank response has an invalid shape");
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadCourseBankStructure({
  url,
  storage,
  forceRefresh = false,
  now = Date.now(),
  timeoutMs = COURSE_BANK_REQUEST_TIMEOUT_MS,
  fetchImpl = fetch,
}: LoadCourseBankOptions): Promise<LoadedCourseBank> {
  const cached = readCourseBankCache(storage, now);
  if (!forceRefresh && cached.state === "fresh") {
    return { data: cached.data, source: "cache" };
  }

  try {
    const data = await fetchCourseBankStructure(url, fetchImpl, timeoutMs);
    writeCourseBankCache(storage, data, now);
    return { data, source: "network" };
  } catch (error) {
    if (cached.state !== "missing") {
      return {
        data: cached.data,
        source: "stale",
        warning:
          error instanceof Error
            ? error
            : new Error("Course-bank refresh failed"),
      };
    }
    throw error;
  }
}
