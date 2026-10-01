import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/tag";
import { achievements } from "@/data/achievements";
import { icons } from "@/lib/icons";
import { cn, isExternalUrl } from "@/lib/utils";

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Milestones and recognition"
      description="Projects, competitions, certifications and contributions — a growing record of what I've worked on."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = icons[achievement.icon];
          const external = achievement.link ? isExternalUrl(achievement.link.href) : false;

          return (
            <Reveal as="li" key={`${achievement.category}-${achievement.title}`} delay={(index % 3) * 0.06}>
              <SpotlightCard dashed={achievement.placeholder} className="p-6">
                <article className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl border",
                        achievement.placeholder
                          ? "border-dashed border-border-strong text-fg-subtle"
                          : "border-accent/30 bg-accent/10 text-accent",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    {achievement.placeholder ? <Badge tone="placeholder">Placeholder</Badge> : null}
                  </div>

                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                    {achievement.category}
                    {achievement.date ? ` · ${achievement.date}` : null}
                  </p>
                  <h3
                    className={cn(
                      "mt-1.5 font-semibold",
                      achievement.placeholder ? "text-fg-muted" : "text-fg",
                    )}
                  >
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{achievement.description}</p>

                  {achievement.link ? (
                    <Link
                      href={achievement.link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent"
                    >
                      {achievement.link.label}
                      <ArrowRight
                        className="size-4 transition-transform group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : null}
                </article>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
