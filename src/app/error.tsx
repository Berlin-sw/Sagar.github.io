"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { ButtonLink, buttonStyles } from "@/components/ui/button";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-fg-muted">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => retry()} className={buttonStyles()}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
