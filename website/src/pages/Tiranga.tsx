import { useCallback, useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, Mic, PenLine, Shirt, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

type Milestone = {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  photo?: string;
};

const milestones: Milestone[] = [
  {
    icon: Shirt,
    tag: "February 2026",
    title: "Where the journey began",
    text: "The Tiranga started off its journey with a cloth donation drive at the Kusth Aashram in Rudrapur.",
  },
  {
    icon: PenLine,
    tag: "1800+ Participants",
    title: "India's biggest poetry competition",
    text: "The Tiranga laid out a platform for a poetry competition with over 1800 participants — India's biggest poetry competition held in 2026.",
  },
  {
    icon: Mic,
    tag: "Hindu College, University of Delhi",
    title: "The Yuvamanthan Conference",
    text: "The Yuvamanthan conference at Hindu College, University of Delhi was led by The Tiranga, turning out to be an utterly successful event.",
    photo: "/images/presence/hindu-college-front.jpeg",
  },
  {
    icon: Award,
    tag: "New Delhi",
    title: "Recognised at Bharat Mandapam",
    text: "The Tiranga has also been recognised at the Bharat Mandapam, New Delhi.",
    photo: "/images/presence/bharat-mandapam-night.jpeg",
  },
];

const stats = [
  { value: "Feb 2026", label: "Journey Began" },
  { value: "1800+", label: "Poets on One Platform" },
  { value: "Bharat Mandapam", label: "National Recognition" },
];

const gallery = [
  { src: "/images/presence/bharat-mandapam-night.jpeg", caption: "Bharat Mandapam, New Delhi" },
  { src: "/images/presence/hindu-college.jpeg", caption: "Hindu College, University of Delhi" },
  { src: "/images/presence/bharat-mandapam-aerial.jpeg", caption: "Bharat Mandapam, New Delhi" },
  { src: "/images/presence/conference-hall.jpeg", caption: "In the conference hall" },
  { src: "/images/presence/bharat-mandapam-steps.jpeg", caption: "Bharat Mandapam, New Delhi" },
  { src: "/images/presence/hindu-college-front.jpeg", caption: "Hindu College, University of Delhi" },
  { src: "/images/presence/bharat-mandapam-fountains.jpeg", caption: "Bharat Mandapam, New Delhi" },
];

export default function Tiranga() {
  usePageTitle("The Tiranga — Our Presence");
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        eyebrow="Our Presence"
        title="The Tiranga"
        subtitle="From grassroots service to national stages — the footprint of The Tiranga in 2026."
      />

      <div className="mb-16 grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-primary/20 bg-card/60 p-6 text-center">
            <div className="font-serif text-3xl text-primary md:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-8 text-center font-serif text-3xl text-foreground">Our Journey</h2>
        <ol className="relative space-y-8 border-l border-primary/30 pl-8 md:pl-10">
          {milestones.map((m) => (
            <li key={m.title} className="relative">
              <span className="absolute -left-[3.15rem] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-background text-primary md:-left-[3.65rem]">
                <m.icon className="h-4 w-4" />
              </span>
              <div
                className={`overflow-hidden rounded-2xl border border-primary/25 bg-card/60 ${
                  m.photo ? "md:grid md:grid-cols-[1fr_260px]" : ""
                }`}
              >
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{m.tag}</p>
                  <h3 className="mt-2 font-serif text-2xl text-primary">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-foreground/85">{m.text}</p>
                </div>
                {m.photo && (
                  <div className="relative h-48 md:h-auto">
                    <img
                      src={m.photo}
                      alt={m.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="mb-2 text-center font-serif text-3xl text-foreground">Gallery</h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">Places The Tiranga has been part of.</p>
        <div className="columns-2 gap-4 md:columns-3">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-primary/20 break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="w-full transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 pt-8 text-left text-xs text-foreground opacity-0 transition group-hover:opacity-100">
                {g.caption}
              </span>
            </button>
          ))}
        </div>
      </section>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[open].caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <button className="absolute right-4 top-4 text-primary" aria-label="Close" onClick={() => setOpen(null)}>
            <X className="h-8 w-8" />
          </button>
          <button
            className="absolute left-2 text-primary md:left-6"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[open].src}
              alt={gallery[open].caption}
              className="mx-auto max-h-[80vh] rounded-xl border border-primary/25 object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {gallery[open].caption} · {open + 1} / {gallery.length}
            </figcaption>
          </figure>
          <button
            className="absolute right-2 text-primary md:right-6"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </div>
  );
}
