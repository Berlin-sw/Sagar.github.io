import { GraduationCap } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge, Tag } from "@/components/ui/tag";
import { education } from "@/data/education";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <div className="space-y-6">
        {education.map((item) => (
          <Reveal key={`${item.institution}-${item.degree}`}>
            <SpotlightCard lift={false} className="p-6 sm:p-8">
              <article className="flex flex-col gap-6 sm:flex-row">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-accent">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{item.degree}</h3>
                      <p className="mt-1 text-fg">{item.field}</p>
                      <p className="mt-1 text-sm text-fg-muted">{item.institution}</p>
                    </div>
                    {item.period ? <Badge className="self-start font-mono">{item.period}</Badge> : null}
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-3">
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                        Relevant coursework
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.coursework.map((course) => (
                          <li key={course}>
                            <Tag>{course}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                        Technical interests
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.interests.map((interest) => (
                          <li key={interest}>
                            <Tag>{interest}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                        Academic achievements
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {item.achievements.map((achievement) => (
                          <li
                            key={achievement.text}
                            className={cn(
                              "text-sm leading-relaxed",
                              achievement.placeholder
                                ? "rounded-lg border border-dashed border-border-strong p-3 text-fg-subtle"
                                : "flex gap-2.5 text-fg-muted",
                            )}
                          >
                            {achievement.placeholder ? null : (
                              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                            )}
                            {achievement.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
