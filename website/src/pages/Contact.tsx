import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "../components/BrandIcons";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

const people = [
  { name: "Mr. Ahaan Mahajan", role: "Founder", phone: "+91 99107 33036", tel: "+919910733036" },
  { name: "Ms. Ananya Das", role: "Outreach Manager", phone: "+91 92892 13611", tel: "+919289213611" },
];

const linkCard =
  "flex items-center gap-3 rounded-2xl border border-primary/25 bg-card/60 p-6 transition hover:border-primary";

export default function Contact() {
  usePageTitle("Contact — Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader eyebrow="Get in Touch" title="Contact Us" />
      <div className="grid gap-5 md:grid-cols-2">
        {people.map((p) => (
          <div key={p.name} className="rounded-2xl border border-primary/25 bg-card/60 p-6">
            <h3 className="font-serif text-xl text-primary">{p.name}</h3>
            <p className="text-sm text-muted-foreground">{p.role}</p>
            <a href={`tel:${p.tel}`} className="mt-4 flex items-center gap-2 text-sm hover:text-primary">
              <Phone className="h-4 w-4 text-primary" /> {p.phone}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <a href="mailto:thesudharshansummit@gmail.com" className={linkCard}>
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
            <div className="break-all font-serif text-lg text-foreground">thesudharshansummit@gmail.com</div>
          </div>
        </a>
        <a href="https://instagram.com/thesudharshansummit" target="_blank" rel="noreferrer" className={linkCard}>
          <InstagramIcon className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</div>
            <div className="font-serif text-lg text-foreground">@thesudharshansummit</div>
          </div>
        </a>
      </div>
    </div>
  );
}
