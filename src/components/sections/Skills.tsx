import { CalendarDays, MessageCircle, Search, LayoutGrid, BookOpen } from "lucide-react";
import { skillsData, languagesData } from "../../data/skills";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";
import { TiltCard } from "../effects/TiltCard";

const iconMap = {
  "Project & Operations": <CalendarDays size={22} className="text-[#2563EB]" />,
  "People & HR Support": <MessageCircle size={22} className="text-[#2563EB]" />,
  "Research & Communication": <Search size={22} className="text-[#2563EB]" />,
  Tools: <LayoutGrid size={22} className="text-[#2563EB]" />
};

const descMap = {
  "Project & Operations": "Planning tasks, tracking progress, and keeping delivery organized.",
  "People & HR Support": "Supporting onboarding, recruitment coordination, and stakeholder follow-up.",
  "Research & Communication": "Turning research into clear reports, presentations, and Q&A materials.",
  Tools: "Using practical tools to document, communicate, and deliver work."
};

export function Skills() {
  return (
    <section id="skills" className="py-[clamp(3.5rem,8vh,5.5rem)] border-t border-[#D8E1EC]">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              Capabilities
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {skillsData.map((card) => (
            <TiltCard
              key={card.category}
              tiltLimit={6}
              scale={1.015}
              perspective={1200}
              effect="evade"
              spotlight={true}
              className="rounded-[16px]"
            >
              <SignInCardBeamEffect
                enableTilt={false}
                className="skill-card bg-white border border-[#D8E1EC] rounded-[16px] shadow-[0_2px_16px_rgba(15,42,74,0.06)] overflow-hidden"
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
          ))}
        </div>

        <SignInCardBeamEffect
          enableTilt={false}
          className="skill-card bg-white border border-[#D8E1EC] rounded-[16px] shadow-[0_2px_16px_rgba(15,42,74,0.06)] overflow-hidden"
          data-cursor="hover"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 px-7 py-5 relative z-10">
            <div className="flex items-center gap-3 sm:pr-6 sm:border-r sm:border-[#D8E1EC] shrink-0">
              <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.07)] flex items-center justify-center">
                <BookOpen size={18} className="text-[#2563EB]" />
              </div>
              <span className="text-[0.95rem] font-bold text-[#0B1220] whitespace-nowrap">
                Languages
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 sm:pl-2 relative z-10">
              {languagesData.map((item) => (
                <span
                  key={item.name}
                  className="text-[0.875rem] text-[#5B6B82] font-medium"
                >
                  <span className="font-bold text-[#0B1220]">{item.name}</span> - {item.level}
                </span>
              ))}
            </div>
          </div>
        </SignInCardBeamEffect>
      </div>
    </section>
  );
}
