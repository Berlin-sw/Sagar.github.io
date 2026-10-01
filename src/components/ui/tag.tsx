import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Monospace chip used for technologies and skills. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11.5px] leading-5 text-fg-muted transition-colors",
        className,
      )}
    >
      {children}
    </span>
  );
}

type BadgeTone = "accent" | "neutral" | "placeholder" | "success";

const tones: Record<BadgeTone, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent",
  neutral: "border-border bg-surface text-fg-muted",
  placeholder: "border-dashed border-border-strong text-fg-subtle",
  success: "border-success/30 bg-success/10 text-success",
};

/** Small rounded label, e.g. "Featured" or "Placeholder". */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
