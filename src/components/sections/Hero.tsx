import {
  ArrowRight,
  Download,
  Mail,
  Users,
  Calendar,
  Globe,
  BookOpen,
  ClipboardList,
  Trophy
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { profileData } from "../../data/profile";
import { cn } from "../../lib/utils";
import {
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from "../motion/variants";

export function Hero() {
  const profileImageUrl = `${import.meta.env.BASE_URL}uploads/photo-1777006151341.jpg`;
  const cvUrl = `${import.meta.env.BASE_URL}Phat_Nguyen_CV.pdf`;
  const shouldReduceMotion = Boolean(useReducedMotion());
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.11);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);

  const scrollToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState(null, "", "#projects");
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "Project Coordination": return <Users size={14} />;
      case "Project Management": return <ClipboardList size={14} />;
      case "Operations": return <ClipboardList size={14} />;
      case "Agile/Scrum": return <BookOpen size={14} />;
      case "Event Logistics": return <Calendar size={14} />;
      default: return null;
    }
  };

  const getStatIcon = (label: string, iconSize = 18) => {
    switch (label) {
      case "Score": return <Trophy size={iconSize} className="text-[#2563EB]" />;
      case "Participation": return <Users size={iconSize} className="text-[#2563EB]" />;
      case "Scale": return <Users size={iconSize} className="text-[#2563EB]" />;
      case "English": return <Globe size={iconSize} className="text-[#2563EB]" />;
      default: return null;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-80px)] flex items-center py-[clamp(3rem,8vh,6rem)] overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,384px)] gap-12 lg:gap-12 xl:gap-14 items-center">
          <motion.div
            className="hero-copy flex flex-col items-start text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex items-center gap-2 mb-4" variants={staggerItem}>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse" />
              <span className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#5B6B82]">
                {profileData.status} · {profileData.location}
              </span>
            </motion.div>

            <motion.div className="mb-4" variants={staggerItem}>
              <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-[#0B1220] max-w-[680px]">
                {profileData.name}
              </h1>
              <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-playfair italic mt-1.5 text-[#2563EB]">
                {profileData.viName}
              </p>
              <p className="mt-3 text-[0.8rem] sm:text-[0.85rem] font-bold uppercase tracking-[0.16em] text-[#5B6B82]">
                {profileData.headline}
              </p>
            </motion.div>

            <motion.div className="w-16 h-[2px] bg-[#2563EB] mb-6 opacity-40 rounded-full" variants={staggerItem} />

            <motion.p className="text-[clamp(1rem,1.6vw,1.15rem)] font-medium max-w-[600px] mb-8 leading-[1.65] text-[#5B6B82]" variants={staggerItem}>
              {profileData.heroDescription}
            </motion.p>

            <motion.div className="flex flex-wrap gap-2 mb-10 max-w-[620px]" variants={staggerItem}>
              {profileData.targets.map((tag) => (
                <span key={tag} className="tag flex items-center gap-2 py-2 px-4 text-[0.75rem] font-bold text-[#5B6B82] rounded-full hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default">
                  <span className="text-[#2563EB]/80">{getTagIcon(tag)}</span>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-3" variants={staggerItem}>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="hero-primary-cta motion-button shiny-cta-same-color relative group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[0.88rem] font-bold text-white transition-all overflow-hidden"
                style={{ boxShadow: "0 12px 30px rgba(15,42,74,0.12)" }}
              >
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <span className="relative z-10">View Featured Projects</span>
              </a>

              <a
                href={cvUrl}
                download="Phat_Nguyen_CV.pdf"
                className="motion-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[rgba(255,255,255,0.82)] border border-[rgba(255,255,255,0.74)] backdrop-blur-sm text-[0.88rem] font-bold text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(15,42,74,0.06),inset_0_1.5px_0_rgba(255,255,255,0.92)] active:translate-y-0"
              >
                <Download size={16} />
                Download CV
              </a>

              <a
                href="#contact"
                className="motion-button inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[rgba(255,255,255,0.82)] border border-[rgba(255,255,255,0.74)] backdrop-blur-sm text-[0.88rem] font-bold text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(15,42,74,0.06),inset_0_1.5px_0_rgba(255,255,255,0.92)] active:translate-y-0"
              >
                <Mail size={16} />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual flex w-full max-w-[384px] flex-col gap-3 justify-self-center lg:justify-self-end"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.75, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="profile-star-inside relative w-full rounded-[26px] overflow-hidden aspect-[4/4.45] shadow-xl transition-all duration-500 group hover:shadow-2xl">
              <img
                src={profileImageUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 via-transparent to-transparent" />

              <div className="glass-card glass-card--elevated glass-noise absolute bottom-3.5 left-3.5 right-3.5 z-[2] rounded-[15px] p-2.5 flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display text-[0.84rem] font-bold text-white shrink-0 shadow-md"
                  style={{ background: "linear-gradient(135deg, #0F2A4A, #2563EB)" }}
                >
                  PN
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.84rem] font-bold text-[#0B1220] leading-tight truncate">
                    {profileData.name}
                  </div>
                  <div className="text-[0.64rem] font-medium text-[#5B6B82] mt-0.5 truncate">
                    BAdmin - E-Business · Class of 2029
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#3BBF91] shadow-[0_0_8px_rgba(59,191,145,0.6)] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 auto-rows-[78px] gap-2.5">
              {profileData.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-card glass-card h-full rounded-[13px] p-2.5 group flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB]/5 flex items-center justify-center transition-colors group-hover:bg-[#2563EB]/10">
                      {getStatIcon(stat.label, 16)}
                    </div>
                    <span className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-[#5B6B82] opacity-80">
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "text-[0.85rem] font-bold tracking-tight mt-1 transition-colors leading-snug",
                      stat.accent ? "text-[#2563EB]" : "text-[#0B1220]"
                    )}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
