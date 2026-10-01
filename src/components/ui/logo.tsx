import { cn } from "@/lib/utils";

/** Code-bracket mark used in the navbar, footer and favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[25%] bg-linear-to-br from-[#5b7cfa] to-[#22c3d8] shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-full">
        <path
          d="M12 10.5 6.5 16l5.5 5.5M20 10.5l5.5 5.5-5.5 5.5M17.6 8.5l-3.2 15"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
