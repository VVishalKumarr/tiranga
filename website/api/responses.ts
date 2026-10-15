import { del, get, list } from "@vercel/blob";
import type { StoredResponse } from "../src/careerFields.js";
import { isAdmin, json, RESPONSES_PREFIX } from "./_lib.js";

async function readAll(): Promise<StoredResponse[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: RESPONSES_PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const results: StoredResponse[] = [];
  // Fetch in small batches to stay well within request limits.
  for (let i = 0; i < pathnames.length; i += 25) {
    const batch = await Promise.all(
      pathnames.slice(i, i + 25).map(async (p) => {
        const res = await get(p, { access: "private", useCache: false });
        if (!res || res.statusCode !== 200) return null;
        return JSON.parse(await new Response(res.stream).text()) as StoredResponse;
      }),
    );
    results.push(...batch.filter((r): r is StoredResponse => r !== null));
  }
  return results.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

/** All responses, newest first. Admin only. */
export async function GET(request: Request) {
  if (!isAdmin(request)) return json({ error: "Not logged in." }, 401);
  return json({ responses: await readAll() });
}

/** Delete one response by id (?id=...). Admin only. */
export async function DELETE(request: Request) {
  if (!isAdmin(request)) return json({ error: "Not logged in." }, 401);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[\w-]+$/.test(id)) return json({ error: "Invalid id." }, 400);
  await del(`${RESPONSES_PREFIX}${id}.json`);
  return json({ ok: true });
}
