"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";

import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * The initial theme is applied by an inline script in the root layout before
 * first paint; the icons swap via CSS so server and client markup always match.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Re-apply after React's development-only remount resets <html> attributes.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (stored) applyTheme(stored);
  }, []);

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next: Theme = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg",
        className,
      )}
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
      <Moon className="block size-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
