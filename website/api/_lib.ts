import { createHmac, timingSafeEqual } from "node:crypto";
import { fields, OTHER } from "../src/careerFields.js";
import type { Answers } from "../src/careerFields.js";

// Files starting with "_" in /api are not exposed as endpoints by Vercel.

export const RESPONSES_PREFIX = "responses/";
const COOKIE = "admin_session";
const SESSION_HOURS = 12;

export function json(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });
}

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

function sign(value: string) {
  return createHmac("sha256", env("SESSION_SECRET")).update(value).digest("base64url");
}

export function safeEqual(a: string, b: string) {
  // Compare HMACs so the comparison is constant-time regardless of input length.
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(password: string) {
  return safeEqual(password, env("ADMIN_PASSWORD"));
}

export function sessionCookie() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const token = `${expires}.${sign(String(expires))}`;
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export const clearedCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!match) return false;
  const [expires, signature] = match[1].split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

const MAX_TEXT = 2000;

/** Validates a submission against the form's fields. Returns cleaned answers or an error message. */
export function validate(
  input: unknown,
): { ok: true; answers: Answers; other: Record<string, string> } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid submission." };
  const body = input as { answers?: Record<string, unknown>; other?: Record<string, unknown> };
  const raw = body.answers ?? {};
  const answers: Answers = {};
  const other: Record<string, string> = {};

  for (const f of fields) {
    const v = raw[f.key];
    if (f.kind === "checkbox") {
      const list = (Array.isArray(v) ? v : []).filter((x): x is string => typeof x === "string");
      const allowed = new Set([...f.options.map((o) => o.value), ...(f.other ? [OTHER] : [])]);
      if (list.some((x) => !allowed.has(x))) return { ok: false, error: `Invalid choice for "${f.short}".` };
      if (f.required && list.length === 0) return { ok: false, error: `Please answer "${f.short}".` };
      if (list.includes(OTHER)) {
        const text = String(body.other?.[f.key] ?? "").trim().slice(0, MAX_TEXT);
        if (!text) return { ok: false, error: `Please specify "Other" for "${f.short}".` };
        other[f.key] = text;
      }
      if (list.length) answers[f.key] = [...new Set(list)];
      continue;
    }

    const text = typeof v === "string" ? v.trim() : "";
    if (!text) {
      if (f.required) return { ok: false, error: `Please answer "${f.short}".` };
      continue;
    }
    if (text.length > MAX_TEXT) return { ok: false, error: `"${f.short}" is too long.` };
    if (f.kind === "radio" && !f.options.some((o) => o.value === text))
      return { ok: false, error: `Invalid choice for "${f.short}".` };
    if (f.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))
      return { ok: false, error: "Please enter a valid email address." };
    if (f.kind === "number" && !/^\d{1,3}$/.test(text)) return { ok: false, error: "Please enter a valid age." };
    answers[f.key] = text;
  }
  return { ok: true, answers, other };
}
