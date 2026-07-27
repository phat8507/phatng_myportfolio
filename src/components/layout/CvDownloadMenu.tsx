import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CaretDown } from "@phosphor-icons/react";
import { profileData } from "../../data/profile";
import { cn } from "../../lib/utils";

interface CvDownloadMenuProps {
  className?: string;
  children: ReactNode;
  /** Aligns the dropdown panel to the trigger's left or right edge. */
  align?: "left" | "right";
  /** Called after the user picks a CV option (useful for closing a parent mobile menu). */
  onSelect?: () => void;
}

const cvOptions = [
  {
    key: "coordination" as const,
    label: "Coordination CV",
    sub: "Project Coordination / Operations track",
    ...profileData.cv.coordination,
  },
  {
    key: "ld" as const,
    label: "L&D / HR CV",
    sub: "Learning & Development / HR Manager track",
    ...profileData.cv.ld,
  },
];

export function CvDownloadMenu({ className, children, align = "right", onSelect }: CvDownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const basePath = import.meta.env.BASE_URL;

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + 8,
      left: align === "right" ? rect.right : rect.left,
    });
  };

  const toggleOpen = () => {
    if (!open) updatePosition();
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleReposition = () => updatePosition();

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="menu"
        aria-expanded={open}
        className={className}
      >
        {children}
        <CaretDown size={12} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            aria-label="Choose a CV to download"
            className="cv-download-panel fixed z-[400] w-72 rounded-[14px] border border-[#D8E1EC] bg-white p-1.5 shadow-[0_16px_40px_rgba(15,42,74,0.16)]"
            style={{
              top: coords.top,
              left: align === "right" ? undefined : coords.left,
              right: align === "right" ? `calc(100vw - ${coords.left}px)` : undefined,
            }}
          >
            {cvOptions.map((opt) => (
              <a
                key={opt.key}
                role="menuitem"
                href={`${basePath}${opt.file}`}
                download={opt.downloadName}
                onClick={() => {
                  setOpen(false);
                  onSelect?.();
                }}
                className="flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-[#F0F5FF]"
              >
                <span className="text-[0.82rem] font-bold text-[#0B1220]">{opt.label}</span>
                <span className="text-[0.7rem] text-[#5B6B82]">{opt.sub}</span>
              </a>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
