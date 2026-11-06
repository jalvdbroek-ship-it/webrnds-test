// Lokale server voor de WeBrnds-site. Start met: node server.mjs
// Daarna open je http://localhost:4321 in je browser.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4321);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

http
  .createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (path === "/") path = "/index.html";
    const clean = normalize(path).split("/").filter(Boolean).join("/");
    const file = join(root, clean);
    try {
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Niet gevonden");
    }
  })
  .listen(port, () => console.log("WeBrnds-site draait op http://localhost:" + port));
