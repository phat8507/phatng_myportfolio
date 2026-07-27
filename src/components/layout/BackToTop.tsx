import { useEffect, useState } from "react";
import { CaretUp } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 520);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-[90] w-10 h-10 rounded-full bg-card border border-border-dark flex items-center justify-center text-muted transition-all duration-300 hover:bg-accent-soft hover:border-accent hover:text-accent hover:-translate-y-1 shadow-sm",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <CaretUp size={20} />
    </button>
  );
}
