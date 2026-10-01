import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Consistent wrapper for every home page section: spacing, heading and divider. */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative py-20 sm:py-24 lg:py-28", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-linear-to-r from-transparent via-border-strong to-transparent"
      />
      <div className="container-page">
        <Reveal>
          <SectionHeading id={headingId} eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
