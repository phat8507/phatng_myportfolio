import { ArrowRight, ArrowSquareOut, SealCheck, Folder, SquaresFour, Users, MagnifyingGlass } from "@phosphor-icons/react";
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
      case "research": return <MagnifyingGlass size={16} />;
      case "event": return <SquaresFour size={16} />;
      case "leadership": return <Users size={16} />;
      default: return <Folder size={16} />;
    }
  };

  return (
    <SignInCardBeamEffect
      enableTilt={true}
      className={cn(
        "project-card cursor-pointer glass-card rounded-[16px] overflow-hidden",
        "motion-card hover:shadow-[0_12px_34px_rgba(15,42,74,0.10)] hover:border-[#2563EB] transition-all duration-300"
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
              <SealCheck size={14} />
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
        <p className="text-[0.9rem] text-[#5B6B82] leading-[1.6] mb-5">
          {project.cardDesc}
        </p>

        {/* 5b. Key highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 mb-6">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.8rem] font-medium text-[#0F2A4A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 6. Tags */}
        <div className="flex flex-wrap gap-[6px] mb-6 mt-auto">
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
        <div className="project-actions mt-auto pt-4 border-t border-dashed border-[#D8E1EC]">
          {project.links && project.links.length > 0 && (
            <div className="project-link-list" onClick={(e) => e.stopPropagation()}>
              {project.links.map((link: { label: string; url: string }) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-row motion-button"
                >
                  <span className="project-link-label">{link.label}</span>
                  <ArrowSquareOut size={12} className="project-link-icon" />
                </a>
              ))}
            </div>
          )}

          <button
            type="button"
            className="details-button motion-button"
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </SignInCardBeamEffect>
  );
}
