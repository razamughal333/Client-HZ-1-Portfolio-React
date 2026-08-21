import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import BehanceProjects from "../components/BehanceProjects";
import SectionHeading from "../components/ui/SectionHeading";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageToggle from "../components/ui/LanguageToggle";

function AllWork() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)]"
    >
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/90 px-6 py-4 backdrop-blur sm:px-8">
        <Link
          to="/"
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t.nav.backToHome}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-16 sm:px-8">
        <SectionHeading
          eyebrow={t.work.allWorkEyebrow}
          heading={t.work.allWorkHeading}
          body={t.work.allWorkBody}
        />
      </main>

      <BehanceProjects showHeading={false} />
    </motion.div>
  );
}

export default AllWork;
