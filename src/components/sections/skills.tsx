import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tag } from "@/components/ui/tag";
import { skillCategories } from "@/data/skills";
import { icons } from "@/lib/icons";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools and technologies I work with"
      description="Grouped by where they fit in the stack — from languages and interfaces to data, AI and day-to-day tooling."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = icons[category.icon];
          return (
            <Reveal as="li" key={category.title} delay={(index % 3) * 0.06}>
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-accent transition-colors group-hover/card:border-accent/40">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-fg">{category.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{category.description}</p>
                <ul aria-label={`${category.title} skills`} className="mt-5 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <Tag className="group-hover/card:border-border-strong">{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
