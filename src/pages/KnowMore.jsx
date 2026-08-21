import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "../components/ui/SectionHeading";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageToggle from "../components/ui/LanguageToggle";
import StaggerContainer, { StaggerItem } from "../components/motion/StaggerContainer";
import Reveal from "../components/motion/Reveal";

const SKILL_GROUPS = (t) => [
  { label: t.skills.softwareLabel, items: CV.software },
  { label: t.skills.designLabel, items: CV.designSkills },
  { label: t.skills.strengthsLabel, items: CV.strengths },
];

function KnowMore() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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

      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <SectionHeading eyebrow={t.knowMore.eyebrow} heading={t.knowMore.heading} />

        <Reveal>
          <section className="mb-14">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.profileHeading}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {t.knowMore.profileBody}
            </p>
          </section>
        </Reveal>

        <section className="mb-14">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            {t.knowMore.skillsHeading}
          </h3>
          <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SKILL_GROUPS(t).map((group) => (
              <StaggerItem key={group.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-xs text-[var(--ink)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.educationHeading}
            </h3>
            <StaggerContainer className="flex flex-col gap-4">
              {CV.education.map((ed) => (
                <StaggerItem key={ed.degree}>
                  <div className="border-l-2 border-[var(--border)] pl-4">
                    <p className="font-serif text-base">{ed.degree}</p>
                    <p className="text-sm text-[var(--muted)]">{ed.institute}</p>
                    <p className="text-xs text-[var(--muted)]">{ed.period}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.certificationsHeading}
            </h3>
            <StaggerContainer className="flex flex-col gap-4">
              {CV.certifications.map((c) => (
                <StaggerItem key={c.name}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <p className="font-serif text-base">{c.name}</p>
                    <p className="text-sm text-[var(--muted)]">{c.institute}</p>
                    <p className="text-xs text-[var(--muted)]">{c.period}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2">
          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.languagesHeading}
            </h3>
            <StaggerContainer className="flex flex-col gap-2">
              {CV.languages.map((l) => (
                <StaggerItem key={l.name}>
                  <div className="flex justify-between text-sm">
                    <span>{l.name}</span>
                    <span className="text-[var(--muted)]">{l.level}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <Reveal delay={0.1}>
            <section>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {t.knowMore.interestsHeading}
              </h3>
              <p className="text-sm text-[var(--muted)]">{t.knowMore.interestsPlaceholder}</p>
            </section>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap gap-3">
            <motion.a
              href={CV.cvFile}
              download
              data-cursor="hover"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.knowMore.downloadCv}
            </motion.a>
            <motion.a
              href={CV.behance}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.knowMore.viewBehance}
            </motion.a>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              >
                {t.nav.backToHome}
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </main>
    </motion.div>
  );
}

export default KnowMore;
