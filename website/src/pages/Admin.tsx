import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Download, Eye, EyeOff, Loader2, LogOut, RefreshCw, Search, Trash2, X } from "lucide-react";
import { displayValue, fields } from "../careerFields";
import type { StoredResponse } from "../careerFields";
import { usePageTitle } from "../usePageTitle";

type Auth = "checking" | "out" | "in";

const field = (key: string) => fields.find((f) => f.key === key)!;
const show = (r: StoredResponse, key: string) => displayValue(field(key), r);

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function downloadCsv(responses: StoredResponse[]) {
  const header = ["Submitted at", ...fields.map((f) => f.short)];
  const rows = responses.map((r) => [dateFmt.format(new Date(r.submittedAt)), ...fields.map((f) => displayValue(f, r))]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  // BOM so Excel opens it as UTF-8.
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `career-counselling-responses-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  usePageTitle("Admin Dashboard — The Sudharshan Summit");
  const [auth, setAuth] = useState<Auth>("checking");

  useEffect(() => {
    // Keep the admin page out of search engines.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    fetch("/api/login")
      .then((r) => r.json())
      .then((d: { authenticated?: boolean }) => setAuth(d.authenticated ? "in" : "out"))
      .catch(() => setAuth("out"));
    return () => meta.remove();
  }, []);

  if (auth === "checking")
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  if (auth === "out") return <Login onSuccess={() => setAuth("in")} />;
  return <Dashboard onLogout={() => setAuth("out")} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) return onSuccess();
      setError(res.status === 401 ? "Incorrect password." : "Something went wrong — please try again.");
    } catch {
      setError("Couldn't reach the server — check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-primary/25 bg-card/60 p-8 text-center shadow-[0_0_40px_-15px_oklch(0.83_0.13_88_/_40%)]"
      >
        <img src="/images/sudharshan-logo.png" alt="" className="mx-auto h-20 w-20 object-contain" />
        <h1 className="mt-3 font-serif text-2xl text-primary">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Career Counselling responses</p>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative mt-6">
          <input
            id="password"
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
            placeholder="Password"
            className="w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 pr-11 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 text-muted-foreground hover:text-primary"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Log in
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [responses, setResponses] = useState<StoredResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("");
  const [selected, setSelected] = useState<StoredResponse | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/responses", { cache: "no-store" });
      if (res.status === 401) return onLogout();
      if (!res.ok) throw new Error();
      setResponses(((await res.json()) as { responses: StoredResponse[] }).responses);
    } catch {
      setError("Couldn't load responses — try refreshing.");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/login", { method: "DELETE" }).catch(() => {});
    onLogout();
  }

  async function remove(r: StoredResponse) {
    if (!confirm(`Delete the response from ${show(r, "name") || "this person"}? This can't be undone.`)) return;
    const res = await fetch(`/api/responses?id=${encodeURIComponent(r.id)}`, { method: "DELETE" });
    if (res.status === 401) return onLogout();
    if (!res.ok) return alert("Couldn't delete — please try again.");
    setSelected(null);
    setResponses((list) => list?.filter((x) => x.id !== r.id) ?? null);
  }

  const all = responses ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(
      (r) =>
        (!grade || r.answers.grade === grade) &&
        (!q || fields.some((f) => displayValue(f, r).toLowerCase().includes(q))),
    );
  }, [all, query, grade]);

  const stats = useMemo(() => {
    const now = Date.now();
    const today = new Date().toDateString();
    return {
      total: all.length,
      today: all.filter((r) => new Date(r.submittedAt).toDateString() === today).length,
      week: all.filter((r) => now - new Date(r.submittedAt).getTime() < 7 * 86400_000).length,
      grades: countOptions(all, "grade"),
      interests: countOptions(all, "interests").sort((a, b) => b.count - a.count).slice(0, 6),
    };
  }, [all]);

  const gradeField = field("grade");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-primary/20 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/images/sudharshan-logo.png" alt="" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <div className="font-serif text-lg text-primary">Admin Dashboard</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Career Counselling Responses
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <ToolbarButton onClick={load} disabled={loading} label="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </ToolbarButton>
            <ToolbarButton onClick={() => downloadCsv(filtered)} disabled={!filtered.length} label="Export CSV">
              <Download className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={logout} label="Log out">
              <LogOut className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {error && (
          <p className="mb-6 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
        )}

        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatTile label="Total responses" value={stats.total} />
          <StatTile label="Last 7 days" value={stats.week} />
          <StatTile label="Today" value={stats.today} />
        </section>

        {stats.total > 0 && (
          <section className="mt-4 grid gap-4 md:grid-cols-2">
            <BarList title="By grade" items={stats.grades} total={stats.total} />
            <BarList title="Top areas of interest" items={stats.interests} total={stats.total} />
          </section>
        )}

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, phone, subject…"
                className="w-full rounded-xl border border-primary/30 bg-card/60 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              aria-label="Filter by grade"
              className="rounded-xl border border-primary/30 bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">All grades</option>
              {gradeField.kind === "radio" &&
                gradeField.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </select>
          </div>

          {responses === null ? (
            <div className="flex justify-center py-20 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="rounded-2xl border border-primary/20 bg-card/60 p-10 text-center text-muted-foreground">
              {all.length === 0 ? "No responses yet." : "No responses match your search."}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-primary/20 bg-card/60">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-primary/20 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-normal">Submitted</th>
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Age</th>
                    <th className="px-4 py-3 font-normal">Grade</th>
                    <th className="px-4 py-3 font-normal">Email</th>
                    <th className="px-4 py-3 font-normal">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className="cursor-pointer border-b border-primary/10 transition last:border-0 hover:bg-primary/5"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {dateFmt.format(new Date(r.submittedAt))}
                      </td>
                      <td className="px-4 py-3 text-primary">{show(r, "name")}</td>
                      <td className="px-4 py-3">{show(r, "age")}</td>
                      <td className="px-4 py-3">{show(r, "grade")}</td>
                      <td className="px-4 py-3">{show(r, "email")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{show(r, "phone")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {responses !== null && filtered.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {all.length}. Click a row to see the full response.
            </p>
          )}
        </section>
      </main>

      {selected && <Detail response={selected} onClose={() => setSelected(null)} onDelete={remove} />}
    </div>
  );
}

function countOptions(all: StoredResponse[], key: string) {
  const f = field(key);
  if (f.kind !== "radio" && f.kind !== "checkbox") return [];
  return f.options.map((o) => ({
    label: o.label,
    count: all.filter((r) => {
      const v = r.answers[key];
      return Array.isArray(v) ? v.includes(o.value) : v === o.value;
    }).length,
  }));
}

function ToolbarButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3.5 py-2 text-sm text-primary transition hover:bg-primary/10 disabled:opacity-50"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </button>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-card/60 p-4 sm:p-6">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">{label}</div>
      <div className="mt-1 font-serif text-3xl tabular-nums text-foreground sm:text-4xl">{value}</div>
    </div>
  );
}

function BarList({ title, items, total }: { title: string; items: { label: string; count: number }[]; total: number }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="rounded-2xl border border-primary/20 bg-card/60 p-5">
      <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label} title={`${i.label}: ${i.count} of ${total}`} className="grid grid-cols-[minmax(0,10rem)_1fr_2.5rem] items-center gap-3 text-sm">
            <span className="truncate text-foreground/85">{i.label}</span>
            <span className="h-2.5 rounded-full bg-primary/10">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${(i.count / max) * 100}%`, minWidth: i.count ? 4 : 0 }}
              />
            </span>
            <span className="text-right tabular-nums text-muted-foreground">{i.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({
  response,
  onClose,
  onDelete,
}: {
  response: StoredResponse;
  onClose: () => void;
  onDelete: (r: StoredResponse) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-background/70 backdrop-blur-sm" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Response details"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col border-l border-primary/25 bg-card"
      >
        <div className="flex items-start justify-between gap-4 border-b border-primary/20 p-5">
          <div>
            <h2 className="font-serif text-2xl text-primary">{show(response, "name")}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Submitted {dateFmt.format(new Date(response.submittedAt))}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>
        <dl className="flex-1 space-y-4 overflow-y-auto p-5">
          {fields.map((f) => (
            <div key={f.key}>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 whitespace-pre-wrap break-words text-foreground">
                {displayValue(f, response) || <span className="text-muted-foreground/60">—</span>}
              </dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-primary/20 p-4">
          <button
            onClick={() => onDelete(response)}
            className="inline-flex items-center gap-2 rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" /> Delete response
          </button>
        </div>
      </aside>
    </div>
  );
}
