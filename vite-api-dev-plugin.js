// vite-api-dev-plugin.js
//
// Dev-only helper: Vercel automatically serves files under /api/ as
// serverless functions once deployed, but Vite's own dev server doesn't
// know anything about that convention. This plugin adds a small middleware
// so `npm run dev` can hit /api/behance locally too, without needing the
// Vercel CLI. It has no effect on the production build or on Vercel itself.
export default function apiDevPlugin() {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/behance")) {
          return next();
        }

        try {
          // Loaded lazily via Vite's SSR module loader so the handler's
          // ESM import (fast-xml-parser) resolves correctly in dev.
          const mod = await server.ssrLoadModule("/api/behance.js");
          const handler = mod.default;

          // Minimal shim of the Vercel response API on top of Node's
          // native http.ServerResponse.
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (body) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(body));
          };

          await handler(req, res);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: false,
              error: "Dev API middleware error: " + err.message,
            })
          );
        }
      });
    },
  };
}
