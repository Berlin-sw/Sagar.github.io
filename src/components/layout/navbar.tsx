"use client";

import { AnimatePresence, m } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GitHubIcon, SocialIcon } from "@/components/icons/brand-icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";
import { navItems, siteConfig, socialLinks } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(12);
  const activeSection = useActiveSection(pathname === "/");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    function handleBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);
  const elevated = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        elevated ? "border-border" : "border-transparent",
      )}
    >
      {/* Kept on its own layer: backdrop-filter on <header> would trap the fixed menu backdrop below. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-bg/75 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300",
          elevated ? "opacity-100" : "opacity-0",
        )}
      />
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          onClick={close}
          aria-label={`${siteConfig.name} — home`}
          className="flex items-center gap-2.5 rounded-lg"
        >
          <LogoMark className="size-7" />
          <span className="text-[15px] font-semibold tracking-tight text-fg">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-center bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={siteConfig.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg sm:inline-flex"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <ButtonLink
            href={siteConfig.resumePath}
            newTab
            size="sm"
            className="ml-1 hidden sm:inline-flex"
            aria-label="Resume (PDF, opens in a new tab)"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg text-fg transition-colors hover:bg-surface-hover lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              key="backdrop"
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-16 -z-10 bg-bg/60 backdrop-blur-sm lg:hidden"
            />
            <m.div
              key="panel"
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border lg:hidden"
            >
              <div className="container-page py-4">
                <ul className="grid gap-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/#${item.id}`}
                        onClick={close}
                        aria-current={activeSection === item.id ? "location" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface-hover",
                          activeSection === item.id ? "text-fg" : "text-fg-muted",
                        )}
                      >
                        {item.label}
                        {activeSection === item.id ? (
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                      aria-label={link.label}
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
                    >
                      <SocialIcon icon={link.icon} className="size-[18px]" />
                    </a>
                  ))}
                  <ButtonLink href={siteConfig.resumePath} newTab size="sm" className="ml-auto" onClick={close}>
                    <FileText className="size-4" aria-hidden="true" />
                    Resume
                  </ButtonLink>
                </div>
              </div>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
