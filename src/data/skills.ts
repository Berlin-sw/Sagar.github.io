import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    icon: "code",
    title: "Programming",
    description: "Languages I use for problem solving, tooling and applications.",
    skills: ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  },
  {
    icon: "layout",
    title: "Frontend",
    description: "Building responsive, accessible interfaces.",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    icon: "server",
    title: "Backend",
    description: "APIs and services that power applications.",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    icon: "database",
    title: "Databases",
    description: "Relational and document data stores.",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
  },
  {
    icon: "brain",
    title: "AI / ML",
    description: "From classic ML to LLM-powered applications.",
    skills: ["Machine Learning", "NLP", "LLMs", "Generative AI", "Ollama", "LangChain"],
  },
  {
    icon: "wrench",
    title: "Tools",
    description: "Everyday development and collaboration tooling.",
    skills: ["Git", "GitHub", "Docker", "VS Code", "Postman"],
  },
];
