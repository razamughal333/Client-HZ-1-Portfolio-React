import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "./ui/SectionHeading";

function SkillGroup({ label, items }) {
  return (
    <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-sm text-[var(--ink)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.skills.eyebrow} heading={t.skills.heading} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SkillGroup label={t.skills.softwareLabel} items={CV.software} />
        <SkillGroup label={t.skills.designLabel} items={CV.designSkills} />
        <SkillGroup label={t.skills.strengthsLabel} items={CV.strengths} />
      </div>
    </section>
  );
}

export default Skills;
