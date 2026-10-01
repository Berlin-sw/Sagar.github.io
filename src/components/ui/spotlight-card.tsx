"use client";

import { m } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Lift the card slightly on hover. */
  lift?: boolean;
  dashed?: boolean;
};

/**
 * Card with a soft radial highlight that follows the pointer and a subtle
 * hover lift. Content is passed as children so it can stay server-rendered.
 */
export function SpotlightCard({ children, className, lift = true, dashed = false }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group/card relative h-full overflow-hidden rounded-2xl border bg-bg-elevated/80 transition-[border-color,box-shadow] duration-300",
        "hover:border-border-strong hover:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)]",
        dashed ? "border-dashed border-border-strong/80 bg-transparent" : "border-border",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--accent) 10%, transparent), transparent 45%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </m.div>
  );
}
