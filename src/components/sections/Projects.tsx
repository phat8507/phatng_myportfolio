import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { ProjectData } from "../../data/projects";
import { projectsData } from "../../data/projects";
import { ProjectCard } from "../project/ProjectCard";
import { ProjectModal } from "../project/ProjectModal";
import { NumberedPagination } from "../ui/NumberedPagination";
import { cn } from "../../lib/utils";

const PROJECTS_PER_PAGE = 6;

export function Projects() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "research", label: "Research" },
    { id: "event", label: "Event" },
    { id: "leadership", label: "Leadership" }
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchFilter = filter === "all" || project.category === filter;
      const searchContent = (project.title + " " + project.role + " " + project.tags.join(" ")).toLowerCase();
      const matchSearch = searchContent.includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedProjects = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [safeCurrentPage, filteredProjects]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-[clamp(3.5rem,8vh,5.5rem)] border-t border-[#D8E1EC] relative z-10">
      <div className="section-container">
        
        {/* ── Header ─────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-col gap-[6px] mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#2563EB]">
              Portfolio
            </span>
            <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#0F2A4A] mb-4">
            Projects &amp; Leadership
          </h2>
        </div>

        {/* ── Controls Row ───────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setCurrentPage(1);
                }}
                className={cn(
                  "px-[16px] py-[8px] rounded-full text-[0.8rem] font-bold transition-all",
                  filter === f.id 
                    ? "bg-[#0F2A4A] text-white border border-[#0F2A4A] shadow-[0_4px_12px_rgba(15,42,74,0.15)]" 
                    : "bg-white text-[#0F2A4A] border border-[#D8E1EC] hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_4px_12px_rgba(15,42,74,0.05)]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-[300px]">
            <Search size={16} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#5B6B82] pointer-events-none" />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-[10px] pr-[16px] pl-[40px] rounded-full border border-[#D8E1EC] bg-[rgba(255,255,255,0.7)] text-[#0B1220] text-[0.85rem] font-medium outline-none transition-all focus:bg-white focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] placeholder:text-[#5B6B82]"
            />
          </div>
          
        </div>

        {/* ── Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#5B6B82] bg-white rounded-[16px] border border-[#D8E1EC]">
              <div className="font-medium text-[1.1rem] mb-1">No projects found</div>
              <div className="text-[0.9rem]">Try adjusting your search or filters.</div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <NumberedPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
