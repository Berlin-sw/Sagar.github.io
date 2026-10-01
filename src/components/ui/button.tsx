import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn, isExternalUrl } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "icon";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg shadow-sm hover:bg-fg/85",
  secondary:
    "border border-border-strong bg-surface text-fg backdrop-blur-sm hover:border-fg/25 hover:bg-surface-hover",
  ghost: "text-fg-muted hover:bg-surface-hover hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  icon: "size-9",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab. Defaults to true for absolute URLs. */
  newTab?: boolean;
  download?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className" | "download">;

/**
 * Link styled as a button. Uses next/link for internal routes and a plain
 * anchor for external URLs, mailto links and static files.
 */
export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  newTab,
  download,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  const external = isExternalUrl(href);
  const isFile = /\.[a-z0-9]+$/i.test(href) && !href.includes("#");
  const openInNewTab = newTab ?? (external && !href.startsWith("mailto:"));

  if (external || isFile || download) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Placeholder for a link that doesn't exist yet (e.g. an unreleased demo). */
export function DisabledButton({
  children,
  variant = "secondary",
  size = "sm",
  className,
  reason = "Coming soon",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  reason?: string;
}) {
  return (
    <span
      aria-disabled="true"
      title={reason}
      className={buttonStyles({
        variant,
        size,
        className: cn("cursor-not-allowed opacity-50 active:scale-100", className),
      })}
    >
      {children}
      <span className="sr-only"> ({reason})</span>
    </span>
  );
}
