import { usePageTitle } from "../usePageTitle";

export default function TeamSudharshan() {
  usePageTitle("Team Sudharshan — Join Our Family");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Your chance to join our family</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">Team Sudharshan</h1>
      </header>
      <div className="mb-10 overflow-hidden rounded-2xl border border-primary/25 bg-card/60">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/EJaru1Fd8A0"
            title="Team Sudharshan"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
      <p className="mb-8 text-center text-xl text-muted-foreground md:text-2xl">
        Apply to be a part of the family behind The Sudharshan Summit.
      </p>
      <div className="rounded-2xl border border-primary/25 bg-secondary/40 p-8 text-center shadow-[0_0_40px_-15px_oklch(0.83_0.13_88_/_40%)]">
        <p className="leading-relaxed text-foreground/85">
          We're looking for passionate individuals to help us build what comes next. If diplomacy, dialogue and
          the craft of bringing people together speak to you — this is your invitation.
        </p>
        <a
          href="https://forms.gle/oLQ3N64aimGdPkdn8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-primary bg-primary px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply Now
        </a>
      </div>
      <p className="mt-12 text-center font-serif text-xl italic text-primary">
        Sudharshan is coming back. Bigger, better, stronger — and a bit different…
      </p>
    </div>
  );
}
