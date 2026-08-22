import { motion, useReducedMotion } from "framer-motion";

const CENTER = 150;
const SPOKE_COUNT = 8;
const RADII = [0, 32, 68, 104, 138];

const angles = Array.from(
  { length: SPOKE_COUNT },
  (_, i) => (i * (360 / SPOKE_COUNT) * Math.PI) / 180
);

function pointAt(angle, r) {
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

// A rough, organic crawl: center → out to the rim along one spoke → along a
// ring → back in → out again along a different spoke, looping smoothly.
const CRAWL_WAYPOINTS = [
  { a: 0, r: 0 },
  { a: 0, r: 1 },
  { a: 1, r: 2 },
  { a: 2, r: 3 },
  { a: 2, r: 4 },
  { a: 3, r: 3 },
  { a: 4, r: 2 },
  { a: 5, r: 1 },
  { a: 5, r: 3 },
  { a: 6, r: 4 },
  { a: 7, r: 2 },
  { a: 0, r: 1 },
  { a: 0, r: 0 },
];

const crawlPoints = CRAWL_WAYPOINTS.map(({ a, r }) => pointAt(angles[a], RADII[r]));
const crawlX = crawlPoints.map(([x]) => x);
const crawlY = crawlPoints.map(([, y]) => y);

function SpiderLegs() {
  // Four legs a side, angled forward/back from the body.
  const legAngles = [-55, -25, 25, 55];
  return (
    <>
      {legAngles.map((deg) => (
        <line
          key={`l-${deg}`}
          x1="0"
          y1="0"
          x2={14 * Math.cos((deg * Math.PI) / 180)}
          y2={14 * Math.sin((deg * Math.PI) / 180) - 2}
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
      {legAngles.map((deg) => (
        <line
          key={`r-${deg}`}
          x1="0"
          y1="0"
          x2={-14 * Math.cos((deg * Math.PI) / 180)}
          y2={14 * Math.sin((deg * Math.PI) / 180) - 2}
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function SpiderWebAnimation() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 300 300"
      className="h-full w-full"
      role="img"
      aria-label="Animated illustration of a spider crawling across its web"
    >
      {/* Spokes */}
      {angles.map((angle, i) => {
        const [x, y] = pointAt(angle, RADII[RADII.length - 1]);
        return (
          <line
            key={`spoke-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}

      {/* Concentric rings connecting the spokes */}
      {RADII.slice(1).map((r, ringIndex) => {
        const points = angles.map((angle) => pointAt(angle, r).join(",")).join(" ");
        return (
          <polygon
            key={`ring-${ringIndex}`}
            points={points}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}

      {/* Spider, crawling the web */}
      <motion.g
        initial={{ x: crawlX[0], y: crawlY[0] }}
        animate={
          prefersReducedMotion
            ? { x: crawlX[0], y: crawlY[0] }
            : { x: crawlX, y: crawlY }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <SpiderLegs />
        <ellipse cx="0" cy="3" rx="5" ry="6" fill="var(--ink)" />
        <circle cx="0" cy="-5" r="3.2" fill="var(--ink)" />
      </motion.g>
    </svg>
  );
}

export default SpiderWebAnimation;
