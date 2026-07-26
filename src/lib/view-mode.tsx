import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ViewMode = "coordination" | "ld";

const VIEW_MODE_KEY = "portfolio-view-mode";

interface ViewModeContextValue {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

const readStoredMode = (): ViewMode => {
  if (typeof window === "undefined") return "coordination";
  const stored = window.localStorage.getItem(VIEW_MODE_KEY);
  return stored === "ld" ? "ld" : "coordination";
};

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>(readStoredMode);

  useEffect(() => {
    window.localStorage.setItem(VIEW_MODE_KEY, mode);
  }, [mode]);

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within a ViewModeProvider");
  return ctx;
}

export function pickByMode<T>(mode: ViewMode, variants: { coordination: T; ld: T }): T {
  return variants[mode];
}
