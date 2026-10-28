import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "../components/BrandIcons";
import { usePageTitle } from "../usePageTitle";

const explore = [
  {
    to: "/alumni",
    eyebrow: "Our People",
    title: "Alumni",
    text: "Meet the alumni carrying the spirit of Tiranga to campuses across India and abroad.",
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
  usePageTitle("Tiranga");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgb(255_153_51_/_22%)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom,_rgb(76_185_68_/_18%)_0%,_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-28 text-center">
          <img
            src="/images/tiranga-logo.png"
            alt="Tiranga logo"
            className="mx-auto h-72 w-72 object-contain drop-shadow-[0_0_45px_oklch(0.77_0.16_60_/_35%)]"
          />
          <h1 className="mt-2 font-serif text-5xl leading-tight text-primary md:text-7xl">
            Tir<span className="text-foreground">an</span><span className="text-green">ga</span>
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.instagram.com/tirangaorg/"
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
