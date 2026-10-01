import type { EducationItem } from "./types";

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science Engineering",
    institution: "Walchand Institute of Technology, Solapur",
    // period: "2022 – 2026",
    // Adjust to match your curriculum.
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    interests: [
      "Software Engineering",
      "Artificial Intelligence",
      "Full-Stack Development",
      "Developer Tooling",
    ],
    achievements: [
      {
        text: "Add academic achievements here — e.g. CGPA, scholarships or department recognition.",
        placeholder: true,
      },
    ],
  },
];
