import { motion } from "framer-motion";

/**
 * Fades/slides a section into view the first time it scrolls into the
 * viewport. Wraps framer-motion's whileInView so callers don't have to
 * repeat viewport/transition boilerplate everywhere.
 */
function Reveal({ children, delay = 0, y = 24, className, as = "div", once = true }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

export default Reveal;
