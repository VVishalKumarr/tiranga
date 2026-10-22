import { Mail } from "lucide-react";
import { InstagramIcon } from "../components/BrandIcons";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

const linkCard =
  "flex items-center gap-3 rounded-2xl border border-primary/25 bg-card/60 p-6 transition hover:border-primary";

export default function Contact() {
  usePageTitle("Contact — Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader eyebrow="Get in Touch" title="Contact Us" />
      <div className="grid gap-5 md:grid-cols-2">
        <a href="mailto:thetirangaorganisation@gmail.com" className={linkCard}>
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
            <div className="break-all font-serif text-lg text-foreground">thetirangaorganisation@gmail.com</div>
          </div>
        </a>
        <a href="https://instagram.com/tirangaorg" target="_blank" rel="noreferrer" className={linkCard}>
          <InstagramIcon className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</div>
            <div className="font-serif text-lg text-foreground">@tirangaorg</div>
          </div>
        </a>
      </div>
    </div>
  );
}
