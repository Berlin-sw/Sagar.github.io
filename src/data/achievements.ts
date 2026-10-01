import type { Achievement } from "./types";

/*
 * Only list things you have actually done. Entries marked `placeholder: true`
 * render as dashed "placeholder" cards — replace them with real achievements
 * or delete them.
 *
 * If you took part in Smart India Hackathon, replace the hackathon placeholder:
 * {
 *   category: "Hackathons",
 *   icon: "trophy",
 *   title: "Smart India Hackathon",
 *   description: "Participated in Smart India Hackathon <year>, working on <problem statement>.",
 *   date: "<year>",
 * },
 */
export const achievements: Achievement[] = [
  {
    category: "Projects",
    icon: "rocket",
    title: "DevLens AI",
    description:
      "Designing and building an AI-powered platform for automated code review, documentation generation and repository health analysis.",
    link: { label: "Read the case study", href: "/projects/devlens-ai" },
  },
  {
    category: "Hackathons",
    icon: "trophy",
    title: "Hackathon participation",
    description: "Add hackathons you've taken part in — the event, your team's problem statement and what you built.",
    placeholder: true,
  },
  {
    category: "Coding",
    icon: "code",
    title: "Competitive programming",
    description: "Add your coding profiles (LeetCode, CodeChef, Codeforces) and milestones you're proud of.",
    placeholder: true,
  },
  {
    category: "Certifications",
    icon: "award",
    title: "Certifications",
    description: "List verified certifications with the issuing organisation and a credential link.",
    placeholder: true,
  },
  {
    category: "Academics",
    icon: "graduation-cap",
    title: "Academic recognition",
    description: "Add scholarships, honours or other academic recognition.",
    placeholder: true,
  },
  {
    category: "Open Source",
    icon: "git-pull-request",
    title: "Open-source contributions",
    description: "Highlight merged pull requests or projects you've contributed to, with links.",
    placeholder: true,
  },
];
