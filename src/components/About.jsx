import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "./ui/SectionHeading";
import AnimatedCounter from "./AnimatedCounter";
import StaggerContainer, { StaggerItem } from "./motion/StaggerContainer";
import Reveal from "./motion/Reveal";

const STATS = [
  { value: 30, suffix: "+", labelKey: "posts" },
  { value: 3, suffix: "+", labelKey: "accounts" },
  { value: null, labelKey: "education" },
  { value: 6, suffix: "+", labelKey: "skills" },
];

function StatBlock({ stat }) {
  const { t } = useLanguage();
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-1 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center"
      >
        <span className="font-serif text-3xl text-[var(--accent)] sm:text-4xl">
          {stat.value !== null ? (
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          ) : (
            "IT"
          )}
        </span>
        <span className="text-xs uppercase tracking-wide text-[var(--muted)]">
          {t.stats[stat.labelKey]}
        </span>
      </motion.div>
    </StaggerItem>
  );
}

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
          <Reveal>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {t.about.body}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href={CV.cvFile}
              download
              data-cursor="hover"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {t.about.downloadCv}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
            </motion.a>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/know-more"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              >
                {t.about.knowMore}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <StaggerContainer className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat) => (
              <StatBlock key={stat.labelKey} stat={stat} />
            ))}
          </StaggerContainer>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-sm justify-self-center overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-muted)] lg:justify-self-end">
              {/* Light-theme image: hidden as soon as .dark is active */}
              <img
                src="/lighthz.png"
                alt={`${CV.name} — ${CV.location}`}
                className="block h-full w-full object-cover dark:hidden"
              />
              {/* Dark-theme image: hidden unless .dark is active */}
              <img
                src="/darkhz.png"
                alt={`${CV.name} — ${CV.location}`}
                className="hidden h-full w-full object-cover dark:block"
              />
              {/* HZ monogram + location caption overlaid on the photo */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-4">
                <p className="font-serif text-2xl font-bold text-white">HZ</p>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  {CV.location}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
