import type { ReactNode } from "react";

type Props = { eyebrow: string; title: string; subtitle?: ReactNode; className?: string };

export default function PageHeader({ eyebrow, title, subtitle, className = "mb-12" }: Props) {
  return (
    <header className={`${className} text-center`}>
      <p className="text-xs uppercase tracking-[0.4em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-5xl text-foreground">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
