import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchBehanceProjects } from "../services/behance";
import { useLanguage } from "../i18n/useLanguage";

const BEHANCE_PROFILE_URL = "https://www.behance.net/habibazulfiqar2";

/**
 * Small CTA banner spotlighting whichever project the API marked
 * `isLatest`. Purely additive to the main "Selected Work" grid — if the
 * fetch fails or nothing is marked latest, this renders nothing rather
 * than showing a broken or guessed state.
 */
function LatestWorkCTA() {
  const { t } = useLanguage();
  const [latest, setLatest] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBehanceProjects()
      .then(({ projects }) => {
        if (cancelled) return;
        const found = projects.find((p) => p.isLatest);
        if (found) setLatest(found);
      })
      .catch(() => {
        // Silently no-op — the main Selected Work section already
        // surfaces the error state; this banner just stays hidden.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!latest) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-4 sm:px-8">
      <motion.a
        href={latest.url || BEHANCE_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        data-cursor-label="Open"
        whileHover={{ y: -3 }}
        className="group flex flex-col items-center gap-5 overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:gap-6 sm:p-6"
      >
        <div className="h-32 w-full shrink-0 overflow-hidden rounded-sm bg-[var(--surface-muted)] sm:h-20 sm:w-28">
          {latest.image && !imgFailed ? (
            <img
              src={latest.image}
              alt={latest.title}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="inline-block rounded-full bg-[var(--badge)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {t.work.latestBadge}
          </span>
          <h3 className="mt-2 font-serif text-lg text-[var(--ink)]">{latest.title}</h3>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          {t.work.viewLatest}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      </motion.a>
    </section>
  );
}

export default LatestWorkCTA;
