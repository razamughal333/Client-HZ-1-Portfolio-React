import { useLanguage } from "../i18n/useLanguage";
import SectionHeading from "./ui/SectionHeading";

function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.testimonials.eyebrow} heading={t.testimonials.heading} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {t.testimonials.items.map((item, i) => (
          <figure
            key={i}
            className="flex flex-col justify-between gap-4 rounded-sm border border-dashed border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                {t.testimonials.sampleBadge}
              </span>
              <blockquote className="font-serif text-lg leading-snug text-[var(--ink)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="text-sm text-[var(--muted)]">
              <span className="block font-medium text-[var(--ink)]">{item.name}</span>
              {item.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
