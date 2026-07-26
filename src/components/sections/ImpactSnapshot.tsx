import { Award, ClipboardCheck, Trophy, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { useViewMode } from "../../lib/view-mode";
import { KineticText } from "../motion/KineticText";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

const impactItems = {
  coordination: [
    {
      icon: Trophy,
      title: "9/10 Faculty Score",
      text: "Led an 8-member Scrum team across 3 sprint sessions to top research delivery with a Google Sheets dashboard."
    },
    {
      icon: Users,
      title: "85% Active Rate",
      text: "Maintained 85% active participation after a structured member intake for a 50-member athletics club."
    },
    {
      icon: Award,
      title: "Individual Top 5 of 25",
      text: "Delivered a high-pressure strategic turnaround as acting lead in the grand final, finishing as the stronger of 2 finalist teams."
    },
    {
      icon: ClipboardCheck,
      title: "Weekly Reporting — Active",
      text: "Delivering structured stakeholder reporting across 2 concurrent paid teaching roles with 2 supervisors."
    }
  ],
  ld: [
    {
      icon: Trophy,
      title: "9/10 Faculty Score",
      text: "Coached an 8-member Scrum team, using MBO to align each member's individual goals with shared research objectives."
    },
    {
      icon: Users,
      title: "85% Active Rate",
      text: "Onboarded 15 of 37 applicants through a structured intake program, sustaining 85% active participation."
    },
    {
      icon: Award,
      title: "Individual Top 5 of 25",
      text: "Coached a team through a mid-project crisis and delivered an inspiring closing speech, earning individual recognition for performance and influence."
    },
    {
      icon: ClipboardCheck,
      title: "Weekly Reporting — Active",
      text: "Designing structured lessons, diagnosing comprehension gaps, and coaching learners across 2 concurrent teaching roles."
    }
  ]
};

export function ImpactSnapshot() {
  const { mode } = useViewMode();
  const items = impactItems[mode];
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.08);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  return (
    <motion.section
      id="impact"
      className="py-[clamp(2.75rem,6vh,4.25rem)] border-t border-[#D8E1EC] relative z-10"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="section-container">
        <div className="mb-8">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              Impact Snapshot
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <KineticText
            key={mode}
            as="h2"
            text={mode === "ld" ? "L&D evidence at a glance" : "Coordination evidence at a glance"}
            className="font-display text-[clamp(1.65rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]"
          />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const offset = shouldReduceMotion ? 0 : [0, -16, 8, -12][index % 4];

            return (
              <div key={item.title} style={{ transform: `translateY(${offset}px)` }}>
                <motion.div variants={staggerItem}>
                  <SignInCardBeamEffect
                    enableTilt={false}
                    className="impact-card motion-card overflow-hidden"
                    data-cursor="hover"
                  >
                    <article className="relative z-10 p-5 h-full">
                      <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.07)] flex items-center justify-center mb-4">
                        <Icon size={19} className="text-[#2563EB]" />
                      </div>
                      <h3 className="text-[1rem] font-bold text-[#0B1220] leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[0.84rem] text-[#5B6B82] leading-[1.55]">
                        {item.text}
                      </p>
                    </article>
                  </SignInCardBeamEffect>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
