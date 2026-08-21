import { useLanguage } from "../../i18n/useLanguage";

function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Switch language"
      className="flex h-9 items-center gap-1 rounded-full border border-[var(--border)] px-3 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
    >
      <span className={lang === "en" ? "text-[var(--accent)]" : ""}>EN</span>
      <span aria-hidden="true" className="text-[var(--border)]">|</span>
      <span className={lang === "ur" ? "text-[var(--accent)]" : ""}>اردو</span>
    </button>
  );
}

export default LanguageToggle;
