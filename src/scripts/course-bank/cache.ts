import { parseCourseBankCatalog, type CourseBankCatalog } from "./catalog";

export const COURSE_BANK_CACHE_KEY = "geu:course-bank:catalog:v2";
export const COURSE_BANK_CACHE_TTL_MS = 90 * 60 * 1000;
export const COURSE_BANK_REQUEST_TIMEOUT_MS = 10_000;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
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

interface LoadCourseBankOptions {
  url: string;
  storage?: StorageLike;
  forceRefresh?: boolean;
  now?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
      throw new Error("Invalid cache entry");
    }
    const data = parseCourseBankCatalog(cached.data);
    if (
      !data ||
      !Number.isFinite(cached.timestamp) ||
      cached.timestamp < 0 ||
      cached.timestamp > now
    ) {
      throw new Error("Invalid cache entry");
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
      // Storage is optional and can be disabled by the browser.
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
    // The network result remains usable when storage is unavailable.
  }
}

export async function fetchCourseBankCatalog(
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = COURSE_BANK_REQUEST_TIMEOUT_MS,
  cache: RequestCache = "default",
): Promise<CourseBankCatalog> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { cache, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Course-bank request failed (${response.status})`);
    }
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
  if (!forceRefresh && cached.state === "fresh") {
    return { data: cached.data, source: "cache" };
  }
  try {
    const data = await fetchCourseBankCatalog(
      url,
      fetchImpl,
      timeoutMs,
      forceRefresh ? "reload" : "default",
    );
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
