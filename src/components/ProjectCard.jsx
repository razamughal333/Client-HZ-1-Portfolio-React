import { useState } from "react";
import { motion } from "framer-motion";

const FALLBACK_LABEL = "Preview unavailable";

function ProjectCard({ project, index = 0, priority = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = Boolean(project.image) && !imgFailed;
  const plateNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(28,27,26,0.35)]"
    >
      <a
        href={project.url || undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View "${project.title}" on Behance`}
        data-cursor="hover"
        data-cursor-label="View"
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
      >
        {hasImage ? (
          <img
            src={project.image}
            alt={project.title}
            loading={priority ? "eager" : "lazy"}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--surface-muted)] px-6 text-center text-[var(--muted)]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs tracking-wide">{FALLBACK_LABEL}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white">
            View on Behance
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </div>

        {project.isLatest && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--badge)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
            Latest Work
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
          <span>{plateNumber}</span>
          {project.category && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </>
          )}
        </div>
        <h3 className="font-serif text-lg leading-snug text-[var(--ink)]">
          {project.title}
        </h3>
        {project.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {project.description}
          </p>
        )}
        <a
          href={project.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
        >
          View on Behance
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
