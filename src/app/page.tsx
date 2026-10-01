import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

// GitHub data is refreshed at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function personJsonLd() {
  const sameAs = [
    siteConfig.github.username ? siteConfig.github.url : null,
    siteConfig.linkedin.username ? siteConfig.linkedin.url : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: getSiteUrl(),
    jobTitle: siteConfig.headline,
    description: siteConfig.description,
    affiliation: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
    knowsAbout: skillCategories.flatMap((category) => category.skills),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <GitHubActivity />
      <Resume />
      <Contact />
    </>
  );
}
