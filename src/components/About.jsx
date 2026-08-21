import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "./ui/SectionHeading";

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
          <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t.about.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CV.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.about.downloadCv}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
            </a>
            <Link
              to="/know-more"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.about.knowMore}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-sm justify-self-center overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-muted)] lg:justify-self-end">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="font-serif text-5xl text-[var(--accent)]">HZ</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {CV.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
