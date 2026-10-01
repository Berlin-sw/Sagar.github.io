import { ArrowRight, BookOpen, GitPullRequest, Rocket } from "lucide-react";

import { GitHubIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tag } from "@/components/ui/tag";
import { experience } from "@/data/experience";
import { siteConfig } from "@/data/site";
import type { ExperienceItem } from "@/data/types";

export function Experience() {
  const hasExperience = experience.length > 0;

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={hasExperience ? "Where I've worked" : "Building Experience Through Projects & Open Source"}
      description={
        hasExperience
          ? "Roles, responsibilities and the impact I've had along the way."
          : "My experience so far comes from building — this timeline will grow as I take on internships and collaborations."
      }
    >
      {hasExperience ? <Timeline items={experience} /> : <ProjectBasedExperience />}
    </Section>
  );
}

function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
      {items.map((item) => (
        <Reveal as="li" key={`${item.organization}-${item.role}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(1.5rem+6.5px)] top-7 size-3 rounded-full border-2 border-accent bg-bg sm:-left-[calc(2rem+6.5px)]"
          />
          <SpotlightCard lift={false} className="p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-fg">{item.role}</h3>
                <p className="mt-0.5 text-fg-muted">
                  {item.organizationUrl ? (
                    <a
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:text-fg hover:underline"
                    >
                      {item.organization}
                    </a>
                  ) : (
                    item.organization
                  )}
                  {item.location ? <span className="text-fg-subtle"> · {item.location}</span> : null}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs text-fg-subtle sm:pt-1.5">{item.duration}</p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{item.description}</p>

            {item.contributions.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {item.contributions.map((contribution) => (
                  <li key={contribution} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {contribution}
                  </li>
                ))}
              </ul>
            ) : null}

            <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      ))}
    </ol>
  );
}

const tracks = [
  {
    icon: Rocket,
    title: "Real-world projects",
    description: "Designing and building complete products like DevLens AI — from architecture to implementation.",
  },
  {
    icon: GitPullRequest,
    title: "Open source",
    description: "Exploring how open-source codebases are structured and contributing where I can.",
  },
  {
    icon: BookOpen,
    title: "Continuous learning",
    description: "Deepening fundamentals in DSA, backend engineering, system design and cloud.",
  },
];

function ProjectBasedExperience() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated/80">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(60% 80% at 100% 0%, var(--glow-1), transparent 60%)" }}
        />
        <div className="relative grid gap-px bg-border md:grid-cols-3">
          {tracks.map((track) => (
            <div key={track.title} className="bg-bg-elevated/95 p-6 sm:p-7">
              <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                <track.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-fg">{track.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{track.description}</p>
            </div>
          ))}
        </div>
        <div className="relative flex flex-wrap items-center gap-3 border-t border-border p-6 sm:px-7">
          <ButtonLink href="/#projects" size="sm">
            Explore my projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href={siteConfig.github.url}
            size="sm"
            variant="secondary"
            aria-label="GitHub profile (opens in a new tab)"
          >
            <GitHubIcon className="size-4" />
            GitHub profile
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
