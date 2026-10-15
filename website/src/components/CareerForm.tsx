import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { fields, OTHER } from "../careerFields";
import type { Answers } from "../careerFields";

const inputClass =
  "mt-2 w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const choiceClass =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-primary/15 bg-background/40 px-4 py-2.5 text-sm transition hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10";

type Status = "idle" | "sending" | "done" | "error";

export default function CareerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const answers: Answers = {};
    const other: Record<string, string> = {};
    for (const f of fields) {
      if (f.kind === "checkbox") {
        const values = data.getAll(f.key).map(String);
        // Browsers can't mark a checkbox group as required, so check it here.
        if (f.required && values.length === 0) {
          setCheckboxError(true);
          document.getElementById(`field-${f.key}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        answers[f.key] = values;
        if (values.includes(OTHER)) other[f.key] = String(data.get(`${f.key}-other`) ?? "");
      } else {
        answers[f.key] = String(data.get(f.key) ?? "");
      }
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, other, website: data.get("website") }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong — please try again.");
      }
      setStatus("done");
      form.reset();
      setOtherChecked(false);
      document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Couldn't reach the server — please check your internet connection and try again."
          : (err as Error).message,
      );
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-primary/40 bg-card/60 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-serif text-2xl text-primary">Thank you for registering!</h3>
        <p className="mt-2 text-muted-foreground">
          Your response has been recorded. We'll reach out with the session details soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-primary/50 px-6 py-2.5 text-sm text-primary transition hover:bg-primary/10"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-primary/25 bg-card/60 p-6 shadow-[0_0_40px_-15px_oklch(0.83_0.13_88_/_40%)] md:p-8"
    >
      <p className="text-xs text-muted-foreground">
        <span className="text-primary">*</span> Required
      </p>

      {/* Honeypot for spam bots — hidden from people and screen readers. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {fields.map((f) => {
        const label = (
          <>
            {f.label}
            {f.required && <span className="ml-1 text-primary">*</span>}
          </>
        );

        if (f.kind === "radio" || f.kind === "checkbox") {
          return (
            <fieldset key={f.key} id={`field-${f.key}`}>
              <legend className="text-sm font-medium text-foreground">{label}</legend>
              <div className={`mt-3 grid gap-2 ${f.options.length > 6 ? "sm:grid-cols-2" : ""}`}>
                {f.options.map((o, i) => (
                  <label key={o.value} className={choiceClass}>
                    <input
                      type={f.kind}
                      name={f.key}
                      value={o.value}
                      required={f.kind === "radio" && f.required && i === 0}
                      onChange={() => f.kind === "checkbox" && setCheckboxError(false)}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                    {o.label}
                  </label>
                ))}
                {f.kind === "checkbox" && f.other && (
                  <label className={choiceClass}>
                    <input
                      type="checkbox"
                      name={f.key}
                      value={OTHER}
                      checked={otherChecked}
                      onChange={(e) => {
                        setOtherChecked(e.target.checked);
                        setCheckboxError(false);
                      }}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                    Other
                  </label>
                )}
              </div>
              {f.kind === "checkbox" && f.other && otherChecked && (
                <input
                  type="text"
                  name={`${f.key}-other`}
                  required
                  maxLength={500}
                  placeholder="Please specify"
                  className={inputClass}
                />
              )}
              {f.kind === "checkbox" && checkboxError && (
                <p className="mt-2 text-sm text-red-300">Please select at least one option.</p>
              )}
            </fieldset>
          );
        }

        return (
          <div key={f.key}>
            <label htmlFor={`field-${f.key}`} className="text-sm font-medium text-foreground">
              {label}
            </label>
            {f.kind === "textarea" ? (
              <textarea
                id={`field-${f.key}`}
                name={f.key}
                required={f.required}
                rows={4}
                maxLength={2000}
                className={inputClass}
              />
            ) : (
              <input
                id={`field-${f.key}`}
                type={f.kind}
                name={f.key}
                required={f.required}
                maxLength={f.kind === "number" ? undefined : 500}
                min={f.kind === "number" ? 5 : undefined}
                max={f.kind === "number" ? 99 : undefined}
                autoComplete={{ name: "name", email: "email", phone: "tel" }[f.key] ?? "off"}
                className={inputClass}
              />
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sending" ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}
