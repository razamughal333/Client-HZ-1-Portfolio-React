import { useLanguage } from "../i18n/useLanguage";
import SectionHeading from "./ui/SectionHeading";

function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.services.eyebrow} heading={t.services.heading} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.services.items.map((item, i) => (
          <div
            key={item.title}
            className="reveal flex flex-col gap-3 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-xs font-medium text-[var(--muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-lg text-[var(--ink)]">{item.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
