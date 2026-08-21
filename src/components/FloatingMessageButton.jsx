import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";

// No confirmed direct Behance messaging URL was supplied, so this points to
// the confirmed LinkedIn profile instead, per the brief.
const MESSAGE_URL = CV.linkedin;

function FloatingMessageButton() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={MESSAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingButton.label}
      title={t.floatingButton.label}
      data-cursor="hover"
      data-cursor-label="Chat"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="fixed bottom-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] ltr:right-6 rtl:left-6"
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      {!prefersReducedMotion && (
        <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-40 motion-safe:animate-ping" aria-hidden="true" />
      )}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="relative" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.2 0-2.4-.25-3.5-.75L3 21l1.75-5.5A8.5 8.5 0 1121 11.5z" />
      </svg>
    </motion.a>
  );
}

export default FloatingMessageButton;
