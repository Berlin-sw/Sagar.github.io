import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { CopyButton } from "@/components/contact/copy-button";
import { SocialIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { siteConfig, socialLinks } from "@/data/site";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Whether it's an internship, a project collaboration or just a conversation about software and AI — my inbox is open."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <Reveal>
          <ul className="space-y-3">
            {socialLinks.map((link) => {
              const isMail = link.icon === "mail";
              return (
                <li key={link.label}>
                  <div className="group relative flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated/80 p-4 transition-colors hover:border-border-strong hover:bg-surface-hover sm:p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-fg">
                      <SocialIcon icon={link.icon} className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-fg">{link.label}</p>
                      <a
                        href={link.href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noopener noreferrer"}
                        className="block truncate text-sm text-fg-muted after:absolute after:inset-0 after:rounded-2xl"
                      >
                        {link.display}
                        {isMail ? null : <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </div>
                    {isMail ? (
                      <CopyButton value={siteConfig.email} label="Copy email address" />
                    ) : (
                      <ArrowUpRight
                        className="size-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-fg-muted">
            Prefer email? Write to me at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-fg underline-offset-4 hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ContactForm fallbackEmail={siteConfig.email} />
        </Reveal>
      </div>
    </Section>
  );
}
