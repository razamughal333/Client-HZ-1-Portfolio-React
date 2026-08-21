import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "../components/ui/SectionHeading";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageToggle from "../components/ui/LanguageToggle";

function KnowMore() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/90 px-6 py-4 backdrop-blur sm:px-8">
        <Link
          to="/"
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

        <section className="mb-12">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            {t.knowMore.profileHeading}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t.knowMore.profileBody}
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            {t.knowMore.skillsHeading}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...CV.software, ...CV.designSkills, ...CV.strengths].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.educationHeading}
            </h3>
            <ul className="flex flex-col gap-4">
              {CV.education.map((ed) => (
                <li key={ed.degree} className="border-l-2 border-[var(--border)] pl-4">
                  <p className="font-serif text-base">{ed.degree}</p>
                  <p className="text-sm text-[var(--muted)]">{ed.institute}</p>
                  <p className="text-xs text-[var(--muted)]">{ed.period}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.certificationsHeading}
            </h3>
            <ul className="flex flex-col gap-4">
              {CV.certifications.map((c) => (
                <li key={c.name} className="border-l-2 border-[var(--border)] pl-4">
                  <p className="font-serif text-base">{c.name}</p>
                  <p className="text-sm text-[var(--muted)]">{c.institute}</p>
                  <p className="text-xs text-[var(--muted)]">{c.period}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2">
          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.languagesHeading}
            </h3>
            <ul className="flex flex-col gap-2">
              {CV.languages.map((l) => (
                <li key={l.name} className="flex justify-between text-sm">
                  <span>{l.name}</span>
                  <span className="text-[var(--muted)]">{l.level}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t.knowMore.interestsHeading}
            </h3>
            <p className="text-sm text-[var(--muted)]">{t.knowMore.interestsPlaceholder}</p>
          </section>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <a
            href={CV.cvFile}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {t.knowMore.downloadCv}
          </a>
          <a
            href={CV.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {t.knowMore.viewBehance}
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {t.nav.backToHome}
          </Link>
        </div>
      </main>
    </div>
  );
}

export default KnowMore;
