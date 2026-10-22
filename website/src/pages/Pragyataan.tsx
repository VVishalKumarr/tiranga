import { Mail, Phone } from "lucide-react";
import { usePageTitle } from "../usePageTitle";

const stats = [
  { value: "350+", label: "Participants/Students" },
  { value: "70+", label: "Schools" },
  { value: "Free", label: "No Fees" },
];

const videos = [
  { id: "fQY-Av6Pfe8", title: "UN Committees Training Session" },
  { id: "diVBDj6N6Pk", title: "Indian Committees Training Session" },
];

const contacts = [
  { name: "Mr. Ahaan Mahajan", role: "Founder", phone: "+91 99107 33036" },
  { name: "Ms. Nishtha Bhatia", role: "Convenor", phone: "+91 95602 85533" },
];

export default function Pragyataan() {
  usePageTitle("Pragyataan — The Sudharshan Summit");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="-mt-10 mb-10 flex flex-col items-center text-center">
        <img
          src="/images/pragyataan-logo.png"
          alt="Pragyataan emblem"
          className="h-44 w-44 object-contain drop-shadow-[0_0_40px_oklch(0.77_0.16_60_/_30%)]"
        />
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Initiative</p>
        <h1 className="mt-2 font-serif text-5xl text-foreground">Pragyataan</h1>
      </header>
      <p className="leading-relaxed text-foreground/85">
        Pragyataan is an initiative under The Sudharshan Summit, successfully conducted as a platform to provide
        knowledge to those who seek it through curated educational sessions led by experienced delegates. With
        an overwhelming response, the workshop witnessed participation from{" "}
        <span className="text-primary">350+ participants/students</span> across{" "}
        <span className="text-primary">70+ schools</span>, including 2 official school delegations. It catered
        to beginners as well as first-time participants, ensuring accessibility with no registration or session
        fees, making it an inclusive space for aspiring intellectuals.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-primary/20 bg-card/60 p-6 text-center">
            <div className="font-serif text-4xl text-primary">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-primary">Training Sessions</h2>
        <p className="mt-2 text-sm text-muted-foreground">Recorded training sessions from Pragyataan.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <div key={v.id} className="overflow-hidden rounded-2xl border border-primary/25 bg-card/60">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-4">
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg text-primary hover:opacity-80"
                >
                  {v.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-primary/25 bg-card/60 p-8 md:p-10">
        <h2 className="font-serif text-2xl text-primary">Want us to host a training session in your institution?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Reach out and we'll get back to you.</p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <a href="mailto:thesudharshansummit@gmail.com" className="break-all hover:text-primary">
              thesudharshansummit@gmail.com
            </a>
          </div>
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="text-foreground">{c.name}</span>{" "}
                <span className="text-muted-foreground">
                  · {c.role} · {c.phone}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
