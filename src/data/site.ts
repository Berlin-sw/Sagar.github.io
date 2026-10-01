import type { NavItem, SocialLink } from "./types";

/* ----------------------------------------------------------------------------
 * ✏️  Fill these in before deploying.
 * Leaving the GitHub username empty shows a clean placeholder in the
 * GitHub Activity section instead of live data.
 * -------------------------------------------------------------------------- */
const GITHUB_USERNAME = ""; // e.g. "sagarwagh"
const LINKEDIN_USERNAME = ""; // the part after linkedin.com/in/
const EMAIL = "your.email@example.com";

export const siteConfig = {
  name: "Sagar Wagh",
  shortName: "Sagar",
  role: "Computer Science Engineering Student & Software/AI Developer",
  headline: "Software & AI Developer",
  description:
    "I build practical software products, AI-powered applications, and developer tools while continuously improving my skills in software engineering and data-driven technologies.",
  seoDescription:
    "Portfolio of Sagar Wagh — Computer Science Engineering student and Software/AI developer building full-stack applications, AI-powered products, and developer tools.",
  availability: "Open to internships & software engineering roles",
  email: EMAIL,
  resumePath: "/resume.pdf",
  github: {
    username: GITHUB_USERNAME,
    url: GITHUB_USERNAME ? `https://github.com/${GITHUB_USERNAME}` : "https://github.com/",
  },
  linkedin: {
    username: LINKEDIN_USERNAME,
    url: LINKEDIN_USERNAME
      ? `https://www.linkedin.com/in/${LINKEDIN_USERNAME}/`
      : "https://www.linkedin.com/",
  },
  keywords: [
    "Sagar Wagh",
    "Software Engineer",
    "AI Developer",
    "Computer Science Engineering",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "LLMs",
    "Portfolio",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.github.url,
    icon: "github",
    display: siteConfig.github.username ? `@${siteConfig.github.username}` : "github.com",
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin.url,
    icon: "linkedin",
    display: siteConfig.linkedin.username ? `in/${siteConfig.linkedin.username}` : "linkedin.com",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: "mail",
    display: siteConfig.email,
  },
];
