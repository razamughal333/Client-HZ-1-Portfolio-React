import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageToggle from "./ui/LanguageToggle";

const NAV_LINKS = [
  { key: "home", id: "hero" },
  { key: "about", id: "about" },
  { key: "skills", id: "skills" },
  { key: "experience", id: "experience" },
  { key: "services", id: "services" },
  { key: "work", id: "work" },
  { key: "contact", id: "contact" },
];

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          to="/"
          onClick={() => goToSection("hero")}
          className="font-serif text-lg text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] rounded-sm"
        >
          Habiba Zulfiqar
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => goToSection(link.id)}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] rounded-sm"
            >
              {t.nav[link.key]}
            </button>
          ))}
          <div className="mx-1 h-5 w-px bg-[var(--border)]" aria-hidden="true" />
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {t.nav.hireMe}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[65px] z-30 origin-top border-b border-[var(--border)] bg-[var(--bg)] shadow-lg transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 sm:px-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => goToSection(link.id)}
              className="rounded-sm py-2.5 text-left text-base font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t.nav[link.key]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="mt-2 w-fit rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-ink)]"
          >
            {t.nav.hireMe}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
