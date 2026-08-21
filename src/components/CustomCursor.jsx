import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

function isFineDesktopPointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches && window.matchMedia("(hover: hover)").matches;
}

function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(isFineDesktopPointer);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const followerX = useSpring(dotX, { damping: 26, stiffness: 260, mass: 0.4 });
  const followerY = useSpring(dotY, { damping: 26, stiffness: 260, mass: 0.4 });

  const enabledRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const handler = () => setEnabled(isFineDesktopPointer());
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const active = enabled && !prefersReducedMotion;
    document.documentElement.classList.toggle("custom-cursor-active", active);
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled, prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest(INTERACTIVE_SELECTOR);
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-label") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleLeaveWindow);
    };
  }, [enabled, dotX, dotY, visible]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {/* Small precise dot */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Smooth trailing follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-[var(--accent)]"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
        }}
        animate={{
          width: hovering ? 64 : 28,
          height: hovering ? 64 : 28,
          backgroundColor: hovering ? "var(--accent-soft)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--accent)]">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}

export default CustomCursor;
