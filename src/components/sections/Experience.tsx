import { GraduationCap, Users, ClipboardList, Calendar } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { experienceData } from "../../data/experience";
import { useViewMode } from "../../lib/view-mode";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { KineticText } from "../motion/KineticText";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

const iconMap = [
  <GraduationCap size={16} className="text-[#2563EB]" />,
  <Users size={16} className="text-[#2563EB]" />,
  <ClipboardList size={16} className="text-[#2563EB]" />,
];

export function Experience() {
  const { mode } = useViewMode();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.1);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  return (
    <motion.section
      id="experience"
      className="py-[clamp(2.8rem,6.4vh,4.4rem)] border-t border-[#D8E1EC] relative z-10"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="section-container">
        
        {/* ── Header ─────────────────────────────── */}
        <div className="mb-11">
          <div className="flex flex-col gap-[5px] mb-3">
            <span className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#2563EB]">
              Journey
            </span>
            <div className="w-7 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <KineticText
            as="h2"
            text="Experience"
            splitBy="char"
            className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]"
          />
        </div>

        {/* ── Timeline & Cards Container ────────────── */}
        <div className="relative flex">
          
          {/* ── Timeline Rail (Desktop only) ───────── */}
          <div className="hidden md:flex flex-col items-center mr-6 relative pt-3 pb-3">
            {/* The vertical line */}
            <motion.div
              className="absolute top-0 bottom-0 w-[1px] bg-[#D8E1EC] left-1/2 -translate-x-1/2 origin-top"
              initial={shouldReduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportReveal}
              transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Markers */}
            <motion.div
              className="flex flex-col gap-6 h-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportReveal}
            >
              {experienceData.map((_, i) => (
                <motion.div key={i} variants={staggerItem} className="relative z-10 w-10 h-10 rounded-full timeline-marker flex items-center justify-center mb-auto last:mb-0">
                  {iconMap[i] || <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Cards Stack ──────────────────────── */}
          <motion.div
            className="flex-1 flex flex-col gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            {experienceData.map((exp, i) => (
              <motion.div key={i} variants={staggerItem}>
                <SignInCardBeamEffect
                  enableTilt={false}
                  className="experience-card motion-card overflow-hidden"
                >
                  <div className="p-5 md:p-6 relative z-10 flex flex-col">
                  
                  {/* Top Row: Title/Company & Date */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-[1rem] font-bold text-[#0B1220] leading-tight mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-[0.8rem] font-semibold text-[#2563EB]">
                        {exp.company}
                      </div>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(240,245,255,0.82)] text-[#2563EB] text-[0.68rem] font-medium border border-[rgba(255,255,255,0.72)] backdrop-blur-sm shrink-0 self-start">
                      <Calendar size={12} className="opacity-70" />
                      {exp.date}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="flex flex-col gap-2 mb-5 max-w-[760px]">
                    {(mode === "ld" ? exp.bulletsLD : exp.bullets).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.8rem] text-[#5B6B82] leading-[1.65]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-[6px] mt-auto">
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-[10px] py-[3px] rounded-full text-[0.65rem] font-medium text-[#2563EB] bg-[rgba(255,255,255,0.80)] border border-[rgba(255,255,255,0.70)] backdrop-blur-sm transition-colors hover:bg-[rgba(240,245,255,0.88)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  </div>
                </SignInCardBeamEffect>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
