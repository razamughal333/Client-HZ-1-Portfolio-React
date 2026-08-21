import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { useActiveSection } from "../hooks/useActiveSection";
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

function HZMark({ open }) {
  return (
    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] font-serif text-sm text-[var(--ink)]">
      {/* Bracket corner accents, echoing a "┐" motif */}
      <motion.span
        className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-[var(--accent)]"
        animate={{ rotate: open ? 90 : 0, opacity: open ? 1 : 0.8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      HZ
    </span>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));

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
    <>
      {/* Floating corner control — HZ monogram + toggles, top-right */}
      <div className="fixed right-4 top-4 z-50 flex items-start gap-2 sm:right-6 sm:top-6">
        <div className="hidden items-center gap-2 sm:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="corner-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="hover"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] rounded-full"
        >
          <HZMark open={open} />
        </button>
      </div>

      {/* Corner flyout panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />
            <motion.div
              id="corner-nav-panel"
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 top-20 z-50 w-[min(90vw,20rem)] origin-top-right rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl sm:right-6 sm:top-24"
            >
              <div className="mb-3 flex items-center gap-2 sm:hidden">
                <LanguageToggle />
                <ThemeToggle />
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = location.pathname === "/" && activeId === link.id;
                  return (
                    <motion.button
                      key={link.key}
                      type="button"
                      onClick={() => goToSection(link.id)}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      data-cursor="hover"
                      className={`flex items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                        isActive
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "text-[var(--ink)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      {t.nav[link.key]}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              <Link
                to="/know-more"
                onClick={() => setOpen(false)}
                data-cursor="hover"
                className="mt-3 flex items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {t.nav.knowMore}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={() => goToSection("contact")}
                data-cursor="hover"
                className="mt-4 w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              >
                {t.nav.hireMe}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
