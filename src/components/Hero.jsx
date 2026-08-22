import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import HeroBackground from "./HeroBackground";
import SpiderWebAnimation from "./SpiderWebAnimation";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Dedicated entrance for the portrait — kept separate from the text
// stagger per the brief: opacity 0→1, scale 0.96→1, slight upward move.
const portraitVariant = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

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
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      data-cursor="hover"
      whileHover={{ y: -3 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
    >
      {children}
    </motion.a>
  );
}

function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden">
      <HeroBackground />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1 variants={item} className="font-serif text-4xl leading-[1.1] text-[var(--ink)] sm:text-6xl">
            {t.hero.name}
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg text-[var(--muted)] sm:text-xl">
            {t.hero.title}
          </motion.p>

          <motion.p variants={item} className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t.hero.intro}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              type="button"
              onClick={() => scrollTo("contact")}
              data-cursor="hover"
              data-cursor-label="Hire"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.hero.ctaPrimary}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollTo("work")}
              data-cursor="hover"
              data-cursor-label="View"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.hero.ctaSecondary}
            </motion.button>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3 pt-6">
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
          </motion.div>
        </motion.div>

        {/* Decorative animated illustration — spider crawling its web —
            in place of the portrait, which stays on the About section. */}
        <motion.div
          variants={portraitVariant}
          initial="hidden"
          animate="visible"
          className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:ml-auto"
        >
          <SpiderWebAnimation />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
