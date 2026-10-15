import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import type { StoredResponse } from "../src/careerFields.js";
import { json, RESPONSES_PREFIX, validate } from "./_lib.js";

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > 50_000) return json({ error: "Submission is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "Invalid submission." }, 400);
  }

  // Honeypot: real visitors never see or fill this field; bots usually do. Pretend success.
  if ((body as { website?: string })?.website) return json({ ok: true });

  const result = validate(body);
  if (!result.ok) return json({ error: result.error }, 400);

  const submittedAt = new Date().toISOString();
  const id = `${submittedAt.replace(/[:.]/g, "-")}_${randomUUID().slice(0, 8)}`;

  const record: StoredResponse = {
    id,
    submittedAt,
    answers: result.answers,
    ...(Object.keys(result.other).length ? { other: result.other } : {}),
  };

  await put(`${RESPONSES_PREFIX}${id}.json`, JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  return json({ ok: true });
}
