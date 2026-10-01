import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div role="status" className="container-page flex min-h-[70vh] items-center justify-center pt-16">
      <LoaderCircle className="size-6 animate-spin text-fg-subtle" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
