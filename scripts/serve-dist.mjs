import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const portFlag = process.argv.indexOf("--port");
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : 4321);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidate = resolve(root, decoded || "index.html");
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return;

  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) return join(candidate, "index.html");
  } catch {
    if (!extname(candidate)) {
      const index = join(candidate, "index.html");
      try {
        if ((await stat(index)).isFile()) return index;
      } catch {
        return;
      }
    }
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const file = await resolveFile(url.pathname);
    const status = file ? 200 : 404;
    const body = await readFile(file ?? join(root, "404.html"));
    response.writeHead(status, {
      "Cache-Control": "no-store",
      "Content-Type":
        contentTypes[extname(file ?? "404.html")] ?? "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal test server error");
    console.error(error);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving dist at http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
