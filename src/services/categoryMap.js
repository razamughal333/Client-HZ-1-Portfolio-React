// src/services/categoryMap.js
//
// The Behance RSS feed does not reliably expose a category per project, so
// categories are never guessed. Instead, categories can optionally be
// assigned here later — keyed by the project's Behance URL (or GUID) —
// without touching the API route or component code.
//
// Example, once you know the real project URLs:
// {
//   "https://www.behance.net/gallery/252111477/social-media-post": "Healthcare",
//   "https://www.behance.net/gallery/252111478/agri-campaign": "Agriculture",
// }
export const CATEGORY_MAP = {};

/**
 * Optionally pin a specific project as the featured one instead of
 * defaulting to the newest. Set this to a Behance project URL when needed.
 */
export const FEATURED_PROJECT_URL = null;

export function applyCategoryMap(projects) {
  return projects.map((project) => ({
    ...project,
    category: CATEGORY_MAP[project.url] ?? CATEGORY_MAP[project.id] ?? null,
  }));
}
