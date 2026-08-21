import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBehanceProjects } from "../services/behance";
import {
  applyCategoryMap,
  FEATURED_PROJECT_URL,
  FEATURED_PROJECT_URLS,
} from "../services/categoryMap";
import { useLanguage } from "../i18n/useLanguage";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import SectionHeading from "./ui/SectionHeading";
import StaggerContainer, { StaggerItem } from "./motion/StaggerContainer";

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
 *   (e.g. 3 on the home page). When more projects exist than the limit,
 *   a "View All Work" link to the internal /work page is shown. Omit
 *   `limit` entirely to show every project (used on the /work page).
 * @param {boolean} [showHeading] - Whether to render the section's own
 *   heading/eyebrow/body copy (the /work page renders its own instead).
 */
function BehanceProjects({ limit, showHeading = true }) {
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

        // Backward-compatible single-URL config.
        if (FEATURED_PROJECT_URL) {
          const pinned = withCategories.find((p) => p.url === FEATURED_PROJECT_URL);
          if (pinned) pinned.isFeatured = true;
        }
        // Multi-URL config, in the order given.
        FEATURED_PROJECT_URLS.forEach((url) => {
          const pinned = withCategories.find((p) => p.url === url);
          if (pinned) pinned.isFeatured = true;
        });

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

  // When specific projects are configured as featured/selected, show those
  // first (in the configured order), then fill any remaining slots with
  // the newest projects. Otherwise it's simply newest-first (already the
  // order the API returns).
  const orderedProjects = useMemo(() => {
    if (!limit) return filteredProjects;

    const configuredUrls =
      FEATURED_PROJECT_URLS.length > 0
        ? FEATURED_PROJECT_URLS
        : FEATURED_PROJECT_URL
        ? [FEATURED_PROJECT_URL]
        : [];

    if (configuredUrls.length === 0) return filteredProjects;

    const pinned = configuredUrls
      .map((url) => filteredProjects.find((p) => p.url === url))
      .filter(Boolean);
    const rest = filteredProjects.filter((p) => !configuredUrls.includes(p.url));
    return [...pinned, ...rest];
  }, [filteredProjects, limit]);

  const visibleProjects = useMemo(() => {
    if (!limit) return orderedProjects;
    return orderedProjects.slice(0, limit);
  }, [orderedProjects, limit]);

  const hasMoreThanLimit = Boolean(limit) && filteredProjects.length > limit;

  return (
    <section
      id="work"
      aria-labelledby="behance-projects-heading"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-8"
    >
      {showHeading && (
        <SectionHeading
          eyebrow={t.work.eyebrow}
          heading={t.work.heading}
          body={t.work.body}
        />
      )}

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
                data-cursor="hover"
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
            data-cursor="hover"
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
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Visit Behance profile
          </a>
        </div>
      )}

      {status === "success" && (
        <>
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, i) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} index={i} priority={i === 0} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {hasMoreThanLimit && (
            <div className="mt-10 flex justify-center">
              <Link
                to="/work"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              >
                {t.work.viewAll}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default BehanceProjects;
