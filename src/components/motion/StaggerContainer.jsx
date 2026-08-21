import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "./staggerVariants";

/**
 * Parent wrapper for grids/lists whose children should reveal in a
 * staggered sequence as the group scrolls into view. Pair with
 * <StaggerItem> for each child.
 */
function StaggerContainer({ children, className, once = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, as = "div" }) {
  const Component = motion[as] || motion.div;
  return (
    <Component variants={staggerItemVariants} className={className}>
      {children}
    </Component>
  );
}

export default StaggerContainer;
