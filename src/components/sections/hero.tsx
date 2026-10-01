import { ArrowRight, Download, Mail } from "lucide-react";
import type { CSSProperties } from "react";

import { SocialIcon } from "@/components/icons/brand-icons";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/data/site";

/* The text uses a CSS entrance (not JS) so the headline paints before hydration. */
const stagger = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40"
    >
      <HeroBackground />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur"
            style={stagger(0)}
          >
            <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-success text-success" />
            {siteConfig.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-fade-up text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
            style={stagger(1)}
          >
            Hi, I&apos;m <span className="text-gradient">{siteConfig.name}</span>
          </h1>

          <p className="mt-4 animate-fade-up text-pretty text-lg font-medium text-fg sm:text-xl" style={stagger(2)}>
            {siteConfig.role}
          </p>

          <p
            className="mt-5 max-w-xl animate-fade-up text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
            style={stagger(3)}
          >
            {siteConfig.description}
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap" style={stagger(4)}>
            <ButtonLink href="/#projects" className="w-full sm:w-auto">
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={siteConfig.resumePath} download variant="secondary" className="w-full sm:w-auto">
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </ButtonLink>
            <ButtonLink href="/#contact" variant="ghost" className="w-full sm:w-auto">
              <Mail className="size-4" aria-hidden="true" />
              Contact Me
            </ButtonLink>
          </div>

          <ul aria-label="Social profiles" className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3" style={stagger(5)}>
            {socialLinks.map((link) => {
              const isMail = link.icon === "mail";
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon icon={link.icon} className="size-4" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0" />
      <div
        className="absolute left-1/2 top-[-18rem] h-[40rem] w-[64rem] -translate-x-1/2 animate-drift rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow-1), transparent)" }}
      />
      <div
        className="absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow-2), transparent)" }}
      />
    </div>
  );
}
