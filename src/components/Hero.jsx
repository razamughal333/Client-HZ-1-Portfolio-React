import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function SocialLink({ href, label, children, disabled }) {
  if (disabled) {
    return (
      <span
        className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] opacity-50"
        aria-label={label}
        title={label}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
    >
      {children}
    </a>
  );
}

function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24"
    >
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)] reveal">
        {t.hero.eyebrow}
      </span>

      <h1
        className="reveal font-serif text-4xl leading-[1.1] text-[var(--ink)] sm:text-6xl"
        style={{ animationDelay: "80ms" }}
      >
        {t.hero.name}
      </h1>

      <p
        className="reveal max-w-xl text-lg text-[var(--muted)] sm:text-xl"
        style={{ animationDelay: "140ms" }}
      >
        {t.hero.title}
      </p>

      <p
        className="reveal max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base"
        style={{ animationDelay: "200ms" }}
      >
        {t.hero.intro}
      </p>

      <div
        className="reveal flex flex-wrap items-center gap-3 pt-2"
        style={{ animationDelay: "260ms" }}
      >
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
        >
          {t.hero.ctaPrimary}
        </button>
        <button
          type="button"
          onClick={() => scrollTo("work")}
          className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
        >
          {t.hero.ctaSecondary}
        </button>
      </div>

      <div
        className="reveal flex items-center gap-3 pt-6"
        style={{ animationDelay: "320ms" }}
      >
        <SocialLink href={CV.linkedin} label={t.social.linkedin}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.03 21 14.1V21h-4v-6.05c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21H9z" />
          </svg>
        </SocialLink>
        <SocialLink href={CV.instagram} label={t.social.instagram} disabled={!CV.instagram}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </SocialLink>
        <SocialLink href={`mailto:${CV.email}`} label={t.social.email}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </SocialLink>
      </div>
    </section>
  );
}

export default Hero;
