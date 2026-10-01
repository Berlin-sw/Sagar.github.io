import { ArrowUpRight, CircleCheck, ExternalLink, Sparkles } from "lucide-react";

import { GitHubIcon } from "@/components/icons/brand-icons";
import { ProjectPreview } from "@/components/projects/project-preview";
import { ButtonLink, DisabledButton } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge, Tag } from "@/components/ui/tag";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "default";
};

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  return variant === "featured" ? <FeaturedCard project={project} /> : <CompactCard project={project} />;
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <SpotlightCard>
      <article aria-labelledby={`${project.slug}-title`}>
        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="order-2 p-6 sm:p-8 lg:order-1">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">
                <Sparkles className="size-3" aria-hidden="true" />
                Featured
              </Badge>
              <span className="font-mono text-xs text-fg-subtle">{project.category}</span>
            </div>

            <h3 id={`${project.slug}-title`} className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{project.description}</p>

            <div className="mt-5 rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Problem solved</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{project.problem}</p>
            </div>

            <ProjectActions project={project} className="mt-6" />
          </div>

          <div className="order-1 p-3 sm:p-4 lg:order-2 lg:pl-0">
            <ProjectPreview
              project={project}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="rounded-xl border border-border"
            />
          </div>
        </div>

        <div className="border-t border-border p-6 sm:p-8">
          <h4 className="text-sm font-semibold text-fg">Key features</h4>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-fg-muted">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="mt-7 text-sm font-semibold text-fg">Tech stack</h4>
          <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </SpotlightCard>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <SpotlightCard>
      <article aria-labelledby={`${project.slug}-title`} className="flex h-full flex-col">
        <ProjectPreview project={project} className="border-b border-border" />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-fg-subtle">{project.category}</span>
            {project.placeholder ? <Badge tone="placeholder">Placeholder</Badge> : null}
          </div>

          <h3 id={`${project.slug}-title`} className="mt-2 text-lg font-semibold tracking-tight text-fg">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.description}</p>
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-medium text-fg">Problem: </span>
            <span className="text-fg-muted">{project.problem}</span>
          </p>

          <ul className="mt-4 space-y-1.5" aria-label="Key features">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-fg-muted">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <ProjectActions project={project} compact />
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}

export function ProjectActions({
  project,
  compact = false,
  showCaseStudy = true,
  className,
}: {
  project: Project;
  compact?: boolean;
  showCaseStudy?: boolean;
  className?: string;
}) {
  const { github, demo } = project.links;
  const linkSize = compact ? "icon" : "sm";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {showCaseStudy ? (
        <ButtonLink href={`/projects/${project.slug}`} size="sm" variant={compact ? "secondary" : "primary"}>
          View Case Study
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">: {project.title}</span>
        </ButtonLink>
      ) : null}

      {github ? (
        <ButtonLink
          href={github}
          size={linkSize}
          variant="secondary"
          aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
          title="Source code"
        >
          <GitHubIcon className="size-4" />
          {compact ? null : "GitHub"}
        </ButtonLink>
      ) : (
        <DisabledButton size={linkSize} reason="Source code coming soon">
          <GitHubIcon className="size-4" />
          {compact ? <span className="sr-only">GitHub</span> : "GitHub"}
        </DisabledButton>
      )}

      {demo ? (
        <ButtonLink
          href={demo}
          size={linkSize}
          variant="secondary"
          aria-label={`${project.title} live demo (opens in a new tab)`}
          title="Live demo"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          {compact ? null : "Live Demo"}
        </ButtonLink>
      ) : (
        <DisabledButton size={linkSize} reason="Live demo coming soon">
          <ExternalLink className="size-4" aria-hidden="true" />
          {compact ? <span className="sr-only">Live Demo</span> : "Live Demo"}
        </DisabledButton>
      )}
    </div>
  );
}
