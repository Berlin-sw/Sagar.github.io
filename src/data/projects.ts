import type { Project } from "./types";

/*
 * Projects are rendered in this order. `featured: true` projects get the large
 * card at the top of the section. Entries marked `placeholder: true` are sample
 * content — replace them with your own projects (or delete them).
 *
 * Add `links.github` / `links.demo` when they exist; missing links render as
 * disabled "coming soon" buttons rather than broken links.
 */
export const projects: Project[] = [
  {
    slug: "devlens-ai",
    title: "DevLens AI",
    category: "AI · Developer Tools",
    featured: true,
    description:
      "An AI-powered software engineering platform that analyzes GitHub repositories and provides automated code review, architecture insights, documentation generation, security analysis, complexity analysis, and project health insights.",
    problem:
      "Understanding a codebase is slow, and code review, documentation and security checks are often manual, inconsistent or skipped — especially for students, small teams and open-source maintainers without dedicated tooling.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI / Node.js",
      "PostgreSQL",
      "Redis",
      "GitHub API",
      "Tree-sitter",
      "Ollama / Open-source LLMs",
      "Docker",
    ],
    features: [
      "GitHub Repository Import",
      "AI Code Review",
      "Bug Detection",
      "Security Analysis",
      "Code Complexity Analysis",
      "Technical Debt Analysis",
      "README Generation",
      "API Documentation",
      "Architecture Analysis",
      "UML Generation",
      "Project Health Analysis",
      "Multi-language Code Analysis",
    ],
    links: {
      // github: "https://github.com/<username>/devlens-ai",
      // demo: "https://devlens.example.com",
    },
    preview: { type: "dashboard" },
    caseStudy: {
      overview:
        "DevLens AI brings the checks a senior engineer would run on a codebase into one place. Import a GitHub repository and the platform parses its source, runs static and AI-assisted analysis, and turns the results into review comments, documentation and a picture of overall project health.",
      goals: [
        "Import any GitHub repository and analyse it without manual setup.",
        "Combine language-aware static analysis with LLM reasoning for feedback that is specific to the code.",
        "Generate the documentation developers usually skip — READMEs, API references and UML diagrams.",
        "Summarise security, complexity and technical debt in a single project health view.",
      ],
      architecture: [
        {
          title: "Web application",
          description:
            "A Next.js, React and TypeScript dashboard styled with Tailwind CSS for importing repositories and exploring analysis results.",
        },
        {
          title: "API & analysis service",
          description:
            "A FastAPI / Node.js backend that orchestrates repository imports and runs analysis jobs.",
        },
        {
          title: "Code parsing",
          description:
            "Tree-sitter parses source files into syntax trees, giving the analysis a consistent, language-aware view across multiple languages.",
        },
        {
          title: "AI layer",
          description:
            "Open-source LLMs served through Ollama generate review comments, documentation and architecture explanations.",
        },
        {
          title: "Data & caching",
          description:
            "PostgreSQL stores repositories and analysis results; Redis is used for caching and background work.",
        },
        {
          title: "Integrations & deployment",
          description:
            "The GitHub API handles repository import and metadata, and Docker keeps local and server environments reproducible.",
        },
      ],
      challenges: [
        "Fitting large repositories into limited LLM context windows — deciding which code to send and how to chunk it.",
        "Supporting many languages through one consistent analysis pipeline.",
        "Keeping AI-generated feedback grounded in the actual code to avoid vague or incorrect suggestions.",
        "Running analysis asynchronously so large repositories never block the interface.",
      ],
    },
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    category: "AI · NLP",
    placeholder: true,
    description:
      "An NLP tool that compares a resume against a job description and highlights matching skills, missing keywords and sections to improve.",
    problem:
      "Students often apply with one generic resume and can't tell which skills a specific role expects.",
    tech: ["Python", "FastAPI", "NLP", "React", "Tailwind CSS"],
    features: [
      "Resume and job description parsing",
      "Skill and keyword gap analysis",
      "Actionable improvement suggestions",
    ],
    links: {},
    preview: { type: "pattern", icon: "file-text", accent: "violet" },
  },
  {
    slug: "collaborative-task-board",
    title: "Collaborative Task Board",
    category: "Full-Stack",
    placeholder: true,
    description:
      "A Kanban-style task board for student teams with boards, columns, assignees and due dates.",
    problem:
      "Group projects lose track of who is doing what when tasks live across chats and documents.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    features: [
      "Boards, columns and drag-and-drop cards",
      "Assignees, labels and due dates",
      "Authentication and team workspaces",
    ],
    links: {},
    preview: { type: "pattern", icon: "workflow", accent: "emerald" },
  },
  {
    slug: "repo-insights-cli",
    title: "Repo Insights CLI",
    category: "Developer Tools",
    placeholder: true,
    description:
      "A command-line tool that summarises a Git repository's history — active files, contributors and commit patterns — in the terminal.",
    problem:
      "Getting a quick overview of an unfamiliar repository usually means digging through git log by hand.",
    tech: ["Python", "Git", "SQLite"],
    features: [
      "Commit and file activity summaries",
      "Contributor breakdown",
      "Exportable Markdown reports",
    ],
    links: {},
    preview: { type: "pattern", icon: "terminal", accent: "amber" },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
