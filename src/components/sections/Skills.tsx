import { CalendarDays, ClipboardList, GraduationCap, HeartHandshake, Languages, LayoutGrid, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { skillsData } from "../../data/skills";
import { useViewMode } from "../../lib/view-mode";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { TiltCard } from "../effects/TiltCard";
import { KineticText } from "../motion/KineticText";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

const iconMap = {
  "Leadership & Communication": <Users size={22} className="text-[#2563EB]" />,
  "Project Coordination": <CalendarDays size={22} className="text-[#2563EB]" />,
  "Operations & Documentation": <ClipboardList size={22} className="text-[#2563EB]" />,
  "Learning & Development": <GraduationCap size={22} className="text-[#2563EB]" />,
  "People & Stakeholder Management": <HeartHandshake size={22} className="text-[#2563EB]" />,
  Tools: <LayoutGrid size={22} className="text-[#2563EB]" />,
  Languages: <Languages size={22} className="text-[#2563EB]" />
};

const descMap = {
  "Leadership & Communication": "Leading teams, facilitating people, and communicating with stakeholders.",
  "Project Coordination": "Planning work, aligning stakeholders, and tracking delivery milestones.",
  "Operations & Documentation": "Keeping workflows documented, reported, and operationally organized.",
  "Learning & Development": "Designing programs, onboarding people, and coaching them toward growth.",
  "People & Stakeholder Management": "Managing relationships, collaboration, and cross-functional communication.",
  Tools: "Using practical tools to plan, document, analyze, and present work.",
  Languages: "Communicating clearly in Vietnamese and English."
};

export function Skills() {
  const { mode } = useViewMode();
  const categories = skillsData[mode];
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.08);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  return (
    <motion.section
      id="skills"
      className="py-[clamp(3.5rem,8vh,5.5rem)] border-t border-[#D8E1EC]"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="section-container">
        <div className="mb-12">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              Capabilities
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <KineticText
            as="h2"
            text="Skills"
            splitBy="char"
            className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]"
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {categories.map((card) => (
            <motion.div key={card.category} variants={staggerItem}>
              <TiltCard
                tiltLimit={6}
                scale={1.015}
                perspective={1200}
                effect="evade"
                spotlight={true}
                className="rounded-[16px]"
              >
                <SignInCardBeamEffect
                  enableTilt={false}
                  className="skill-card motion-card overflow-hidden"
                  data-cursor="hover"
                >
                  <div className="p-7 flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(37,99,235,0.07)] flex items-center justify-center">
                      {iconMap[card.category as keyof typeof iconMap]}
                    </div>
                    <div>
                      <h3 className="text-[1.05rem] font-bold text-[#0B1220] leading-tight">
                        {card.category}
                      </h3>
                      <p className="text-[0.82rem] text-[#5B6B82] mt-[2px] leading-[1.5]">
                        {descMap[card.category as keyof typeof descMap]}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-[7px] mt-4">
                    {card.skills.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-[12px] py-[5px] rounded-full text-[0.75rem] font-medium text-[#2563EB] bg-[rgba(37,99,235,0.06)] border border-[rgba(37,99,235,0.18)] transition-colors hover:bg-[rgba(37,99,235,0.12)] relative z-10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  </div>
                </SignInCardBeamEffect>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
