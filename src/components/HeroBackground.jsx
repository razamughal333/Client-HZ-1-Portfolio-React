import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "framer-motion";

// Fixed, deterministic dot field (no Math.random on every render) so the
// layout never jumps between renders/hydration.
const DOTS = [
  { top: "12%", left: "8%", size: 5, delay: 0 },
  { top: "22%", left: "88%", size: 4, delay: 0.4 },
  { top: "68%", left: "92%", size: 6, delay: 0.8 },
  { top: "80%", left: "6%", size: 4, delay: 1.2 },
  { top: "40%", left: "18%", size: 3, delay: 1.6 },
  { top: "8%", left: "55%", size: 4, delay: 2.0 },
  { top: "58%", left: "48%", size: 3, delay: 0.6 },
  { top: "88%", left: "70%", size: 5, delay: 1.0 },
];

function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [enableParallax] = useState(isFinePointer);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { damping: 30, stiffness: 60 });
  const springY = useSpring(mvY, { damping: 30, stiffness: 60 });

  const shapeOneX = useTransform(springX, (v) => v * 18);
  const shapeOneY = useTransform(springY, (v) => v * 18);
  const shapeTwoX = useTransform(springX, (v) => v * -14);
  const shapeTwoY = useTransform(springY, (v) => v * -14);

  useEffect(() => {
    if (!enableParallax || prefersReducedMotion) return undefined;
    const handleMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mvX.set(nx);
      mvY.set(ny);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enableParallax, prefersReducedMotion, mvX, mvY]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Large soft gradient shapes with slow parallax drift */}
      <motion.div
        style={{ x: shapeOneX, y: shapeOneY }}
        className="absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full opacity-[0.14] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full rounded-full bg-[var(--accent)]" />
      </motion.div>

      <motion.div
        style={{ x: shapeTwoX, y: shapeTwoY }}
        className="absolute top-1/3 -left-32 h-[22rem] w-[22rem] rounded-full opacity-[0.12] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.1, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="h-full w-full rounded-full bg-[var(--badge)]" />
      </motion.div>

      {/* Drifting dots / "stars" */}
      {DOTS.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[var(--accent)]"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            opacity: 0.35,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -14, 0], opacity: [0.2, 0.5, 0.2] }
          }
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Faint rotating outline square for editorial/graphic-design flavor */}
      <motion.div
        className="absolute right-[8%] top-[18%] h-24 w-24 rounded-[18%] border border-[var(--border)] opacity-40 sm:h-32 sm:w-32"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-[10%] bottom-[10%] h-16 w-16 rounded-full border border-[var(--border)] opacity-40"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default HeroBackground;
