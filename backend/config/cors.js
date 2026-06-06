/**
 * Allowed browser origins for API requests (credentials: true).
 *
 * Env:
 *   CLIENT_URL   — single origin (legacy)
 *   CLIENT_URLS  — comma-separated extra origins
 */
const DEFAULT_ORIGINS = [
  "https://sophicdesigns.com",
  "https://www.sophicdesigns.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function parseExtraOrigins() {
  const fromList = (process.env.CLIENT_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const single = process.env.CLIENT_URL?.trim();
  return [...(single ? [single] : []), ...fromList];
}

const allowedOrigins = new Set([...DEFAULT_ORIGINS, ...parseExtraOrigins()]);

/** Vercel preview / production app URLs */
const VERCEL_ORIGIN = /^https:\/\/[\w.-]+\.vercel\.app$/;

function isOriginAllowed(origin) {
  if (!origin) return true;
  if (allowedOrigins.has(origin)) return true;
  if (VERCEL_ORIGIN.test(origin)) return true;
  return false;
}

const corsOptions = {
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, origin || true);
    } else {
      console.warn("[CORS] Blocked origin:", origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
};

module.exports = { corsOptions, allowedOrigins, isOriginAllowed };
