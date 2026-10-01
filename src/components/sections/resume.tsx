import { Download, Eye, FileText } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="relative py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border-strong bg-bg-elevated px-6 py-12 sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 90% at 0% 0%, var(--glow-1), transparent 60%), radial-gradient(50% 80% at 100% 100%, var(--glow-2), transparent 60%)",
              }}
            />
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />

            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
                  Resume
                </p>
                <h2 id="resume-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  Interested in working together?
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-fg-muted sm:text-lg">
                  Grab a copy of my resume for a quick overview of my education, projects and technical skills.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={siteConfig.resumePath} download>
                    <Download className="size-4" aria-hidden="true" />
                    Download Resume
                  </ButtonLink>
                  <ButtonLink
                    href={siteConfig.resumePath}
                    newTab
                    variant="secondary"
                    aria-label="View resume (PDF, opens in a new tab)"
                  >
                    <Eye className="size-4" aria-hidden="true" />
                    View Resume
                  </ButtonLink>
                </div>
              </div>

              <ResumeIllustration />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResumeIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto hidden w-44 shrink-0 sm:block md:mx-0 md:w-52">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-xl border border-border bg-surface" />
      <div className="relative rounded-xl border border-border-strong bg-bg p-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <FileText className="size-4" />
          </span>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-fg/70" />
            <div className="h-1.5 w-1/2 rounded-full bg-fg-subtle/40" />
          </div>
        </div>
        <div className="mt-5 space-y-2">
          {["w-full", "w-11/12", "w-4/5", "w-full", "w-2/3"].map((width, index) => (
            <div key={index} className={`h-1.5 rounded-full bg-fg-subtle/25 ${width}`} />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {["w-10", "w-14", "w-8", "w-12"].map((width, index) => (
            <div key={index} className={`h-3 rounded bg-accent/20 ${width}`} />
          ))}
        </div>
        <div className="mt-5 space-y-2">
          {["w-full", "w-5/6", "w-3/4"].map((width, index) => (
            <div key={index} className={`h-1.5 rounded-full bg-fg-subtle/25 ${width}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
