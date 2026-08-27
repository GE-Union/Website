import { readFile } from "node:fs/promises";

const calendarPage = new URL("../dist/calendar/index.html", import.meta.url);

let html;
try {
  html = await readFile(calendarPage, "utf8");
} catch {
  console.error(
    "calendar config: dist/calendar/index.html is missing. Build the site first.",
  );
  process.exit(1);
}

const apiKey = html.match(/\bdata-api-key\s*=\s*["']([^"']*)["']/)?.[1];
if (!apiKey?.trim()) {
  console.error(
    "calendar config: PUBLIC_GOOGLE_CALENDAR_API_KEY was empty during the build.",
  );
  console.error(
    "Add it to the hosting build environment (or .env locally), then build again.",
  );
  process.exit(1);
}

console.log("calendar config: OK — the built calendar has an API key.");
