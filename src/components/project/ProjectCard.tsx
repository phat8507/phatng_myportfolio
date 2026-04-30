import { ExternalLink, Medal, Folder, LayoutGrid, Users } from "lucide-react";
import type { ProjectData } from "../../data/projects";
import { cn } from "../../lib/utils";
import { SignInCardBeamEffect } from "../effects/SignInCardBeamEffect";

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Simple category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "research": return <SearchIcon />;
      case "event": return <LayoutGrid size={16} />;
      case "leadership": return <Users size={16} />;
      default: return <Folder size={16} />;
    }
  };

  // Helper local search icon since lucide-react Search is standard
  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  );

  return (
    <SignInCardBeamEffect
      enableTilt={true}
      className={cn(
        "project-card cursor-pointer bg-white border border-[#D8E1EC] rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(15,42,74,0.04)]",
        "hover:shadow-[0_8px_30px_rgba(15,42,74,0.08)] hover:border-[#2563EB] transition-all duration-300"
      )}
      data-cursor="hover"
      onClick={onClick}
    >
      <div className="p-6 sm:p-7 flex flex-col h-full relative z-10">
        
        {/* 1. Top Row: Category Badge + Medal */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#F0F5FF] text-[#2563EB] text-[0.7rem] font-bold uppercase tracking-wider border border-[rgba(37,99,235,0.1)]">
            {getCategoryIcon(project.category)}
            <span>{project.type}</span>
          </div>

          {project.medal && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#FFFBF0] text-[#D97706] text-[0.7rem] font-bold tracking-wide border border-[#FDE68A] shadow-sm shrink-0">
              <Medal size={14} />
              <span>{project.medal.replace('🥉 ', '')}</span>
            </div>
          )}
        </div>

        {/* 2. Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-[#D8E1EC] to-transparent mb-5" />

        {/* 3. Meta / Role */}
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-2">
          {project.role}
        </div>

        {/* 4. Title */}
        <h3 className="font-display text-[1.25rem] font-bold leading-[1.3] text-[#0B1220] mb-3 group-hover:text-[#2563EB] transition-colors">
          {project.title}
        </h3>

        {/* 5. Description */}
        <p className="text-[0.9rem] text-[#5B6B82] leading-[1.6] mb-6 flex-1">
          {project.cardDesc}
        </p>

        {/* 6. Tags */}
        <div className="flex flex-wrap gap-[6px] mb-6">
          {project.cardTags.map((tag: string) => (
            <span 
              key={tag} 
              className="inline-block px-[10px] py-[4px] rounded-md text-[0.7rem] font-semibold text-[#5B6B82] bg-[#F7F9FC] border border-[#D8E1EC]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 7. Bottom Links & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-[#D8E1EC]">
          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {project.links && project.links.map((link: { label: string; url: string }) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D8E1EC] text-[0.75rem] font-semibold text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm"
              >
                {link.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          <div className="text-[0.8rem] font-bold text-[#2563EB] flex items-center gap-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Details <span>-&gt;</span>
          </div>
        </div>

      </div>
    </SignInCardBeamEffect>
  );
}
