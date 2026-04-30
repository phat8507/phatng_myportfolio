import { ClipboardCheck, Users, UserCheck, Globe2 } from "lucide-react";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";

const impactItems = [
  {
    icon: ClipboardCheck,
    title: "8-member research team",
    text: "Led academic project coordination using Scrum and MBO."
  },
  {
    icon: Users,
    title: "50+ member club",
    text: "Managed scheduling, logistics, recruitment, and media operations."
  },
  {
    icon: UserCheck,
    title: "85% retention",
    text: "Supported annual onboarding and follow-up for new club members."
  },
  {
    icon: Globe2,
    title: "IELTS 7.5 + SFC",
    text: "Strong English communication with certified Scrum foundation."
  }
];

export function ImpactSnapshot() {
  return (
    <section id="impact" className="py-[clamp(2.75rem,6vh,4.25rem)] border-t border-[#D8E1EC] relative z-10">
      <div className="section-container">
        <div className="mb-8">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              Impact Snapshot
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <h2 className="font-display text-[clamp(1.65rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A]">
            Coordination evidence at a glance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactItems.map((item) => {
            const Icon = item.icon;

            return (
              <SignInCardBeamEffect
                key={item.title}
                enableTilt={false}
                className="bg-white/80 border border-[#D8E1EC] rounded-[14px] shadow-[0_2px_14px_rgba(15,42,74,0.045)] overflow-hidden"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
