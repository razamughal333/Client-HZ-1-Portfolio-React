import { motion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "./ui/SectionHeading";
import StaggerContainer, { StaggerItem } from "./motion/StaggerContainer";

const GROUP_ICONS = {
  software: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  design: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 000 18c1.5 0 2-1 2-2s-.5-1.5-1-2 .5-2 2-2h1a4 4 0 000-8" />
    </svg>
  ),
  strengths: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
};

function SkillGroup({ label, items, icon, delay = 0 }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="group relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]"
      >
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="relative mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)] transition-transform duration-300 group-hover:rotate-6">
            {icon}
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            {label}
          </h3>
        </div>
        <div className="relative flex flex-wrap gap-2">
          {items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-sm text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </StaggerItem>
  );
}

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.skills.eyebrow} heading={t.skills.heading} />
      <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SkillGroup label={t.skills.softwareLabel} items={CV.software} icon={GROUP_ICONS.software} />
        <SkillGroup label={t.skills.designLabel} items={CV.designSkills} icon={GROUP_ICONS.design} delay={0.05} />
        <SkillGroup label={t.skills.strengthsLabel} items={CV.strengths} icon={GROUP_ICONS.strengths} delay={0.1} />
      </StaggerContainer>
    </section>
  );
}

export default Skills;
