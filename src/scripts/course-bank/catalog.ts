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

const RAW_CONTENT_HOST = "raw.githubusercontent.com";
const MAX_FILE_BYTES = 50 * 1024 * 1024;

class InvalidCatalog extends Error {}

function record(value: unknown, field: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new InvalidCatalog(`${field} must be an object`);
  }
  return value as Record<string, unknown>;
}

function array(
  value: unknown,
  field: string,
  maximum: number,
  allowEmpty = true,
): unknown[] {
  if (
    !Array.isArray(value) ||
    value.length > maximum ||
    (!allowEmpty && value.length === 0)
  ) {
    throw new InvalidCatalog(`${field} must be a valid array`);
  }
  return value;
}

function text(value: unknown, field: string, allowEmpty = false): string {
  if (
    typeof value !== "string" ||
    value.length > 2_000 ||
    (!allowEmpty && value.length === 0) ||
    value !== value.trim() ||
    [...value].some((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127;
    })
  ) {
    throw new InvalidCatalog(`${field} must be valid text`);
  }
  return value;
}

function httpsUrl(value: unknown, field: string): string {
  const result = text(value, field);
  try {
    const parsed = new URL(result);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      throw new InvalidCatalog(`${field} must be an HTTPS URL`);
    }
  } catch (error) {
    if (error instanceof InvalidCatalog) throw error;
    throw new InvalidCatalog(`${field} must be an HTTPS URL`);
  }
  return result;
}

function unique(value: string, seen: Set<string>, field: string): void {
  const key = value.normalize("NFC").toLocaleLowerCase("en");
  if (seen.has(key)) throw new InvalidCatalog(`${field} must be unique`);
  seen.add(key);
}

export function isSafePathSegment(value: string): boolean {
  return (
    value.length > 0 &&
    value !== "." &&
    value !== ".." &&
    !value.startsWith(".") &&
    !value.includes("/") &&
    !value.includes("\\") &&
    ![...value].some((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127;
    })
  );
}

export function isSafePath(path: string): boolean {
  const segments = path.split("/");
  return segments.length > 0 && segments.every(isSafePathSegment);
}

function segment(value: unknown, field: string): string {
  const result = text(value, field);
  if (!isSafePathSegment(result)) {
    throw new InvalidCatalog(`${field} must be a safe path segment`);
  }
  return result;
}

function safePath(value: unknown, field: string): string {
  const result = text(value, field);
  if (!isSafePath(result)) {
    throw new InvalidCatalog(`${field} must be a safe path`);
  }
  return result;
}

function parseLink(
  value: unknown,
  index: number,
  ids: Set<string>,
): CourseBankLink {
  const field = `site.links[${index}]`;
  const item = record(value, field);
  const id = segment(item.id, `${field}.id`);
  unique(id, ids, "site link id");
  return {
    id,
    heading: text(item.heading, `${field}.heading`),
    label: text(item.label, `${field}.label`),
    url: httpsUrl(item.url, `${field}.url`),
  };
}

function parseFile(
  value: unknown,
  field: string,
  coursePath: string,
  paths: Set<string>,
): CourseBankFile {
  const item = record(value, field);
  const filename = segment(item.filename, `${field}.filename`);
  const path = safePath(item.path, `${field}.path`);
  const extension = text(item.extension, `${field}.extension`);
  const bytes = item.bytes;
  if (path !== `${coursePath}/${filename}`) {
    throw new InvalidCatalog(`${field}.path does not match its course`);
  }
  if (extension !== filename.split(".").at(-1)?.toUpperCase()) {
    throw new InvalidCatalog(`${field}.extension does not match its filename`);
  }
  if (
    typeof bytes !== "number" ||
    !Number.isSafeInteger(bytes) ||
    bytes < 0 ||
    bytes > MAX_FILE_BYTES
  ) {
    throw new InvalidCatalog(`${field}.bytes is invalid`);
  }
  unique(path, paths, "file path");
  return {
    filename,
    path,
    title: text(item.title, `${field}.title`),
    author: text(item.author, `${field}.author`),
    extension,
    mediaType: text(item.mediaType, `${field}.mediaType`),
    bytes,
  };
}

function parseCourse(
  value: unknown,
  field: string,
  ids: Set<string>,
  codes: Set<string>,
  paths: Set<string>,
  filePaths: Set<string>,
): CourseBankCourse {
  const item = record(value, field);
  const id = segment(item.id, `${field}.id`);
  const folder = segment(item.folder, `${field}.folder`);
  const path = safePath(item.path, `${field}.path`);
  const code = text(item.code, `${field}.code`);
  if (!/^\d{5}$/.test(code)) {
    throw new InvalidCatalog(`${field}.code must contain five digits`);
  }
  if (path.split("/").length !== 2 || !path.endsWith(`/${folder}`)) {
    throw new InvalidCatalog(`${field}.path does not match its folder`);
  }
  unique(id, ids, "course id within category");
  unique(code, codes, "course code within category");
  unique(path, paths, "course path");

  const files = array(item.files, `${field}.files`, 1_000).map((file, index) =>
    parseFile(file, `${field}.files[${index}]`, path, filePaths),
  );
  return {
    id,
    folder,
    path,
    code,
    name: text(item.name, `${field}.name`),
    description: text(item.description, `${field}.description`, true),
    ...(item.separated === true ? { separated: true as const } : {}),
    files,
  };
}

function parseCategory(
  value: unknown,
  index: number,
  ids: Set<string>,
  folders: Set<string>,
  coursePaths: Set<string>,
  filePaths: Set<string>,
): CourseBankCategory {
  const field = `categories[${index}]`;
  const item = record(value, field);
  const id = segment(item.id, `${field}.id`);
  const folder = segment(item.folder, `${field}.folder`);
  unique(id, ids, "category id");
  unique(folder, folders, "category folder");

  const courseIds = new Set<string>();
  const courseCodes = new Set<string>();
  const courses = array(item.courses, `${field}.courses`, 500, false).map(
    (course, courseIndex) =>
      parseCourse(
        course,
        `${field}.courses[${courseIndex}]`,
        courseIds,
        courseCodes,
        coursePaths,
        filePaths,
      ),
  );
  return {
    id,
    folder,
    name: text(item.name, `${field}.name`),
    shortName: text(item.shortName, `${field}.shortName`),
    emphasis: text(item.emphasis, `${field}.emphasis`, true),
    description: text(item.description, `${field}.description`),
    courses,
  };
}

function parseCatalog(value: unknown): CourseBankCatalog {
  const catalog = record(value, "catalog");
  if (catalog.schemaVersion !== 2) {
    throw new InvalidCatalog("schemaVersion must be 2");
  }
  const sourceRevision = text(catalog.sourceRevision, "sourceRevision");
  if (!/^[a-f\d]{40}$/.test(sourceRevision)) {
    throw new InvalidCatalog("sourceRevision must be a full Git revision");
  }

  const repository = record(catalog.repository, "repository");
  const rawBase = httpsUrl(repository.rawBase, "repository.rawBase").replace(
    /\/+$/,
    "",
  );
  if (new URL(rawBase).hostname !== RAW_CONTENT_HOST) {
    throw new InvalidCatalog(`repository.rawBase must use ${RAW_CONTENT_HOST}`);
  }
  const assets = record(catalog.assets, "assets");
  const site = record(catalog.site, "site");
  const linkIds = new Set<string>();
  const links = array(site.links, "site.links", 20).map((link, index) =>
    parseLink(link, index, linkIds),
  );
  const categoryIds = new Set<string>();
  const categoryFolders = new Set<string>();
  const coursePaths = new Set<string>();
  const filePaths = new Set<string>();
  const categories = array(catalog.categories, "categories", 100, false).map(
    (category, index) =>
      parseCategory(
        category,
        index,
        categoryIds,
        categoryFolders,
        coursePaths,
        filePaths,
      ),
  );
  if (filePaths.size > 10_000) {
    throw new InvalidCatalog("catalog contains too many files");
  }

  return {
    schemaVersion: 2,
    sourceRevision,
    repository: { rawBase },
    assets: { fileIcon: safePath(assets.fileIcon, "assets.fileIcon") },
    site: {
      title: text(site.title, "site.title"),
      tagline: text(site.tagline, "site.tagline"),
      links,
    },
    categories,
  };
}

export function parseCourseBankCatalog(
  value: unknown,
): CourseBankCatalog | null {
  try {
    return parseCatalog(value);
  } catch {
    return null;
  }
}

export function buildCourseFileUrl(
  rawBase: string,
  revision: string,
  path: string,
): string {
  let base: URL;
  try {
    base = new URL(rawBase);
  } catch {
    throw new Error("Unsafe course-bank URL");
  }
  if (
    base.protocol !== "https:" ||
    base.hostname !== RAW_CONTENT_HOST ||
    base.username ||
    base.password ||
    !/^[a-f\d]{40}$/.test(revision) ||
    !isSafePath(path)
  ) {
    throw new Error("Unsafe course-bank URL");
  }
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return new URL(
    `${revision}/${encodedPath}`,
    `${rawBase.replace(/\/+$/, "")}/`,
  ).toString();
}

const FILE_COLORS: Readonly<Record<string, string>> = {
  PDF: "#D32F2F",
  IPYNB: "#F37C2F",
  ZIP: "#595959",
  DOCX: "#2A5699",
  XLSX: "#1D6F42",
  PPTX: "#D24726",
  TXT: "#616161",
};

export function getCourseFileColor(extension: string): string {
  return FILE_COLORS[extension.toUpperCase()] ?? "#1e73be";
}
