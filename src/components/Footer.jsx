import { useLanguage } from "../i18n/useLanguage";

const DEVELOPER_GITHUB = "https://github.com/razamughal333";
const DEVELOPER_PHONE = "923362236669";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--border)] px-6 py-8 text-center sm:px-8">
      <p className="text-sm text-[var(--muted)]">
        {t.footer.designedBy}{" "}
        <a
          href={DEVELOPER_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--ink)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
        >
          Raza Ahmed
        </a>
      </p>
      <p className="mt-1 text-xs text-[var(--muted)] opacity-70">{DEVELOPER_PHONE}</p>
      <p className="mt-2 text-xs text-[var(--muted)]">
        © 2026 {t.footer.rights}
      </p>
    </footer>
  );
}

export default Footer;
