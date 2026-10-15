import CareerForm from "../components/CareerForm";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

const questions = [
  "Not sure what to pursue?",
  "Confused between different career options?",
  "Want to understand opportunities beyond the usual paths?",
  "Looking for guidance to make the right academic and career decisions?",
];

export default function CareerCounselling() {
  usePageTitle("Career Counselling — The Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader
        eyebrow="Your Career. Your Future. Your Choice."
        title="Career Counselling Session"
        className="mb-10"
      />

      <div className="space-y-4 leading-relaxed text-foreground/85">
        <p>
          <span className="text-primary">The Tiranga Organisation</span> is organising a Career Counselling
          Session for students who are looking for clarity about their future, exploring different career paths,
          or simply unsure about what comes next.
        </p>
        <p>
          From choosing the right course and understanding career opportunities to identifying your interests and
          making informed decisions — this session is designed to help you navigate the many choices ahead.
        </p>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {questions.map((q) => (
          <li key={q} className="rounded-2xl border border-primary/20 bg-card/60 p-4 text-sm text-foreground/90">
            <span className="mr-2 text-primary">✦</span>
            {q}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center font-serif text-xl italic text-primary">
        Because choosing a career starts with understanding your options.
      </p>

      <section id="register" className="mt-12">
        <h2 className="mb-2 text-center font-serif text-3xl text-foreground">Register Here</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Fill in the form below — it takes about 3 minutes.
        </p>
        <CareerForm />
      </section>
    </div>
  );
}
