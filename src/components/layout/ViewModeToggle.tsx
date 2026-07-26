import { useViewMode } from "../../lib/view-mode";
import { cn } from "../../lib/utils";

interface ViewModeToggleProps {
  className?: string;
}

export function ViewModeToggle({ className }: ViewModeToggleProps) {
  const { mode, setMode } = useViewMode();

  return (
    <div
      className={cn(
        "view-mode-toggle inline-flex items-center rounded-full border border-[#D8E1EC] bg-white p-1 text-[0.7rem] font-bold",
        className
      )}
      role="tablist"
      aria-label="Portfolio view mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "coordination"}
        onClick={() => setMode("coordination")}
        className={cn(
          "px-3 py-1.5 rounded-full transition-all",
          mode === "coordination"
            ? "bg-[#0F2A4A] text-white"
            : "text-[#5B6B82] hover:text-[#2563EB]"
        )}
      >
        Coordination
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "ld"}
        onClick={() => setMode("ld")}
        className={cn(
          "px-3 py-1.5 rounded-full transition-all",
          mode === "ld"
            ? "bg-[#0F2A4A] text-white"
            : "text-[#5B6B82] hover:text-[#2563EB]"
        )}
      >
        L&D / HR
      </button>
    </div>
  );
}
