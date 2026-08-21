// api/behance.js
//
// Vercel serverless function.
// Fetches the client's public Behance RSS feed, parses the XML, strips it
// down to plain, predictable JSON the React app can render directly.
//
// No Behance API key is used or required — this only reads the public RSS
// feed at https://www.behance.net/feeds/user?username=<username>.

import { XMLParser } from "fast-xml-parser";

const BEHANCE_USERNAME = "habibazulfiqar2";
const RSS_URL = `https://www.behance.net/feeds/user?username=${BEHANCE_USERNAME}`;

// Keep responses at the edge/CDN for a short window so a normal page load
// doesn't hit Behance every time, but never so long that a freshly
// published project stays hidden for an unreasonable period.
const CACHE_CONTROL =
  "public, s-maxage=600, stale-while-revalidate=3600";

const FETCH_TIMEOUT_MS = 8000;

/**
 * Pulls the first <img src="..."> out of an HTML blob (the RSS
 * description/content:encoded field embeds the project thumbnail this way).
 */
function extractFirstImageSrc(html) {
  if (!html || typeof html !== "string") return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Strips HTML tags and collapses whitespace so descriptions are safe,
 * plain text — the RSS feed is untrusted external content and should
 * never be rendered as raw HTML in the browser.
 */
function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalizes a pubDate string into ISO 8601. Falls back to null (never
 * throws) so one bad date can't take down the whole feed.
 */
function toIsoDate(pubDate) {
  if (!pubDate) return null;
  const parsed = new Date(pubDate);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Derives a Behance gallery slug/title from a project URL, used as a
 * readable fallback title if the RSS <title> is ever missing.
 */
function titleFromUrl(url) {
  if (!url) return "Untitled project";
  const match = url.match(/\/gallery\/\d+\/([^/?#]+)/);
  if (!match) return "Untitled project";
  return match[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Pure function: turns raw RSS XML text into the app's normalized project
 * shape. Exported separately from the HTTP handler so the parsing logic can
 * be exercised directly (e.g. against a saved sample feed) without needing
 * a live network call.
 */
export function parseBehanceRss(xmlText, username = BEHANCE_USERNAME) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: "__cdata",
    processEntities: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error("Unexpected RSS structure: missing rss.channel");
  }

  // RSS gives a single object when there's one item, or an array when
  // there are several — normalize to an array either way.
  const rawItems = channel.item
    ? Array.isArray(channel.item)
      ? channel.item
      : [channel.item]
    : [];

  const readField = (val) => {
    if (val == null) return "";
    if (typeof val === "string" || typeof val === "number") return String(val);
    if (typeof val === "object" && "__cdata" in val) return String(val.__cdata);
    return "";
  };

  const projects = rawItems.map((item) => {
    const title = readField(item.title).trim();
    const url = readField(item.link).trim();
    const guid = readField(item.guid).trim() || url;
    const rawDescription =
      readField(item["content:encoded"]) || readField(item.description);
    const pubDate = readField(item.pubDate).trim();

    const image = extractFirstImageSrc(rawDescription);
    const description = stripHtml(rawDescription);
    const publishedAt = toIsoDate(pubDate);

    return {
      id: guid || url || title,
      title: title || titleFromUrl(url),
      url: url || null,
      image: image || null,
      description: description || "",
      publishedAt,
      // Category metadata isn't reliably available from the RSS feed, so
      // this is left null rather than guessed. A future optional
      // id/url -> category mapping can populate this without touching the
      // API contract.
      category: null,
      isLatest: false,
    };
  });

  // Sort newest first when dates are available; items with no parseable
  // date are pushed to the end rather than guessed at.
  projects.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    if (a.publishedAt) return -1;
    if (b.publishedAt) return 1;
    return 0;
  });

  // Mark the newest *dated* project as latest. If nothing has a valid
  // date, don't guess — no badge is shown at all.
  const firstDated = projects.find((p) => p.publishedAt);
  if (firstDated) {
    firstDated.isLatest = true;
  }

  return {
    success: true,
    username,
    count: projects.length,
    projects,
  };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", CACHE_CONTROL);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(RSS_URL, {
      signal: controller.signal,
      headers: {
        // Some feeds are picky about a blank UA.
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      res.status(502).json({
        success: false,
        error: "Unable to reach Behance right now. Please try again shortly.",
      });
      return;
    }

    const xmlText = await response.text();
    const result = parseBehanceRss(xmlText, BEHANCE_USERNAME);

    res.status(200).json(result);
  } catch (err) {
    const isTimeout = err && err.name === "AbortError";
    res.status(isTimeout ? 504 : 500).json({
      success: false,
      error: isTimeout
        ? "Behance took too long to respond. Please try again shortly."
        : "Something went wrong while loading projects. Please try again shortly.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
