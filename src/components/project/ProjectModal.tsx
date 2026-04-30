import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { ProjectData, ProjectLink } from "../../data/projects";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[rgba(16,42,42,0.1)] backdrop-blur-[12px]"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[680px] max-h-[88vh] overflow-y-auto rounded-[20px] shadow-[0_24px_64px_rgba(16,42,42,0.1)] backdrop-blur-[40px]"
            style={{ background: 'var(--glass-card-bg)', border: '1px solid var(--glass-card-border)' }}
          >
            <div className="sticky top-0 z-10 flex justify-end p-[1rem_1.25rem_0] bg-transparent pointer-events-none">
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-border flex items-center justify-center transition-colors hover:bg-border-dark pointer-events-auto text-text"
                aria-label="Close project modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-[0.5rem_2rem_2rem]">
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-accent mb-2">{project.type}</div>
                <h2 className="font-display text-[1.6rem] font-bold leading-[1.2] tracking-tight text-text mb-1.5">{project.title}</h2>
                <div className="text-[0.85rem] text-muted mb-6">{project.role}</div>
                {project.highlights && project.highlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {project.highlights.map((item: string) => (
                      <div
                        key={item}
                        className="rounded-[10px] border border-[#D8E1EC] bg-white/70 px-3 py-2 text-center shadow-[0_2px_10px_rgba(15,42,74,0.035)]"
                      >
                        <span className="block text-[0.72rem] font-bold text-[#2563EB] leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted mb-[0.6rem] flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Overview
                </div>
                <p className="text-[0.93rem] text-muted leading-[1.8] mb-4">{project.overview}</p>
              </motion.div>

              <div className="h-[1px] bg-border my-5" />

              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted mb-[0.6rem] flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Key Responsibilities
                </div>
                <ul className="flex flex-col gap-1.5 mb-4 pl-0">
                  {project.responsibilities.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-muted leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="h-[1px] bg-border my-5" />

              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted mb-[0.6rem] flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Outcomes
                </div>
                <div className="bg-[#F0F5FF] border border-[rgba(37,99,235,0.22)] rounded-[10px] p-[1rem_1.15rem] text-[0.9rem] text-[#0F2A4A] font-semibold leading-[1.65] shadow-[0_2px_12px_rgba(15,42,74,0.035)]">
                  {project.outcomes}
                </div>
              </motion.div>

              <div className="h-[1px] bg-border my-5" />

              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted mb-[0.6rem] flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                  Skills Demonstrated
                </div>
                <div className="flex flex-wrap gap-[7px]">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="tag inline-block px-[10px] py-[3px] rounded-full text-[0.72rem] font-semibold tracking-wide border">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.links && project.links.length > 0 && (
                <>
                  <div className="h-[1px] bg-border my-5" />
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted mb-[0.6rem] flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
                      Project Links
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.links.map((link: ProjectLink, i: number) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-[7px] rounded-full border border-border-dark bg-card text-accent text-[0.75rem] font-bold transition-all hover:-translate-y-[1px] hover:bg-accent hover:text-white"
                        >
                          <ExternalLink size={12} />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
