// src/services/behance.js
//
// Thin data-fetching layer, kept separate from presentation. The component
// layer never talks to Behance or parses XML directly — it only calls
// fetchBehanceProjects() and gets back normalized project objects.

const ENDPOINT = "/api/behance";

/**
 * Fetches and returns the normalized Behance project list from our own
 * same-origin serverless endpoint (never calls Behance directly from the
 * browser, so there's no CORS dependency on Behance).
 *
 * @returns {Promise<{projects: Array, count: number, username: string}>}
 * @throws {Error} with a user-safe message on any failure.
 */
export async function fetchBehanceProjects() {
  let response;
  try {
    response = await fetch(ENDPOINT);
  } catch {
    throw new Error("Network error while loading projects.");
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Received an unexpected response while loading projects.");
  }

  if (!response.ok || !data || data.success !== true) {
    throw new Error(data?.error || "Unable to load projects right now.");
  }

  return {
    projects: Array.isArray(data.projects) ? data.projects : [],
    count: data.count ?? 0,
    username: data.username ?? "",
  };
}
