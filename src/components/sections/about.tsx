import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { aboutParagraphs, currentlyLearning, focusAreas } from "@/data/about";
import { icons } from "@/lib/icons";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A developer who learns by building">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-8">
          <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-fg-muted sm:text-[17px]">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-fg" : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-bg-elevated/80 p-5 sm:p-6">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-fg">
                <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-accent text-accent" />
                Currently learning
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {currentlyLearning.map((topic, index) => (
                  <li
                    key={topic}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg"
                  >
                    <span aria-hidden="true" className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated/80">
            {focusAreas.map((area) => {
              const Icon = icons[area.icon];
              return (
                <li key={area.title} className="flex gap-4 p-5 transition-colors hover:bg-surface sm:p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-medium text-fg">{area.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{area.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
