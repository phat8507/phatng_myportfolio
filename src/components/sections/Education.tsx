import { motion, useReducedMotion } from "framer-motion";
import { awardsData, educationData } from "../../data/education";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { TiltCard } from "../effects/TiltCard";
import { KineticText } from "../motion/KineticText";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

export function Education() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.09);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  return (
    <motion.section
      id="education"
      className="education-section py-[clamp(3.25rem,7vh,5.25rem)] border-t border-border"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="section-container max-w-[1080px]">
        <header className="education-header mb-9 lg:mb-10">
          <KineticText
            as="h2"
            text="Education & Certifications"
            className="font-display text-[clamp(1.9rem,4vw,3.45rem)] font-bold leading-[1.04] tracking-tight text-[#0F2A4A]"
          />
          <span className="education-header-line" aria-hidden="true" />
        </header>

        <div className="education-layout grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-[4.5rem] items-start">
          <motion.div
            className="education-cards"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            {educationData.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
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
                    className="education-card motion-card"
                  >
                    <article className="education-card-content">
                      <div className="education-kicker">{item.school}</div>
                      <div className="education-title">{item.degree}</div>
                      <div className="education-meta">{item.detail}</div>
                    </article>
                  </SignInCardBeamEffect>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.aside
            className="awards-column"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            <div className="awards-label">
              <span className="awards-label-line" aria-hidden="true" />
              Awards & Honors
            </div>
            
            {awardsData.map((award, i) => (
              <motion.article key={i} className="award-row" variants={staggerItem}>
                <div className="award-number">
                  {award.num}
                </div>
                <span className="award-divider" aria-hidden="true" />
                <div className="award-content">
                  <div className="award-title">{award.title}</div>
                  <div className="award-meta">{award.sub}</div>
                </div>
              </motion.article>
            ))}
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}
