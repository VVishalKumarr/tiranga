import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found — Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <PageHeader eyebrow="404" title="Page Not Found" subtitle="The page you are looking for doesn't exist." />
      <Link to="/" className="rounded-full bg-primary px-8 py-3 text-primary-foreground hover:opacity-90">
        Back to Home
      </Link>
    </div>
  );
}
