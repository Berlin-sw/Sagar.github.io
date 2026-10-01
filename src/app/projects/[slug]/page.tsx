import { ArrowLeft, ArrowRight, CircleCheck, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ProjectActions } from "@/components/projects/project-card";
import { ProjectPreview } from "@/components/projects/project-preview";
import { Reveal } from "@/components/ui/reveal";
import { Badge, Tag } from "@/components/ui/tag";
import { getProject, projects } from "@/data/projects";
import type { Project } from "@/data/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title, description: project.description },
    ...(project.placeholder ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <article className="relative isolate overflow-x-clip pb-24 pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]"
        style={{ background: "radial-gradient(60% 70% at 70% 0%, var(--glow-1), transparent 70%)" }}
      />
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]" />

      <div className="container-page">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-md text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-fg-subtle">{project.category}</span>
              {project.featured ? <Badge tone="accent">Featured</Badge> : null}
              {project.placeholder ? <Badge tone="placeholder">Placeholder</Badge> : null}
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{project.description}</p>
            <ProjectActions project={project} showCaseStudy={false} className="mt-8" />
          </div>
          <ProjectPreview
            project={project}
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="rounded-2xl border border-border shadow-[0_24px_80px_-32px_rgb(0_0_0/0.6)]"
          />
        </header>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0 space-y-14">
            <CaseSection title="The problem">
              <p>{project.problem}</p>
            </CaseSection>

            {caseStudy ? (
              <>
                <CaseSection title="Overview">
                  <p>{caseStudy.overview}</p>
                </CaseSection>

                <CaseSection title="Goals">
                  <BulletList items={caseStudy.goals} />
                </CaseSection>

                <FeaturesSection project={project} />

                <CaseSection title="Architecture">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.architecture.map((part) => (
                      <li key={part.title} className="rounded-xl border border-border bg-bg-elevated/80 p-5">
                        <h3 className="font-medium text-fg">{part.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{part.description}</p>
                      </li>
                    ))}
                  </ul>
                </CaseSection>

                <CaseSection title="Engineering challenges">
                  <ol className="space-y-3">
                    {caseStudy.challenges.map((challenge, challengeIndex) => (
                      <li key={challenge} className="flex gap-4">
                        <span className="font-mono text-sm text-accent">
                          {String(challengeIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ol>
                </CaseSection>

                {caseStudy.roadmap?.length ? (
                  <CaseSection title="What's next">
                    <BulletList items={caseStudy.roadmap} />
                  </CaseSection>
                ) : null}
              </>
            ) : (
              <>
                <FeaturesSection project={project} />
                <Reveal>
                  <div className="flex gap-4 rounded-2xl border border-dashed border-border-strong p-6">
                    <Clock className="mt-0.5 size-5 shrink-0 text-fg-subtle" aria-hidden="true" />
                    <div>
                      <h2 className="font-semibold text-fg">Full case study coming soon</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                        A detailed write-up covering architecture, technical decisions and lessons learned is in
                        progress.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </>
            )}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-bg-elevated/80 p-5">
              <h2 className="text-sm font-semibold text-fg">Tech stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-bg-elevated/80 p-5">
              <h2 className="text-sm font-semibold text-fg">At a glance</h2>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-subtle">Category</dt>
                  <dd className="text-right text-fg">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-subtle">Features</dt>
                  <dd className="text-right text-fg">{project.features.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-subtle">Technologies</dt>
                  <dd className="text-right text-fg">{project.tech.length}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          {previous ? <ProjectNavLink project={previous} direction="previous" /> : <span className="hidden sm:block" />}
          {next ? <ProjectNavLink project={next} direction="next" /> : null}
        </nav>
      </div>
    </article>
  );
}

function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{title}</h2>
        <div className="mt-4 text-pretty leading-relaxed text-fg-muted">{children}</div>
      </section>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturesSection({ project }: { project: Project }) {
  return (
    <CaseSection title="Key features">
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {project.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-fg"
          >
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

function ProjectNavLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group rounded-2xl border border-border bg-bg-elevated/80 p-5 transition-colors hover:border-border-strong hover:bg-surface-hover ${isNext ? "sm:text-right" : ""}`}
    >
      <span className={`flex items-center gap-1.5 text-xs text-fg-subtle ${isNext ? "sm:justify-end" : ""}`}>
        {isNext ? null : <ArrowLeft className="size-3.5" aria-hidden="true" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext ? <ArrowRight className="size-3.5" aria-hidden="true" /> : null}
      </span>
      <span className="mt-1.5 block font-semibold text-fg group-hover:text-accent">{project.title}</span>
    </Link>
  );
}
