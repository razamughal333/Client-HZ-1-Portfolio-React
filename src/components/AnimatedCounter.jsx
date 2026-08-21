import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Animates a number from 0 up to `value` once it scrolls into view.
 * `suffix` is appended after the animated number (e.g. "+").
 */
function AnimatedCounter({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  const displayRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (displayRef.current) displayRef.current.textContent = `${value}${suffix}`;
      return undefined;
    }
    const unsub = spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, suffix, prefersReducedMotion, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      <span ref={displayRef}>0{suffix}</span>
    </motion.span>
  );
}

export default AnimatedCounter;
