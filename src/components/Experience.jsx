import { useLanguage } from "../i18n/useLanguage";
import SectionHeading from "./ui/SectionHeading";

function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.experience.eyebrow} heading={t.experience.heading} />

      <div className="relative border-l border-[var(--border)] pl-8">
        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]" />
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-serif text-xl text-[var(--ink)] sm:text-2xl">
            {t.experience.role}
          </h3>
          <span className="text-sm text-[var(--muted)]">{t.experience.period}</span>
        </div>
        <p className="mb-4 text-sm text-[var(--accent)]">{t.experience.location}</p>

        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {t.experience.positioning}
        </p>

        <ul className="flex max-w-2xl flex-col gap-2.5">
          {t.experience.responsibilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--ink)] sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Experience;
