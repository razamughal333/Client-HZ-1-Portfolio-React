import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import SectionHeading from "./ui/SectionHeading";
import StaggerContainer, { StaggerItem } from "./motion/StaggerContainer";

function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.services.eyebrow} heading={t.services.heading} />
      <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.services.items.map((item, i) => (
          <StaggerItem key={item.title}>
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]"
            >
              <motion.div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="relative text-xs font-medium text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-serif text-lg text-[var(--ink)]">{item.title}</h3>
              <p className="relative text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
              <motion.span
                className="relative mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </motion.span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export default Services;
