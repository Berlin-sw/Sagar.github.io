import type { IconName } from "@/lib/icons";

export type NavItem = {
  label: string;
  /** id of the section on the home page */
  id: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
  /** Short text shown next to the icon, e.g. the handle or address. */
  display: string;
};

export type FocusArea = {
  icon: IconName;
  title: string;
  description: string;
};

export type SkillCategory = {
  icon: IconName;
  title: string;
  description: string;
  skills: string[];
};

export type Accent = "blue" | "cyan" | "violet" | "emerald" | "amber" | "rose";

export type ProjectPreview =
  /** A real screenshot in /public (recommended size 1600×1000). */
  | { type: "image"; src: string; alt: string }
  /** Built-in illustrated mock of an analysis dashboard. */
  | { type: "dashboard" }
  /** Abstract pattern with an icon — a good default until you have a screenshot. */
  | { type: "pattern"; icon: IconName; accent: Accent };

export type CaseStudy = {
  overview: string;
  goals: string[];
  architecture: { title: string; description: string }[];
  challenges: string[];
  roadmap?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One-line category, e.g. "AI · Developer Tools" */
  category: string;
  description: string;
  problem: string;
  tech: string[];
  features: string[];
  featured?: boolean;
  /** Marks sample content that should be replaced with a real project. */
  placeholder?: boolean;
  links: {
    github?: string;
    demo?: string;
  };
  preview: ProjectPreview;
  caseStudy?: CaseStudy;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  organizationUrl?: string;
  /** e.g. "Jun 2026 – Aug 2026" */
  duration: string;
  location?: string;
  description: string;
  technologies: string[];
  contributions: string[];
};

export type EducationItem = {
  degree: string;
  field: string;
  institution: string;
  /** e.g. "2022 – 2026". Leave undefined to hide. */
  period?: string;
  coursework: string[];
  interests: string[];
  achievements: { text: string; placeholder?: boolean }[];
};

export type Achievement = {
  category: string;
  icon: IconName;
  title: string;
  description: string;
  date?: string;
  link?: { label: string; href: string };
  placeholder?: boolean;
};
