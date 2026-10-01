import type { LanguageShare } from "@/lib/github";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";

/* Categorical slots, validated as an adjacent sequence in both themes. */
const slotClass: Record<string, string> = {
  "1": "bg-[var(--series-1)]",
  "2": "bg-[var(--series-2)]",
  "3": "bg-[var(--series-3)]",
  "4": "bg-[var(--series-4)]",
  "5": "bg-[var(--series-5)]",
  other: "bg-[var(--series-other)]",
};

export function languageColorClass(slot: LanguageShare["slot"] | undefined) {
  return slotClass[String(slot ?? "other")];
}

const percent = (share: number) => `${Math.max(1, Math.round(share * 100))}%`;

/** Share of repositories by primary language, with a labelled legend. */
export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  if (languages.length === 0) {
    return <p className="text-sm text-fg-muted">No language data yet.</p>;
  }

  return (
    <div>
      <div aria-hidden="true" className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full">
        {languages.map((language) => (
          <span
            key={language.name}
            title={`${language.name}: ${pluralize(language.count, "repository", "repositories")} (${percent(language.share)})`}
            className={cn("h-full", languageColorClass(language.slot))}
            style={{ flexGrow: language.share, flexBasis: 0 }}
          />
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center gap-2 text-sm">
            <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-sm", languageColorClass(language.slot))} />
            <span className="truncate text-fg">{language.name}</span>
            <span className="ml-auto shrink-0 tabular-nums text-fg-subtle">{percent(language.share)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
