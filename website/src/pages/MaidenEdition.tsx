import { Calendar, MapPin, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

export default function MaidenEdition() {
  usePageTitle("Maiden Edition — The Sudharshan Summit");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <PageHeader
        eyebrow="Where It All Began"
        title="Our Maiden Edition"
        subtitle="The first chapter of The Sudharshan Summit."
      />
      <div className="mb-12 overflow-hidden rounded-2xl border border-primary/25">
        <img
          src="/images/hansraj-venue.png"
          alt="Hansraj College, University of Delhi — North Campus"
          className="w-full object-cover"
        />
      </div>
      <section className="mb-12 space-y-4 text-lg leading-relaxed text-foreground/85">
        <p>
          Our inaugural edition was proudly hosted at{" "}
          <span className="text-primary">Hansraj College, University of Delhi</span> — situated in the
          prestigious North Campus and{" "}
          <span className="text-primary">
            ranked 3rd among colleges in India by the National Institutional Ranking Framework (NIRF) 2025
          </span>
          .
        </p>
        <p>
          Over <span className="text-primary">400+ delegates</span> came together on{" "}
          <span className="text-primary">11th &amp; 12th July 2026</span>, making The Sudharshan Summit the{" "}
          <span className="text-primary">largest conference</span> hosted on those dates.
        </p>
      </section>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/25 bg-card/60 p-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-serif text-xl text-primary">Hansraj College, University of Delhi</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Hansraj College, DU — North Campus served as the official venue for the youth summit. The college is
            ranked 3rd in India by the National Institutional Ranking Framework (NIRF) 2025.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-card/60 p-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-serif text-xl text-primary">11th &amp; 12th July 2026</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The Sudharshan Summit is considered to be the largest conference to be hosted on 11th and 12th of
            July 2026.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-card/60 p-6 md:col-span-2">
          <Users className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-serif text-xl text-primary">400+ Delegates</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The youth summit hosted over 400+ Delegates with 30 Executive Board members, 50 On-Ground Team
            members and 20 Team Members from Our Sponsors — allowing us to host a footfall of 500 people.
          </p>
        </div>
      </div>
    </div>
  );
}
