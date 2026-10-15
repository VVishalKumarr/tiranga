import { checkPassword, clearedCookie, isAdmin, json, sessionCookie } from "./_lib.js";

/** Is the current visitor logged in as admin? */
export function GET(request: Request) {
  return json({ authenticated: isAdmin(request) });
}

/** Log in with the admin password. */
export async function POST(request: Request) {
  let password = "";
  try {
    password = String(((await request.json()) as { password?: unknown }).password ?? "");
  } catch {
    // fall through with an empty password
  }

  if (!password || !checkPassword(password)) {
    // Slow down password guessing.
    await new Promise((r) => setTimeout(r, 1500));
    return json({ error: "Incorrect password." }, 401);
  }
  return json({ ok: true }, 200, { "set-cookie": sessionCookie() });
}

/** Log out. */
export function DELETE() {
  return json({ ok: true }, 200, { "set-cookie": clearedCookie });
}
