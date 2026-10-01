import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-fg-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </ButtonLink>
    </section>
  );
}
