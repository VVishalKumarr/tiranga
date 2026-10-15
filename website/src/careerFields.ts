// Questions for the Career Counselling registration form. Shared by the form (src/components/CareerForm.tsx),
// the submit API (api/submit.ts) and the admin dashboard (src/pages/Admin.tsx), so edit questions here only.
//
// `key` is how an answer is stored — don't rename it once responses exist, or older answers won't show.
// Option `value`s are stored; `label`s are what people see.

export type Option = { value: string; label: string };
type Base = { key: string; label: string; short: string; required: boolean };
export type Field =
  | (Base & { kind: "text" | "email" | "tel" | "number" | "textarea" })
  | (Base & { kind: "radio"; options: Option[] })
  | (Base & { kind: "checkbox"; options: Option[]; other?: boolean });

export type Answers = Record<string, string | string[]>;

export type StoredResponse = {
  id: string;
  submittedAt: string;
  answers: Answers;
  /** Free text typed into the "Other" option of a checkbox question, keyed by field key. */
  other?: Record<string, string>;
};

const opt = (value: string, label?: string): Option => ({ value, label: label ?? value });

export const fields: Field[] = [
  { key: "name", kind: "text", label: "Name", short: "Name", required: true },
  { key: "age", kind: "number", label: "Age", short: "Age", required: true },
  { key: "email", kind: "email", label: "Email Address", short: "Email", required: true },
  { key: "phone", kind: "tel", label: "Phone Number", short: "Phone", required: true },
  {
    key: "grade",
    kind: "radio",
   
    label: "Grade",
    short: "Grade",
    required: true,
    options: [opt("9th"), opt("10th"), opt("11th"), opt("12th")],
  },
  {
    key: "stream",
    kind: "radio",
   
    label: "If you are in 11th/12th, select your stream",
    short: "Stream",
    required: false,
    options: [opt("SCIENCE", "Science"), opt("COMMERCE", "Commerce"), opt("HUMANITIES", "Humanities")],
  },
  {
    key: "favouriteSubject",
    kind: "text",
   
    label: "Which subject do you like studying the most?",
    short: "Favourite subject",
    required: true,
  },
  {
    key: "performance",
    kind: "radio",
   
    label: "How would you describe your current academic performance?",
    short: "Academic performance",
    required: true,
    options: [
      opt("EXCELLENT", "Excellent"),
      opt("GOOD", "Good"),
      opt("AVERAGE", "Average"),
      opt("STRUGGLING", "Struggling"),
      opt("PREFER NOT TO SAY", "Prefer not to say"),
    ],
  },
  {
    key: "careerInMind",
    kind: "radio",
   
    label: "Do you currently have a career or field in mind?",
    short: "Career in mind?",
    required: true,
    options: [
      opt("YES , VERY CLEARLY", "Yes, very clearly"),
      opt("I HAVE A FEW OPTIONS", "I have a few options"),
      opt("I HAVE SOME VAGUE IDEAS", "I have some vague ideas"),
      opt("NO ,  I AM COMPLETELY UNSURE", "No, I am completely unsure"),
    ],
  },
  {
    key: "careersConsidering",
    kind: "text",
   
    label: "If yes, what career(s) / field(s) are you considering?",
    short: "Careers considering",
    required: false,
  },
  {
    key: "interests",
    kind: "checkbox",
   
    label: "Which areas are you most interested in? (Select all that apply)",
    short: "Areas of interest",
    required: true,
    other: true,
    options: [
      opt("LAW & POLICY", "Law & Policy"),
      opt("MEDICINE & HEALTHCARE", "Medicine & Healthcare"),
      opt("ENGINEERING & TECHNOLOGY", "Engineering & Technology"),
      opt("BUSINESS & ENTERPRENEURSHIP", "Business & Entrepreneurship"),
      opt("FINANCE & ECONOMICS", "Finance & Economics"),
      opt("PSYCHOLOGY", "Psychology"),
      opt("SOCIAL SCIENCE", "Social Science"),
      opt("MEDIA & JOURNALISM", "Media & Journalism"),
      opt("DESIGN & ARCHITECTURE", "Design & Architecture"),
      opt("ARTS & PERFORMING ARTS", "Arts & Performing Arts"),
      opt("ENVIRONMENT & SUSTAINALBILITY", "Environment & Sustainability"),
      opt("EDUCATION", "Education"),
      opt("GOVERNMENT / CIVIL SERVICES", "Government / Civil Services"),
      opt("RESEARCH & ACADEMICS", "Research & Academics"),
      opt("SPORTS", "Sports"),
    ],
  },
  {
    key: "anythingElse",
    kind: "textarea",
   
    label: "Is there anything else you'd like us to know to help us prepare for the session?",
    short: "Anything else",
    required: true,
  },
];

/** Value sent for the "Other" checkbox; its text goes in `other[field.key]`. */
export const OTHER = "__other_option__";

/** Human-readable text for a stored answer (option labels instead of stored values). */
export function displayValue(f: Field, r: Pick<StoredResponse, "answers" | "other">): string {
  const raw = r.answers[f.key];
  if (raw === undefined || raw === "") return "";
  if (f.kind === "radio" || f.kind === "checkbox") {
    const values = Array.isArray(raw) ? raw : [raw];
    return values
      .map((v) =>
        v === OTHER ? `Other: ${r.other?.[f.key] ?? ""}` : (f.options.find((o) => o.value === v)?.label ?? v),
      )
      .join(", ");
  }
  return Array.isArray(raw) ? raw.join(", ") : raw;
}
