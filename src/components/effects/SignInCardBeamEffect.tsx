import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface SignInCardBeamEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export function SignInCardBeamEffect({
  children,
  className,
  enableTilt = false,
  ...props
}: SignInCardBeamEffectProps) {
  // 3D tilt values — identical to original source
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn("relative h-full", className)}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative h-full"
        style={enableTilt ? { rotateX, rotateY } : undefined}
        onMouseMove={enableTilt ? handleMouseMove : undefined}
        onMouseLeave={enableTilt ? handleMouseLeave : undefined}
        whileHover={enableTilt ? { z: 10 } : undefined}
      >
        <div className="relative group h-full" {...props}>
          {/* B. Card glow layer — copied from source, adapted to Navy/Blue palette */}
          <motion.div
            className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 10px 2px rgba(37,99,235,0.04)",
                "0 0 15px 5px rgba(37,99,235,0.08)",
                "0 0 10px 2px rgba(37,99,235,0.04)"
              ],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror"
            }}
          />

          {/* C. Traveling light beam container — copied from source */}
          <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none">

            {/* D. Top beam — left: ["-50%", "100%"], delay 0 */}
            <motion.div
              className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
              initial={{ filter: "blur(2px)" }}
              animate={{
                left: ["-50%", "100%"],
                opacity: [0.3, 0.7, 0.3],
                filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
              }}
              transition={{
                left: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
                opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror" },
                filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror" }
              }}
            />

            {/* E. Right beam — top: ["-50%", "100%"], delay 0.6 */}
            <motion.div
              className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
              initial={{ filter: "blur(2px)" }}
              animate={{
                top: ["-50%", "100%"],
                opacity: [0.3, 0.7, 0.3],
                filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
              }}
              transition={{
                top: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 },
                opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 0.6 },
                filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.6 }
              }}
            />

            {/* F. Bottom beam — right: ["-50%", "100%"], delay 1.2 */}
            <motion.div
              className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
              initial={{ filter: "blur(2px)" }}
              animate={{
                right: ["-50%", "100%"],
                opacity: [0.3, 0.7, 0.3],
                filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
              }}
              transition={{
                right: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 },
                opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.2 },
                filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.2 }
              }}
            />

            {/* G. Left beam — bottom: ["-50%", "100%"], delay 1.8 */}
            <motion.div
              className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
              initial={{ filter: "blur(2px)" }}
              animate={{
                bottom: ["-50%", "100%"],
                opacity: [0.3, 0.7, 0.3],
                filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"]
              }}
              transition={{
                bottom: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 },
                opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.8 },
                filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.8 }
              }}
            />

            {/* H. Corner glow spots — copied from source exactly */}
            <motion.div
              className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.div
              className="absolute top-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror", delay: 1.5 }}
            />
          </div>

          {/* Card border glow — adapted from source */}
          <div className="absolute -inset-[0.5px] rounded-[inherit] bg-gradient-to-r from-white/5 via-[rgba(56,189,248,0.12)] to-white/5 opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

          {/* Content layer — z-10 ensures content sits above all effects */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
