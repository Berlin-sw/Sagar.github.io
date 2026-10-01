import { cn } from "@/lib/utils";

function Block({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-surface-hover", className)} />;
}

const cardClass = "rounded-2xl border border-border bg-bg-elevated/80 p-5 sm:p-6";

/** Mirrors the GitHub section layout so nothing shifts when data arrives. */
export function GitHubActivitySkeleton() {
  return (
    <div role="status" aria-label="Loading GitHub activity" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className={cardClass}>
        <div className="flex items-center gap-4">
          <Block className="size-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <Block className="h-4 w-1/2" />
            <Block className="h-3 w-1/3" />
          </div>
        </div>
        <Block className="mt-5 h-16 w-full rounded-xl" />
        <Block className="mt-5 h-9 w-full rounded-lg" />
      </div>
      <div className={cn(cardClass, "lg:col-span-2")}>
        <Block className="h-4 w-32" />
        <Block className="mt-6 h-32 w-full" />
      </div>
      <div className={cn(cardClass, "lg:col-span-2")}>
        <Block className="h-4 w-40" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <Block key={index} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className={cardClass}>
        <Block className="h-4 w-28" />
        <Block className="mt-5 h-2.5 w-full rounded-full" />
        <div className="mt-5 space-y-3">
          {Array.from({ length: 4 }, (_, index) => (
            <Block key={index} className="h-3 w-full" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading GitHub activity…</span>
    </div>
  );
}
