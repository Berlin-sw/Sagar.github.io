import type { ContributionCalendar, ContributionDay } from "@/lib/github";
import { formatDate, formatMonth, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const levelClass = [
  "bg-[var(--heat-0)]",
  "bg-[var(--heat-1)]",
  "bg-[var(--heat-2)]",
  "bg-[var(--heat-3)]",
  "bg-[var(--heat-4)]",
] as const;

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const PLACEHOLDER_WEEKS = 53;

type Slot = ContributionDay | null;

function toColumns(calendar: ContributionCalendar): Slot[][] {
  return calendar.weeks.map((week) => {
    const slots: Slot[] = Array.from({ length: 7 }, () => null);
    for (const day of week) slots[day.weekday] = day;
    return slots;
  });
}

function monthLabels(columns: Slot[][]) {
  const labels: (string | null)[] = columns.map(() => null);
  let previousMonth = "";
  let lastLabelIndex = -10;

  columns.forEach((column, index) => {
    const firstDay = column.find((slot): slot is ContributionDay => slot !== null);
    if (!firstDay) return;
    const month = firstDay.date.slice(0, 7);
    if (month !== previousMonth) {
      previousMonth = month;
      if (index - lastLabelIndex >= 3) {
        labels[index] = formatMonth(firstDay.date);
        lastLabelIndex = index;
      }
    }
  });

  return labels;
}

function monthlyTotals(calendar: ContributionCalendar) {
  const totals = new Map<string, { label: string; count: number }>();
  for (const week of calendar.weeks) {
    for (const day of week) {
      const key = day.date.slice(0, 7);
      const entry = totals.get(key) ?? {
        label: `${formatMonth(day.date)} ${day.date.slice(0, 4)}`,
        count: 0,
      };
      entry.count += day.count;
      totals.set(key, entry);
    }
  }
  return [...totals.values()];
}

/**
 * Contribution heatmap. Single-hue sequential scale; per-day values are in each
 * cell's tooltip and monthly totals are available to assistive tech as a table.
 */
export function ContributionGraph({ calendar }: { calendar: ContributionCalendar | null }) {
  const columns = calendar
    ? toColumns(calendar)
    : Array.from({ length: PLACEHOLDER_WEEKS }, () => Array.from({ length: 7 }, () => null as Slot));
  const labels = calendar ? monthLabels(columns) : columns.map(() => null);
  const gridTemplate = { gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` };

  return (
    <div>
      {/* RTL scroller so narrow screens start at the most recent weeks. */}
      <div className="scrollbar-thin overflow-x-auto pb-2 [direction:rtl]">
        <div className="flex min-w-[640px] gap-2 [direction:ltr]">
          <div aria-hidden="true" className="grid w-7 shrink-0 grid-rows-[auto_repeat(7,minmax(0,1fr))] gap-[3px] text-[10px] text-fg-subtle">
            <span className="h-4" />
            {WEEKDAY_LABELS.map((label, index) => (
              <span key={index} className="flex items-center leading-none">
                {label}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <div aria-hidden="true" className="mb-[3px] grid h-4 gap-x-[3px] text-[10px] text-fg-subtle" style={gridTemplate}>
              {labels.map((label, index) => (
                <span key={index} className="whitespace-nowrap leading-none">
                  {label}
                </span>
              ))}
            </div>
            <div
              role="img"
              aria-label={
                calendar
                  ? `${formatNumber(calendar.total)} contributions in the last year`
                  : "Contribution graph placeholder"
              }
              className="grid grid-flow-col grid-rows-7 gap-[3px]"
              style={gridTemplate}
            >
              {columns.flatMap((column, columnIndex) =>
                column.map((slot, dayIndex) => (
                  <span
                    key={`${columnIndex}-${dayIndex}`}
                    title={
                      slot
                        ? `${slot.count === 0 ? "No" : formatNumber(slot.count)} contribution${slot.count === 1 ? "" : "s"} on ${formatDate(slot.date)}`
                        : undefined
                    }
                    className={cn(
                      "aspect-square rounded-[2px]",
                      slot ? levelClass[slot.level] : calendar ? "bg-transparent" : levelClass[0],
                    )}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-fg-subtle">
        <span>Less</span>
        {levelClass.map((className) => (
          <span key={className} className={cn("size-2.5 rounded-[2px]", className)} />
        ))}
        <span>More</span>
      </div>

      {calendar ? (
        <table className="sr-only">
          <caption>Monthly contribution totals</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {monthlyTotals(calendar).map((month) => (
              <tr key={month.label}>
                <th scope="row">{month.label}</th>
                <td>{formatNumber(month.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
