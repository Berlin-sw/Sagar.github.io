import Link from "next/link";

import { SocialIcon } from "@/components/icons/brand-icons";
import { LogoMark } from "@/components/ui/logo";
import { navItems, siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label={`${siteConfig.name} — home`}>
              <LogoMark className="size-7" />
              <span className="text-[15px] font-semibold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {siteConfig.headline} building practical software, AI-powered applications and developer tools.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:bg-surface-hover hover:text-fg"
                  >
                    <SocialIcon icon={link.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className="text-sm text-fg-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js &amp; TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
