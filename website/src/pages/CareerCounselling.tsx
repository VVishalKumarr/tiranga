import CareerForm from "../components/CareerForm";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

const questions = [
  "Not sure what and where to pursue?",
  "Confused about which colleges and universities to apply to?",
  "Need help with applications, entrance exams and admissions?",
  "Looking for guidance to get into the right college for you?",
];

export default function CareerCounselling() {
  usePageTitle("Career Counselling — The Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader
        eyebrow="Your Career. Your Future. Your Choice."
        title="Career & College Counselling for High School Students"
        className="mb-10"
      />

      <div className="space-y-4 leading-relaxed text-foreground/85">
        <p>
          <span className="text-primary">The Tiranga Organisation</span> organises Career and College Counselling
          Sessions for high school students who want to know where to go after school — which colleges,
          universities and programmes are the right fit, and how to get in.
        </p>
        <p>
          From shortlisting colleges and understanding admission requirements to preparing applications and
          planning for entrance exams — our sessions are designed to help you secure a place at the college that is
          right for you.
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
        Because the right future starts with the right college.
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
