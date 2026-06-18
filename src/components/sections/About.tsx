import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "../../data/profile";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

export function About() {
  const { about } = profileData;
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.08);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  const renderFactValue = (row: (typeof about.snapshot)[number]) => {
    if (row.key !== "English") {
      return row.value;
    }

    const credential = "IELTS 7.5";
    const detail = row.value.replace(credential, "");

    return (
      <>
        <span className="about-ielts-badge">{credential}</span>
        <span className="about-english-detail">{detail}</span>
      </>
    );
  };

  return (
    <motion.section
      id="about"
      className="about-section py-[clamp(3.5rem,8vh,5.5rem)] border-t border-border"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="section-container">
        <div className="mb-12">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              About
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]">
            About Me
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[minmax(320px,390px)_1fr] gap-8 lg:gap-12 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          <motion.div className="about-facts-card overflow-hidden" variants={staggerItem}>
            {about.snapshot.map((row, idx) => (
              <div 
                key={row.key} 
                className={`about-fact-row grid grid-cols-[108px_1fr] sm:grid-cols-[116px_1fr] ${
                  row.key === "English" ? 'about-fact-row--highlight' : ''
                } ${idx !== about.snapshot.length - 1 ? 'border-b border-border/80' : ''}`}
              >
                <div className="about-fact-label px-3.5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.11em] text-muted snapshot-key-bg border-r border-border/80 flex items-center">
                  {row.key}
                </div>
                <div className="about-fact-value px-3.5 py-3 text-[0.87rem] flex items-center flex-wrap gap-x-1.5 gap-y-1 leading-relaxed text-text font-medium">
                  {renderFactValue(row)}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.article className="about-story about-story-card" variants={staggerItem}>
            <span className="about-story-accent" aria-hidden="true" />

            <div className="about-story-copy">
              {about.paragraphs.map((p, i) => (
                <p 
                  key={i} 
                  className="about-story-paragraph"
                  dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="about-story-strong">$1</strong>') }}
                />
              ))}
            </div>

            <div className="about-story-divider" aria-hidden="true" />

            <div className="about-chip-grid" role="list">
              {about.badges.map(badge => (
                <span key={badge} role="listitem" className="about-chip inline-flex items-center justify-center">
                  {badge}
                </span>
              ))}
            </div>
          </motion.article>
        </motion.div>
      </div>
    </motion.section>
  );
}
