import { useEffect, useMemo, useState } from "react";
import { fetchBehanceProjects } from "../services/behance";
import { applyCategoryMap, FEATURED_PROJECT_URL } from "../services/categoryMap";
import { useLanguage } from "../i18n/useLanguage";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";

const BEHANCE_PROFILE_URL = "https://www.behance.net/habibazulfiqar2";
const SKELETON_COUNT = 6;

/**
 * Behance-powered project showcase.
 *
 * Fetches /api/behance on mount and renders one of four states: loading
 * (skeletons), success (grid), empty (no projects yet), or error
 * (fallback card + direct Behance link). The rest of the portfolio keeps
 * working regardless of which state this section ends up in.
 *
 * @param {number} [limit] - Optionally cap how many projects are shown
 *   (e.g. 4 on a home page). When more projects exist than the limit,
 *   a "View all work on Behance" link is shown instead of internal
 *   pagination/routing.
 */
function BehanceProjects({ limit }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState("loading"); // loading | success | empty | error
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const { projects: fetched } = await fetchBehanceProjects();
        if (cancelled) return;

        const withCategories = applyCategoryMap(fetched);

        if (FEATURED_PROJECT_URL) {
          const pinned = withCategories.find((p) => p.url === FEATURED_PROJECT_URL);
          if (pinned) {
            withCategories.forEach((p) => (p.isFeatured = false));
            pinned.isFeatured = true;
          }
        }

        setProjects(withCategories);
        setStatus(withCategories.length === 0 ? "empty" : "success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message || "Unable to load projects right now.");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const found = new Set(
      projects.map((p) => p.category).filter((c) => Boolean(c))
    );
    return found.size > 0 ? ["All", ...Array.from(found).sort()] : [];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All" || categories.length === 0) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory, categories]);

  const visibleProjects = useMemo(() => {
    if (!limit) return filteredProjects;
    return filteredProjects.slice(0, limit);
  }, [filteredProjects, limit]);

  const hasMoreThanLimit = Boolean(limit) && filteredProjects.length > limit;

  return (
    <section
      id="work"
      aria-labelledby="behance-projects-heading"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-8"
    >
      <header className="mb-10 flex flex-col gap-2 sm:mb-14">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          {t.work.eyebrow}
        </span>
        <h2
          id="behance-projects-heading"
          className="font-serif text-3xl text-[var(--ink)] sm:text-4xl"
        >
          {t.work.heading}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {t.work.body}
        </p>
      </header>

      {status === "success" && categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] ${
                  isActive
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {status === "loading" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 rounded-sm border border-[var(--border)] bg-[var(--surface-muted)] px-6 py-16 text-center">
          <p className="max-w-md text-sm text-[var(--muted)] sm:text-base">
            Projects are temporarily unavailable.{" "}
            {errorMessage ? (
              <span className="block text-xs text-[var(--muted)] opacity-70 mt-1">
                {errorMessage}
              </span>
            ) : null}
          </p>
          <a
            href={BEHANCE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            View the latest work on Behance
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>
      )}

      {status === "empty" && (
        <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-[var(--border)] px-6 py-16 text-center">
          <p className="max-w-md text-sm text-[var(--muted)] sm:text-base">
            New work is on its way — check back soon, or take a look at the
            full Behance profile in the meantime.
          </p>
          <a
            href={BEHANCE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Visit Behance profile
          </a>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                priority={i === 0}
              />
            ))}
          </div>

          {hasMoreThanLimit && (
            <div className="mt-10 flex justify-center">
              <a
                href={BEHANCE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              >
                {t.work.viewAll}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default BehanceProjects;
