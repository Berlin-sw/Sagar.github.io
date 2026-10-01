import { ImageResponse } from "next/og";

import { getProject, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { OG_SIZE, OgCard } from "@/lib/og";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const description = project?.description ?? "";

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project ? `Case study · ${project.category}` : "Case study"}
        title={project?.title ?? siteConfig.name}
        subtitle={description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description}
        chips={(project?.tech ?? []).slice(0, 4)}
        footer={siteConfig.name}
      />
    ),
    size,
  );
}
