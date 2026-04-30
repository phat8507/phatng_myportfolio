import { awardsData, educationData } from "../../data/education";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { TiltCard } from "../effects/TiltCard";

export function Education() {
  return (
    <section id="education" className="education-section py-[clamp(3.25rem,7vh,5.25rem)] border-t border-border">
      <div className="section-container max-w-[1080px]">
        <header className="education-header mb-9 lg:mb-10">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.45rem)] font-bold leading-[1.04] tracking-tight text-[#0F2A4A]">
            Education & Certifications
          </h2>
          <span className="education-header-line" aria-hidden="true" />
        </header>

        <div className="education-layout grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-[4.5rem] items-start">
          <div className="education-cards">
            {educationData.map((item, i) => (
              <TiltCard
                key={i}
                tiltLimit={6}
                scale={1.015}
                perspective={1200}
                effect="evade"
                spotlight={true}
                className="rounded-[16px]"
              >
                <SignInCardBeamEffect
                  enableTilt={false}
                  className="education-card"
                >
                  <article className="education-card-content">
                    <div className="education-kicker">{item.school}</div>
                    <div className="education-title">{item.degree}</div>
                    <div className="education-meta">{item.detail}</div>
                  </article>
                </SignInCardBeamEffect>
              </TiltCard>
            ))}
          </div>

          <aside className="awards-column">
            <div className="awards-label">
              <span className="awards-label-line" aria-hidden="true" />
              Awards & Honors
            </div>
            
            {awardsData.map((award, i) => (
              <article key={i} className="award-row">
                <div className="award-number">
                  {award.num}
                </div>
                <span className="award-divider" aria-hidden="true" />
                <div className="award-content">
                  <div className="award-title">{award.title}</div>
                  <div className="award-meta">{award.sub}</div>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
