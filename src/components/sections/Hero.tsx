import { 
  ArrowRight, 
  Mail, 
  Users, 
  Calendar, 
  UserCheck, 
  Search, 
  TrendingUp, 
  Globe, 
  GraduationCap, 
  BookOpen, 
  User
} from "lucide-react";
import { profileData } from "../../data/profile";
import { cn } from "../../lib/utils";

export function Hero() {
  const profileImageUrl = `${import.meta.env.BASE_URL}uploads/photo-1777006151341.jpg`;

  // Mapping icons to tags
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "Project Coordination": return <Users size={14} />;
      case "Event Operations": return <Calendar size={14} />;
      case "HR & Talent": return <UserCheck size={14} />;
      case "Business Research": return <Search size={14} />;
      case "Business Development": return <TrendingUp size={14} />;
      default: return null;
    }
  };

  // Mapping icons to stats
  const getStatIcon = (label: string, iconSize = 18) => {
    switch (label) {
      case "English": return <Globe size={iconSize} className="text-[#2563EB]" />;
      case "University": return <GraduationCap size={iconSize} className="text-[#2563EB]" />;
      case "Learning": return <BookOpen size={iconSize} className="text-[#2563EB]" />;
      case "Status": return <User size={iconSize} className="text-[#2563EB]" />;
      default: return null;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-80px)] flex items-center py-[clamp(3rem,8vh,6rem)] overflow-hidden"
    >
      {/* Optimized Container Max-Width */}
      <div className="w-full max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,384px)] gap-12 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Content (approx 55%) */}
          <div className="hero-copy flex flex-col items-start text-left">
            {/* 1. Eyebrow/Status Line */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse" />
              <span className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#5B6B82]">
                {profileData.status} · {profileData.location}
              </span>
            </div>

            {/* 2. Main Title */}
            <div className="mb-4">
              <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-[#0B1220]">
                {profileData.name}
              </h1>
              {/* 3. Vietnamese Name */}
              <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-playfair italic mt-1.5 text-[#2563EB]">
                {profileData.viName}
              </p>
            </div>

            {/* 4. Divider Line */}
            <div className="w-16 h-[2px] bg-[#2563EB] mb-6 opacity-40 rounded-full" />

            {/* 5. Description */}
            <p className="text-[clamp(1rem,1.6vw,1.15rem)] font-medium max-w-[540px] mb-8 leading-[1.6] text-[#5B6B82]">
              <span className="text-[#0B1220] font-semibold">
                Business Administration student
              </span>{" "}
              building a foundation in project coordination, operations, and
              research — ready to contribute from day one.
            </p>

            {/* 6. Tags Block */}
            <div className="flex flex-wrap gap-2 mb-10 max-w-[580px]">
              {profileData.targets.map((tag) => (
                <span key={tag} className="tag flex items-center gap-2 py-2 px-4 bg-white/60 backdrop-blur-sm border-[#D8E1EC] text-[0.75rem] font-bold text-[#5B6B82] rounded-full hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default shadow-sm">
                  <span className="text-[#2563EB]/80">{getTagIcon(tag)}</span>
                  {tag}
                </span>
              ))}
            </div>

            {/* 7. Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="hero-primary-cta shiny-cta-same-color relative group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[0.88rem] font-bold text-white transition-all overflow-hidden"
                style={{
                  boxShadow: "0 12px 30px rgba(15,42,74,0.12)",
                }}
              >
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <span className="relative z-10">View Projects</span>
              </a>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#D8E1EC] text-[0.88rem] font-bold text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] hover:-translate-y-0.5 shadow-sm active:translate-y-0"
              >
                <Mail size={16} />
                Contact Me
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#D8E1EC] text-[0.88rem] font-bold text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] hover:-translate-y-0.5 shadow-sm active:translate-y-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Unified Visuals Block (approx 45%) */}
          <div className="hero-visual flex w-full max-w-[384px] flex-col gap-3 justify-self-center lg:justify-self-end">
            {/* 1. Profile Image Card */}
            <div
              className="profile-star-inside relative w-full rounded-[26px] overflow-hidden aspect-[4/4.45] shadow-xl transition-all duration-500 group hover:shadow-2xl"
            >
              <img
                src={profileImageUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 via-transparent to-transparent" />

              {/* Overlay Badge */}
              <div className="glass-card absolute bottom-3.5 left-3.5 right-3.5 z-[2] rounded-[15px] p-2.5 flex items-center gap-2.5 border-white/30 backdrop-blur-xl">
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
                    BAdmin · E-Business · Freshman
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#3BBF91] shadow-[0_0_8px_rgba(59,191,145,0.6)] animate-pulse" />
                </div>
              </div>
            </div>

            {/* 2. Stats Grid - Compact Version */}
            <div className="grid w-full grid-cols-2 auto-rows-[78px] gap-2.5">
              {profileData.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-card glass-card h-full rounded-[13px] p-2.5 border-[#D8E1EC]/50 group flex flex-col justify-between">
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
                    {stat.label === "Status" && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3BBF91] ml-1.5 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
