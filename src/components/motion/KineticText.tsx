import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface KineticTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  splitBy?: "char" | "word";
  viewportAmount?: number;
  /**
   * "whileInView" (default) reveals on scroll - use for content below the fold.
   * "mount" reveals immediately on mount - use for above-the-fold content that's
   * already nested inside another mount-triggered animation (e.g. Hero).
   */
  trigger?: "whileInView" | "mount";
}

export function KineticText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  splitBy = "word",
  viewportAmount = 0.3,
  trigger = "whileInView",
}: KineticTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const units = splitBy === "word" ? text.split(" ") : Array.from(text);
  const stagger = splitBy === "word" ? 0.07 : 0.022;

  if (shouldReduceMotion) {
    const Wrapper = Tag as ElementType;
    return <Wrapper className={className}>{text}</Wrapper>;
  }

  const MotionWrapper = motion.create(Tag as ElementType);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: "70%", rotateX: 65 },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, amount: viewportAmount } };

  return (
    <MotionWrapper
      className={className}
      style={{ display: "inline-block", perspective: "900px" }}
      initial="hidden"
      variants={containerVariants}
      {...triggerProps}
    >
      {units.map((unit, i) => {
        const content: ReactNode = unit;

        return (
          // The trailing space is a plain sibling text node, not inside the
          // overflow:hidden wrapper - Chrome collapses trailing whitespace
          // rendered *inside* an overflow-clipped inline-block.
          <span key={`${unit}-${i}`}>
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
              <motion.span
                variants={childVariants}
                style={{ display: "inline-block", transformOrigin: "50% 100%" }}
              >
                {content}
              </motion.span>
            </span>
            {splitBy === "word" && i < units.length - 1 ? " " : ""}
          </span>
        );
      })}
    </MotionWrapper>
  );
}
