import { expect, test, type Page } from "@playwright/test";
import {
  COURSE_BANK_CACHE_KEY,
  COURSE_BANK_CACHE_TTL_MS,
} from "../../src/scripts/course-bank-utils";
import { courseBankStructureFixture as structure } from "../fixtures/course-bank";

const structureUrl = "**/GE-Union/CourseBank/main/structure.json";
const rawBase = "https://raw.githubusercontent.com/GE-Union/CourseBank/main/";

async function mockStructure(page: Page, data: unknown = structure) {
  await page.route(structureUrl, (route) =>
    route.fulfill({ json: data, status: 200 }),
  );
}

async function waitForReady(page: Page) {
  await page
    .locator('[data-course-bank-state="ready"]')
    .waitFor({ state: "attached" });
}

async function openFirstCourse(page: Page) {
  const course = page.locator("details.course").first();
  if ((await course.getAttribute("open")) === null) {
    await course.locator("summary").click();
    await expect(course).toHaveAttribute("open", "");
  }
  return course;
}

test("renders the complete static catalog and mocked note inventory safely", async ({
  page,
}) => {
  await mockStructure(page);
  await page.goto("/course-bank");
  await waitForReady(page);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Course bank",
  );
  await expect(page.getByRole("tab")).toHaveCount(5);
  await expect(page.locator("details.course")).toHaveCount(49);
  await expect(page.getByText("No description").first()).toBeAttached();

  await openFirstCourse(page);
  await expect(
    page.getByRole("link", { name: /Lecture notes by Ada Lovelace/ }),
  ).toBeVisible();
  await expect(page.getByText("No notes found").first()).toBeAttached();
  await expect(page.getByText("Should not render.pdf")).toHaveCount(0);
  await expect(
    page.getByText("Safety <img onerror=window.injected=true>.txt"),
  ).toBeVisible();
  await expect(page.locator("img[onerror]")).toHaveCount(0);
  expect(await page.evaluate(() => "injected" in window)).toBe(false);
});

test("tabs expose selected state and support desktop and mobile keyboard navigation", async ({
  page,
}) => {
  await mockStructure(page);
  await page.goto("/course-bank");
  await waitForReady(page);

  const tabs = page.getByRole("tab");
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(0)).toHaveAttribute("tabindex", "0");
  await expect(tabs.nth(1)).toHaveAttribute("tabindex", "-1");

  await tabs.nth(0).press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#course-panel-advanced")).toBeVisible();
  await tabs.nth(1).press("End");
  await expect(tabs.nth(4)).toHaveAttribute("aria-selected", "true");
  await tabs.nth(4).press("Home");
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("tablist")).toHaveAttribute(
    "aria-orientation",
    "vertical",
  );
  await tabs.nth(0).press("ArrowDown");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await tabs.nth(1).press("ArrowUp");
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("course disclosures start collapsed and animate open and closed", async ({
  page,
}) => {
  await mockStructure(page);
  await page.goto("/course-bank");
  await waitForReady(page);

  const course = page.locator("details.course").first();
  const reveal = course.locator(".course-reveal");
  const body = course.locator(".course-body");
  const collapsedHeight = (await course.boundingBox())?.height;
  await expect(page.locator("details.course[open]")).toHaveCount(0);
  await expect(course).not.toHaveAttribute("open", "");
  await expect(course).toHaveAttribute("data-course-expanded", "false");
  await expect(body).not.toBeVisible();

  await course.locator("summary").click();
  await expect(course).toHaveAttribute("open", "");
  await expect(course).toHaveAttribute("data-course-expanded", "true");
  expect(
    await reveal.evaluate((element) =>
      element.getAnimations().some(({ playState }) => playState === "running"),
    ),
  ).toBe(true);
  expect(
    await course.evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  await expect(body).toBeVisible();

  await expect
    .poll(() => reveal.evaluate((element) => element.getAnimations().length))
    .toBe(0);
  await course.locator("summary").click();
  await expect(course).toHaveAttribute("data-course-expanded", "false");
  await expect(course).not.toHaveAttribute("open", "");
  await expect(body).not.toBeVisible();
  expect((await course.boundingBox())?.height).toBe(collapsedHeight);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await course.locator("summary").click();
  await expect(course).toHaveAttribute("open", "");
  expect(
    await reveal.evaluate((element) => element.getAnimations().length),
  ).toBe(0);
});

test("a fresh 90-minute cache renders without a network request", async ({
  page,
}) => {
  let requests = 0;
  await page.route(structureUrl, (route) => {
    requests += 1;
    return route.abort();
  });
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(
        key,
        JSON.stringify({ timestamp: Date.now(), data }),
      );
    },
    { key: COURSE_BANK_CACHE_KEY, data: structure },
  );

  await page.goto("/course-bank");
  await waitForReady(page);
  await openFirstCourse(page);
  await expect(
    page.getByRole("link", { name: /Lecture notes by Ada Lovelace/ }),
  ).toBeVisible();
  expect(requests).toBe(0);
});

test("expired cached data is a stale fallback and Retry bypasses it", async ({
  page,
}) => {
  let requests = 0;
  await page.route(structureUrl, (route) => {
    requests += 1;
    if (requests === 1) return route.fulfill({ status: 500, body: "failed" });
    return route.fulfill({ status: 200, json: structure });
  });
  await page.addInitScript(
    ({ key, data, ttl }) => {
      localStorage.setItem(
        key,
        JSON.stringify({ timestamp: Date.now() - ttl, data }),
      );
    },
    {
      key: COURSE_BANK_CACHE_KEY,
      data: structure,
      ttl: COURSE_BANK_CACHE_TTL_MS,
    },
  );

  await page.goto("/course-bank");
  await page
    .locator('[data-course-bank-state="stale"]')
    .waitFor({ state: "attached" });
  await expect(page.locator("[data-course-bank-notice-text]")).toContainText(
    "Showing saved course notes",
  );
  await openFirstCourse(page);
  await expect(
    page.getByRole("link", { name: /Lecture notes by Ada Lovelace/ }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Retry" }).click();
  await waitForReady(page);
  expect(requests).toBe(2);
});

test("an initial failure exposes a retry that requests fresh data", async ({
  page,
}) => {
  let requests = 0;
  await page.route(structureUrl, (route) => {
    requests += 1;
    if (requests === 1) return route.fulfill({ status: 500, body: "failed" });
    return route.fulfill({ status: 200, json: structure });
  });

  await page.goto("/course-bank");
  await page
    .locator('[data-course-bank-state="error"]')
    .waitFor({ state: "attached" });
  await expect(page.locator("[data-course-bank-notice-text]")).toHaveText(
    "Unable to load course notes.",
  );
  await expect(page.getByText("Unable to load notes.").first()).toBeAttached();

  await page.getByRole("button", { name: "Retry" }).click();
  await waitForReady(page);
  await openFirstCourse(page);
  await expect(
    page.getByRole("link", { name: /Lecture notes by Ada Lovelace/ }),
  ).toBeVisible();
  expect(requests).toBe(2);
});

test("notebooks download with their repository filename", async ({ page }) => {
  await mockStructure(page);
  await page.route(
    /raw\.githubusercontent\.com\/GE-Union\/CourseBank\/main\/.*\.ipynb$/,
    (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"cells":[]}',
      }),
  );
  await page.goto("/course-bank");
  await waitForReady(page);
  await openFirstCourse(page);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /Exercises by Grace Hopper/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Exercises-a-Grace_Hopper.ipynb");
});

test("PDF links keep a safe raw fallback and open an isolated blob tab", async ({
  page,
}) => {
  await mockStructure(page);
  let pdfRequests = 0;
  await page.route(
    /raw\.githubusercontent\.com\/GE-Union\/CourseBank\/main\/.*\.pdf$/,
    (route) => {
      pdfRequests += 1;
      return route.fulfill({
        status: 200,
        contentType: "application/octet-stream",
        body: "%PDF-1.4\n%%EOF",
      });
    },
  );
  await page.goto("/course-bank");
  await waitForReady(page);
  await openFirstCourse(page);

  const link = page.getByRole("link", {
    name: /Lecture notes by Ada Lovelace/,
  });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).toHaveAttribute(
    "href",
    `${rawBase}polytechnical-foundations/maths1a/Lecture_notes-a-Ada_Lovelace.pdf`,
  );

  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await expect.poll(() => pdfRequests).toBe(1);
  await expect.poll(() => popup.evaluate(() => opener === null)).toBe(true);
  await popup.close();
});

test("preserves the external Course Bank calls to action", async ({ page }) => {
  await mockStructure(page);
  await page.goto("/course-bank");
  await waitForReady(page);

  await expect(page.getByRole("link", { name: "Studocu" })).toHaveAttribute(
    "href",
    "https://www.studocu.com/da/institution/danmarks-tekniske-universitet/2833",
  );
  await expect(page.getByRole("link", { name: "Here" })).toHaveAttribute(
    "href",
    "https://docs.google.com/forms/d/e/1FAIpQLScRXlMZhGqmZ9dPn71PonKcp-LJXH2vlWVxcZ1EDnoZ1hH96Q/viewform?usp=header",
  );
  for (const name of ["Studocu", "Here"]) {
    await expect(page.getByRole("link", { name })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  }
});

test("[live] the CourseBank structure endpoint remains usable", async ({
  request,
}) => {
  test.skip(
    process.env.COURSE_BANK_LIVE !== "1",
    "Set COURSE_BANK_LIVE=1 to run the non-blocking live check.",
  );
  test.setTimeout(15_000);
  const response = await request.get(`${rawBase}structure.json`, {
    timeout: 10_000,
  });
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data["polytechnical-foundations"].maths1a).toEqual(expect.any(Array));
});
