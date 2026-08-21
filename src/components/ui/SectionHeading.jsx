function SectionHeading({ eyebrow, heading, body, align = "left" }) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`mb-10 flex max-w-2xl flex-col gap-2 sm:mb-14 ${alignClass}`}>
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl text-[var(--ink)] sm:text-4xl">{heading}</h2>
      {body && (
        <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{body}</p>
      )}
    </div>
  );
}

export default SectionHeading;
