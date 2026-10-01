import { Bot, FileCode, GitBranch } from "lucide-react";
import Image from "next/image";

import type { Accent, Project } from "@/data/types";
import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

const accentColors: Record<Accent, [string, string]> = {
  blue: ["#4f6ef7", "#22c3d8"],
  cyan: ["#06b6d4", "#3b82f6"],
  violet: ["#7c5cff", "#c084fc"],
  emerald: ["#10b981", "#22d3ee"],
  amber: ["#f59e0b", "#f97316"],
  rose: ["#f43f5e", "#a855f7"],
};

type ProjectPreviewProps = {
  project: Project;
  className?: string;
  /** Passed to next/image when the preview is a screenshot. */
  sizes?: string;
  priority?: boolean;
};

export function ProjectPreview({ project, className, sizes, priority }: ProjectPreviewProps) {
  const { preview } = project;

  if (preview.type === "image") {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
        />
      </div>
    );
  }

  if (preview.type === "dashboard") {
    return <DashboardPreview title={project.title} className={className} />;
  }

  return <PatternPreview title={project.title} icon={preview.icon} accent={preview.accent} className={className} />;
}

function PatternPreview({
  title,
  icon,
  accent,
  className,
}: {
  title: string;
  icon: IconName;
  accent: Accent;
  className?: string;
}) {
  const Icon = icons[icon];
  const [from, to] = accentColors[accent];

  return (
    <div
      role="img"
      aria-label={`${title} preview illustration`}
      className={cn("relative aspect-[16/10] overflow-hidden bg-bg", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 90% at 80% 0%, ${from}38, transparent 60%), radial-gradient(70% 70% at 0% 100%, ${to}2e, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="absolute inset-x-6 bottom-0 top-7 rounded-t-xl border border-b-0 border-border bg-bg-elevated/70 backdrop-blur-sm transition-transform duration-500 group-hover/card:-translate-y-1">
        <div className="flex gap-1.5 border-b border-border px-3 py-2.5">
          <span className="size-1.5 rounded-full bg-fg-subtle/40" />
          <span className="size-1.5 rounded-full bg-fg-subtle/40" />
          <span className="size-1.5 rounded-full bg-fg-subtle/40" />
        </div>
        <div className="space-y-2.5 p-4">
          <div className="h-2 w-1/3 rounded-full bg-fg-subtle/25" />
          <div className="h-2 w-2/3 rounded-full bg-fg-subtle/15" />
          <div className="h-2 w-1/2 rounded-full bg-fg-subtle/15" />
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[66%] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.45)] transition-transform duration-500 group-hover/card:scale-105"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <Icon className="size-6 text-white" aria-hidden="true" />
      </div>
    </div>
  );
}

const sidebarItems = ["Overview", "Code Review", "Security", "Complexity", "Docs", "Architecture"];

const codeRows: { n: number; code: string; highlight?: boolean }[] = [
  { n: 12, code: "export async function getUser(id) {" },
  { n: 13, code: "  const user = await db.query(sql, [id]);", highlight: true },
  { n: 14, code: "  return user;" },
  { n: 15, code: "}" },
];

const healthRows = [
  { label: "Maintainability", width: "78%" },
  { label: "Security", width: "64%" },
  { label: "Documentation", width: "42%" },
];

/** Illustrated mock of the DevLens AI analysis view. Purely decorative UI. */
function DashboardPreview({ title, className }: { title: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${title} interface illustration showing code review, security and health panels`}
      className={cn("@container relative aspect-[16/10] overflow-hidden bg-bg", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 80% at 85% 0%, rgb(79 110 247 / 0.28), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgb(34 195 216 / 0.16), transparent 60%)",
        }}
      />

      <div className="absolute inset-3 flex flex-col overflow-hidden rounded-xl border border-border-strong bg-bg-elevated/85 shadow-[0_20px_60px_-24px_rgb(0_0_0/0.6)] backdrop-blur @md:inset-5">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-1.5 rounded-full bg-[#ff5f57]" />
          <span className="size-1.5 rounded-full bg-[#febc2e]" />
          <span className="size-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-[9px] text-fg-subtle @md:text-[10px]">
            DevLens AI — repository analysis
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="hidden w-[26%] shrink-0 flex-col gap-0.5 border-r border-border p-2 @md:flex">
            {sidebarItems.map((item) => (
              <span
                key={item}
                className={cn(
                  "truncate rounded px-2 py-1 text-[10px]",
                  item === "Code Review" ? "bg-accent/15 font-medium text-accent" : "text-fg-subtle",
                )}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 p-2.5 @md:p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 font-mono text-[9px] text-fg-muted @md:text-[10px]">
                <FileCode className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">src/api/users.ts</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-border px-1.5 py-0.5 font-mono text-[8px] text-fg-subtle @md:text-[9px]">
                <GitBranch className="size-2.5" aria-hidden="true" />
                main
              </span>
            </div>

            <div className="rounded-md border border-border bg-bg/60 py-1.5 font-mono text-[8.5px] leading-[1.6] @md:text-[10px]">
              {codeRows.map((row) => (
                <div
                  key={row.n}
                  className={cn("flex whitespace-pre px-2", row.highlight && "bg-accent/10 shadow-[inset_2px_0_0_var(--accent)]")}
                >
                  <span className="w-5 shrink-0 text-fg-subtle/60">{row.n}</span>
                  <span className="truncate text-fg-muted">{row.code}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 rounded-md border border-accent/30 bg-accent/[0.07] p-2">
              <Bot className="mt-px size-3 shrink-0 text-accent @md:size-3.5" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[8.5px] font-medium text-fg @md:text-[10px]">AI review · Suggestion</p>
                <p className="mt-0.5 truncate text-[8px] text-fg-muted @md:text-[9.5px]">
                  Validate <span className="font-mono">id</span> before it reaches the query layer.
                </p>
              </div>
            </div>

            <div className="mt-auto hidden gap-1.5 @sm:grid">
              {healthRows.map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 truncate text-[8.5px] text-fg-subtle @md:w-24 @md:text-[9.5px]">
                    {row.label}
                  </span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-fg-subtle/15">
                    <span
                      className="block h-full rounded-full bg-linear-to-r from-accent to-accent-2"
                      style={{ width: row.width }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
