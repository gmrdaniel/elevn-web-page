import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** In dev, proxy calendar ICS so the browser avoids CORS (Google doesn't allow direct fetch). */
function calendarProxyPlugin(icsUrl: string | undefined) {
  const raw = (icsUrl ?? process.env.VITE_CALENDAR_ICS_URL) ?? "";
  const url = raw.replace(/^["']|["'\s]+$/g, "").trim();
  const hasUrl = url.length > 0;
  if (hasUrl) {
    console.log("[calendar] VITE_CALENDAR_ICS_URL loaded (length " + url.length + "). Proxy: /api/calendar.ics");
  } else {
    console.warn("[calendar] VITE_CALENDAR_ICS_URL is missing or empty. Add it to .env and restart the dev server.");
  }
  return {
    name: "calendar-ics-proxy",
    configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req: { url?: string; method?: string }, res: { setHeader: (a: string, b: string) => void; statusCode: number; end: (s: string) => void }, next: () => void) => {
        const pathname = req.url?.split("?")[0];
        if (pathname === "/api/calendar-status") {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify({ urlConfigured: hasUrl, urlLength: url.length }));
          return;
        }
        if (pathname === "/api/image") {
          const query = req.url?.split("?")[1] ?? "";
          const params = new URLSearchParams(query);
          const targetUrl = params.get("url");
          const allowed = targetUrl?.startsWith("https://drive.google.com/") ?? false;
          if (!allowed || !targetUrl) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Invalid or disallowed image URL");
            return;
          }
          fetch(targetUrl, {
            signal: AbortSignal.timeout(10000),
            headers: { Accept: "image/*", "User-Agent": "Mozilla/5.0 (compatible; ELEVN-Calendar/1.0)" },
          })
            .then((r) => {
              if (!r.ok) throw new Error(String(r.status));
              const ct = r.headers.get("content-type") || "image/png";
              return r.arrayBuffer().then((buf) => ({ buf, ct }));
            })
            .then(({ buf, ct }) => {
              res.setHeader("Content-Type", ct);
              res.setHeader("Cache-Control", "public, max-age=3600");
              res.statusCode = 200;
              (res as any).end(Buffer.from(buf));
            })
            .catch((err) => {
              console.error("[calendar] Image proxy failed:", err?.message || err);
              res.statusCode = 502;
              res.setHeader("Content-Type", "text/plain");
              res.end("Image fetch failed");
            });
          return;
        }
        if (pathname !== "/api/calendar.ics") {
          next();
          return;
        }
        if (!url) {
          res.setHeader("Content-Type", "text/plain");
          res.statusCode = 502;
          res.end("VITE_CALENDAR_ICS_URL is not set. Add it to .env and restart the dev server.");
          return;
        }
        fetch(url, {
          signal: AbortSignal.timeout(15000),
          headers: {
            Accept: "text/calendar, application/ics, */*",
            "User-Agent": "Mozilla/5.0 (compatible; ELEVN-Calendar/1.0)",
          },
        })
          .then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.text();
          })
          .then((body) => {
            if (!body.trim().toUpperCase().startsWith("BEGIN:VCALENDAR")) {
              console.warn("[calendar] Google response was not valid ICS. First 150 chars:", body.slice(0, 150));
            }
            res.setHeader("Content-Type", "text/calendar; charset=utf-8");
            res.setHeader("Cache-Control", "public, max-age=120");
            res.statusCode = 200;
            res.end(body);
          })
          .catch((err) => {
            console.error("[calendar] Proxy fetch failed:", err?.message || err);
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 502;
            res.end("Calendar fetch failed: " + (err?.message || "unknown"));
          });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const envDir = __dirname;
  const env = loadEnv(mode, envDir, "");
  const icsUrl = env.VITE_CALENDAR_ICS_URL ?? "";
  return {
    plugins: [react(), calendarProxyPlugin(icsUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
