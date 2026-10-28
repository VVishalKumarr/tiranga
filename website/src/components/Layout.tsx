import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Mail, Menu, X } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/alumni", label: "Alumni" },
  { to: "/the-tiranga", label: "The Tiranga" },
  { to: "/career-counselling", label: "Career Counselling" },
  { to: "/contact", label: "Contact" },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`;

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/85 backdrop-blur">
        <div className="tricolour-stripe" />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/images/tiranga-logo.png"
              alt="Tiranga logo"
              className="h-16 w-16 object-contain"
            />
            <div className="font-serif text-lg leading-tight text-primary">Tiranga</div>
          </Link>
          <nav className="hidden flex-wrap justify-end gap-x-5 gap-y-1 text-sm xl:flex">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={navClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="text-primary xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-primary/15 px-6 pb-4 xl:hidden">
            <ul className="mx-auto max-w-7xl">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={(s) => `block py-2.5 ${navClass(s)}`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-24 bg-secondary/40">
        <div className="tricolour-stripe" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="font-serif text-xl text-primary">Tiranga</div>
          </div>
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-widest text-primary">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {NAV_LINKS.slice(1).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-widest text-primary">Reach Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:thetirangaorganisation@gmail.com" className="break-all hover:text-primary">
                  thetirangaorganisation@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="h-4 w-4 shrink-0 text-primary" />
                <a href="https://instagram.com/tirangaorg" className="hover:text-primary">
                  @tirangaorg
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary/15 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tiranga. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
