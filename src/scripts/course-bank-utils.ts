export const COURSE_BANK_CACHE_KEY = "geu:course-bank:catalog:v2";
export const COURSE_BANK_CACHE_TTL_MS = 90 * 60 * 1000;
export const COURSE_BANK_REQUEST_TIMEOUT_MS = 10_000;

export interface CourseBankFile {
  filename: string;
  path: string;
  title: string;
  author: string;
  extension: string;
  mediaType: string;
  bytes: number;
}

export interface CourseBankCourse {
  id: string;
  folder: string;
  path: string;
  code: string;
  name: string;
  description: string;
  separated?: true;
  files: CourseBankFile[];
}

export interface CourseBankCategory {
  id: string;
  folder: string;
  name: string;
  shortName: string;
  emphasis: string;
  description: string;
  courses: CourseBankCourse[];
}

export interface CourseBankLink {
  id: string;
  heading: string;
  label: string;
  url: string;
}

export interface CourseBankCatalog {
  schemaVersion: 2;
  sourceRevision: string;
  repository: { rawBase: string };
  assets: { fileIcon: string };
  site: { title: string; tagline: string; links: CourseBankLink[] };
  categories: CourseBankCategory[];
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface CourseFileType {
  color: string;
  mime: string;
}

export type CacheResult =
  | { state: "missing" }
  | {
      state: "fresh" | "stale";
      data: CourseBankCatalog;
      timestamp: number;
    };

export interface LoadedCourseBank {
  data: CourseBankCatalog;
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

export function getCourseFileType(extension: string): CourseFileType {
  return FILE_TYPES[extension.toUpperCase()] ?? DEFAULT_FILE_TYPE;
}

export function isSafePathSegment(value: string): boolean {
  const hasControlCharacter = [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });
  return (
    value.length > 0 &&
    value !== "." &&
    value !== ".." &&
    !value.startsWith(".") &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !hasControlCharacter
  );
}

export function isSafePath(path: string): boolean {
  const segments = path.split("/");
  return segments.length > 0 && segments.every(isSafePathSegment);
}

export function buildCourseFileUrl(
  rawBase: string,
  revision: string,
  path: string,
): string {
  if (!/^[a-f\d]{40}$/.test(revision) || !isSafePath(path)) {
    throw new Error("Unsafe course-bank path");
  }
  const base = `${rawBase.replace(/\/+$/, "")}/${revision}/`;
  return new URL(
    path.split("/").map(encodeURIComponent).join("/"),
    base,
  ).toString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function string(value: unknown, allowEmpty = false): string | null {
  return typeof value === "string" &&
    value.length <= 2_000 &&
    (allowEmpty || value.length > 0) &&
    ![...value].some((character) => character.charCodeAt(0) < 32)
    ? value
    : null;
}

function httpsUrl(value: unknown): string | null {
  const parsed = string(value);
  if (!parsed) return null;
  try {
    return new URL(parsed).protocol === "https:" ? parsed : null;
  } catch {
    return null;
  }
}

export function parseCourseBankCatalog(
  value: unknown,
): CourseBankCatalog | null {
  if (!isRecord(value) || value.schemaVersion !== 2) return null;
  const sourceRevision = string(value.sourceRevision);
  const repository = value.repository;
  const assets = value.assets;
  const site = value.site;
  if (
    !sourceRevision ||
    !/^[a-f\d]{40}$/.test(sourceRevision) ||
    !isRecord(repository) ||
    !isRecord(assets) ||
    !isRecord(site) ||
    !Array.isArray(site.links) ||
    !Array.isArray(value.categories)
  )
    return null;
  const rawBase = httpsUrl(repository.rawBase);
  const fileIcon = string(assets.fileIcon);
  const title = string(site.title);
  const tagline = string(site.tagline);
  if (!rawBase || !fileIcon || !isSafePath(fileIcon) || !title || !tagline)
    return null;

  const links: CourseBankLink[] = [];
  const linkIds = new Set<string>();
  for (const item of site.links) {
    if (!isRecord(item)) return null;
    const id = string(item.id);
    const heading = string(item.heading);
    const label = string(item.label);
    const url = httpsUrl(item.url);
    if (
      !id ||
      !isSafePathSegment(id) ||
      !heading ||
      !label ||
      !url ||
      linkIds.has(id)
    )
      return null;
    linkIds.add(id);
    links.push({ id, heading, label, url });
  }

  if (value.categories.length === 0 || value.categories.length > 100)
    return null;
  const categories: CourseBankCategory[] = [];
  const categoryIds = new Set<string>();
  const coursePaths = new Set<string>();
  let totalFiles = 0;
  for (const item of value.categories) {
    if (
      !isRecord(item) ||
      !Array.isArray(item.courses) ||
      item.courses.length > 500
    )
      return null;
    const id = string(item.id);
    const folder = string(item.folder);
    const name = string(item.name);
    const shortName = string(item.shortName);
    const emphasis = string(item.emphasis, true);
    const description = string(item.description);
    if (
      !id ||
      !folder ||
      !isSafePathSegment(id) ||
      !isSafePathSegment(folder) ||
      !name ||
      !shortName ||
      emphasis === null ||
      !description ||
      categoryIds.has(id)
    )
      return null;
    categoryIds.add(id);

    const courses: CourseBankCourse[] = [];
    for (const courseValue of item.courses) {
      if (
        !isRecord(courseValue) ||
        !Array.isArray(courseValue.files) ||
        courseValue.files.length > 1_000
      )
        return null;
      const courseId = string(courseValue.id);
      const courseFolder = string(courseValue.folder);
      const path = string(courseValue.path);
      const code = string(courseValue.code);
      const courseName = string(courseValue.name);
      const courseDescription = string(courseValue.description, true);
      if (
        !courseId ||
        !courseFolder ||
        !path ||
        !code ||
        !courseName ||
        courseDescription === null ||
        !isSafePathSegment(courseId) ||
        !isSafePathSegment(courseFolder) ||
        !isSafePath(path) ||
        coursePaths.has(path)
      )
        return null;
      coursePaths.add(path);

      const files: CourseBankFile[] = [];
      for (const fileValue of courseValue.files) {
        if (!isRecord(fileValue)) return null;
        const filename = string(fileValue.filename);
        const filePath = string(fileValue.path);
        const fileTitle = string(fileValue.title);
        const author = string(fileValue.author);
        const extension = string(fileValue.extension);
        const mediaType = string(fileValue.mediaType);
        const bytes = fileValue.bytes;
        if (
          !filename ||
          !filePath ||
          !fileTitle ||
          !author ||
          !extension ||
          !mediaType ||
          !isSafePathSegment(filename) ||
          !isSafePath(filePath) ||
          !filePath.startsWith(`${path}/`) ||
          typeof bytes !== "number" ||
          !Number.isSafeInteger(bytes) ||
          bytes < 0
        )
          return null;
        files.push({
          filename,
          path: filePath,
          title: fileTitle,
          author,
          extension,
          mediaType,
          bytes,
        });
      }
      totalFiles += files.length;
      if (totalFiles > 10_000) return null;
      courses.push({
        id: courseId,
        folder: courseFolder,
        path,
        code,
        name: courseName,
        description: courseDescription,
        ...(courseValue.separated === true ? { separated: true as const } : {}),
        files,
      });
    }
    categories.push({
      id,
      folder,
      name,
      shortName,
      emphasis,
      description,
      courses,
    });
  }

  return {
    schemaVersion: 2,
    sourceRevision,
    repository: { rawBase },
    assets: { fileIcon },
    site: { title, tagline, links },
    categories,
  };
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
    if (!isRecord(cached) || typeof cached.timestamp !== "number")
      throw new Error();
    const data = parseCourseBankCatalog(cached.data);
    if (
      !data ||
      !Number.isFinite(cached.timestamp) ||
      cached.timestamp < 0 ||
      cached.timestamp > now
    )
      throw new Error();
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
      // Storage may be blocked.
    }
    return { state: "missing" };
  }
}

export function writeCourseBankCache(
  storage: StorageLike | undefined,
  data: CourseBankCatalog,
  timestamp = Date.now(),
): void {
  if (!storage) return;
  try {
    storage.setItem(COURSE_BANK_CACHE_KEY, JSON.stringify({ timestamp, data }));
  } catch {
    // Fetching still works without storage.
  }
}

export async function fetchCourseBankCatalog(
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = COURSE_BANK_REQUEST_TIMEOUT_MS,
): Promise<CourseBankCatalog> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      cache: "default",
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(`Course-bank request failed (${response.status})`);
    const data = parseCourseBankCatalog(await response.json());
    if (!data) throw new Error("Course-bank response has an invalid shape");
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadCourseBankCatalog({
  url,
  storage,
  forceRefresh = false,
  now = Date.now(),
  timeoutMs = COURSE_BANK_REQUEST_TIMEOUT_MS,
  fetchImpl = fetch,
}: LoadCourseBankOptions): Promise<LoadedCourseBank> {
  const cached = readCourseBankCache(storage, now);
  if (!forceRefresh && cached.state === "fresh")
    return { data: cached.data, source: "cache" };
  try {
    const data = await fetchCourseBankCatalog(url, fetchImpl, timeoutMs);
    writeCourseBankCache(storage, data, now);
    return { data, source: "network" };
  } catch (error) {
    if (cached.state !== "missing")
      return {
        data: cached.data,
        source: "stale",
        warning:
          error instanceof Error
            ? error
            : new Error("Course-bank refresh failed"),
      };
    throw error;
  }
}
