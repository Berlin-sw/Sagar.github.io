import { ArrowUpRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons/brand-icons";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured work"
      description="Products and tools I've designed and built — the problems they solve, how they work, and what I learned along the way."
    >
      <div className="space-y-6">
        {featured.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} variant="featured" />
          </Reveal>
        ))}

        {others.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((project, index) => (
              <Reveal as="li" key={project.slug} delay={(index % 3) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <ButtonLink href={siteConfig.github.url} variant="ghost" aria-label="More projects on GitHub (opens in a new tab)">
          <GitHubIcon className="size-4" />
          More on GitHub
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
