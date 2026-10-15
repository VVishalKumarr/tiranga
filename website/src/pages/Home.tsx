import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "../components/BrandIcons";
import { usePageTitle } from "../usePageTitle";

const highlights = [
  {
    title: "400+ Delegates",
    text: "The largest conference hosted on July 11–12 2026 across India.",
  },
  {
    title: "Youth-Led",
    text: "Organised, led and shaped by students for students. By the youth, for the youth.",
  },
  {
    title: "Hosted at Hansraj College",
    text: "Held at Hansraj College, University of Delhi — North Campus.",
  },
];

const explore = [
  {
    to: "/alumni",
    eyebrow: "Our People",
    title: "Alumni",
    text: "Meet the alumni carrying the spirit of Sudharshan to campuses across India and abroad.",
  },
  {
    to: "/the-tiranga",
    eyebrow: "Our Presence",
    title: "The Tiranga",
    text: "From a cloth donation drive to Bharat Mandapam — the journey of The Tiranga in 2026.",
  },
  {
    to: "/career-counselling",
    eyebrow: "Register Now",
    title: "Career Counselling",
    text: "Unsure what comes next? Sign up for our career counselling session for students.",
  },
];

const socialClass =
  "group inline-flex items-center justify-center gap-2.5 rounded-full border border-primary px-6 py-2.5 text-sm font-medium tracking-wide text-primary transition hover:bg-primary/10";

export default function Home() {
  usePageTitle("The Sudharshan Summit — Preserving Diplomacy | 11–12 July 2026");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.26_0.12_304.8)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-28 text-center">
          <img
            src="/images/sudharshan-logo.png"
            alt="The Sudharshan Summit emblem"
            className="mx-auto h-72 w-72 object-contain drop-shadow-[0_0_45px_oklch(0.83_0.13_88_/_35%)]"
          />
          <h1 className="mt-2 font-serif text-5xl leading-tight text-primary md:text-7xl">
            The Sudharshan <span className="text-primary">Summit</span>
          </h1>
          <p className="mt-4 text-3xl italic text-muted-foreground md:text-4xl">Preserving Diplomacy</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/maiden-edition"
              className="rounded-full bg-primary px-9 py-4 text-base font-medium text-primary-foreground transition hover:opacity-90 md:text-lg"
            >
              Our Maiden Edition
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-primary/50 px-9 py-4 text-base font-medium text-primary transition hover:bg-primary/10 md:text-lg"
            >
              About Us
            </Link>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.youtube.com/@TheSudharshanSummit"
              target="_blank"
              rel="noopener noreferrer"
              className={socialClass}
            >
              <YoutubeIcon className="h-5 w-5" />
              YouTube
            </a>
            <a
              href="https://www.instagram.com/thesudharshansummit/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialClass}
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-2xl border border-primary/20 bg-card/60 p-6 backdrop-blur">
            <h3 className="font-serif text-2xl text-primary">{h.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-center font-serif text-3xl text-foreground">Explore More</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {explore.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="group rounded-2xl border border-primary/20 bg-card/60 p-6 transition hover:border-primary"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{e.eyebrow}</p>
              <h3 className="mt-2 font-serif text-2xl text-primary">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
