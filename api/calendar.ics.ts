const ICS_ENV_KEY = "VITE_CALENDAR_ICS_URL";

/**
 * Serverless endpoint for `/api/calendar.ics`.
 *
 * This is designed to work on platforms como Vercel (API routes) o cualquier
 * runtime Node que llame a la función exportada con `(req, res)`.
 *
 * - Lee la URL real del calendario desde `process.env.VITE_CALENDAR_ICS_URL`
 * - Hace `fetch` del `.ics` desde el servidor (sin problemas de CORS)
 * - Devuelve el ICS al navegador con cabeceras apropiadas
 */
export default async function handler(req: any, res: any) {
  // Solo aceptamos GET
  if (req.method && req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  const raw = (process.env[ICS_ENV_KEY] as string | undefined) ?? "";
  const icsUrl = raw.replace(/^["']|["'\s]+$/g, "").trim();

  if (!icsUrl) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("VITE_CALENDAR_ICS_URL is not set on the server.");
    return;
  }

  try {
    const upstream = await fetch(icsUrl, {
      // No usamos AbortSignal.timeout aquí para máxima compatibilidad de runtimes
      headers: {
        Accept: "text/calendar, application/ics, */*",
        "User-Agent": "Mozilla/5.0 (compatible; ELEVN-Calendar/1.0)",
      },
    });

    if (!upstream.ok) {
      res.statusCode = 502;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(`Calendar fetch failed with status ${upstream.status}`);
      return;
    }

    const body = await upstream.text();

    // Cabeceras para navegador
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=120");

    // CORS abierto opcional (seguro para un feed público de calendario)
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.end(body);
  } catch (err: any) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Calendar fetch failed: " + (err?.message || "unknown error"));
  }
}

