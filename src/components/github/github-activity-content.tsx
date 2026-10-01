import {
  CircleAlert,
  CircleDot,
  Eye,
  GitCommitHorizontal,
  GitFork,
  GitPullRequest,
  MessageSquare,
  Plus,
  Rocket,
  Star,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { ContributionGraph } from "@/components/github/contribution-graph";
import { LanguageBar, languageColorClass } from "@/components/github/language-bar";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";
import { formatDate, formatNumber } from "@/lib/format";
import { getGitHubActivity, type ActivityKind, type LanguageShare } from "@/lib/github";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV === "development";

const cardClass = "h-full rounded-2xl border border-border bg-bg-elevated/80 p-5 sm:p-6";

const activityIcons: Record<ActivityKind, LucideIcon> = {
  push: GitCommitHorizontal,
  pr: GitPullRequest,
  issue: CircleDot,
  create: Plus,
  release: Rocket,
  fork: GitFork,
  review: Eye,
  comment: MessageSquare,
};

export async function GitHubActivityContent() {
  const result = await getGitHubActivity(siteConfig.github.username);

  if (result.status === "unconfigured") return <NotConnected />;
  if (result.status === "error") return <Unavailable message={result.message} />;

  const { profile, repos, languages, activity, totalStars, calendar, calendarNote } = result;
  const slotByLanguage = new Map(languages.map((language) => [language.name, language.slot]));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Reveal className="lg:col-span-1">
        <div className={cn(cardClass, "flex flex-col")}>
          <div className="flex items-center gap-4">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name ?? profile.login}'s GitHub avatar`}
              width={56}
              height={56}
              className="size-14 rounded-full border border-border"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold text-fg">{profile.name ?? profile.login}</p>
              <p className="truncate font-mono text-sm text-fg-muted">@{profile.login}</p>
            </div>
          </div>
          {profile.bio ? <p className="mt-4 text-sm leading-relaxed text-fg-muted">{profile.bio}</p> : null}
          <dl className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface text-center">
            <Stat label="Repos" value={profile.publicRepos} />
            <Stat label="Stars" value={totalStars} />
            <Stat label="Followers" value={profile.followers} />
          </dl>
          <div className="mt-auto pt-5">
            <ButtonLink
              href={profile.htmlUrl}
              variant="secondary"
              size="sm"
              className="w-full"
              aria-label="View GitHub profile (opens in a new tab)"
            >
              <GitHubIcon className="size-4" />
              View profile
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-2" delay={0.05}>
        <div className={cardClass}>
          <CardHeader
            title="Contributions"
            meta={calendar ? `${formatNumber(calendar.total)} in the last year` : undefined}
          />
          <div className="mt-5">
            <ContributionGraph calendar={calendar} />
          </div>
          {!calendar ? <CalendarNote note={calendarNote} profileUrl={profile.htmlUrl} /> : null}
        </div>
      </Reveal>

      <div className="grid min-w-0 grid-cols-1 content-start gap-4 lg:col-span-2">
        <Reveal delay={0.05}>
          <div className={cardClass}>
            <CardHeader title="Repository highlights" />
            {repos.length > 0 ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {repos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-hover"
                    >
                      <span className="truncate font-mono text-sm font-medium text-fg group-hover:text-accent">
                        {repo.name}
                      </span>
                      <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                        {repo.description ?? "No description provided."}
                      </span>
                      <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-fg-subtle">
                        {repo.language ? (
                          <span className="flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className={cn("size-2 rounded-full", languageColorClass(slotByLanguage.get(repo.language)))}
                            />
                            {repo.language}
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1" aria-label={`${repo.stars} stars`}>
                          <Star className="size-3.5" aria-hidden="true" />
                          {formatNumber(repo.stars)}
                        </span>
                        <span className="flex items-center gap-1" aria-label={`${repo.forks} forks`}>
                          <GitFork className="size-3.5" aria-hidden="true" />
                          {formatNumber(repo.forks)}
                        </span>
                        <span>Updated {formatDate(repo.pushedAt)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-fg-muted">No public repositories yet.</p>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <LanguagesCard languages={languages} />
        </Reveal>
      </div>

      <Reveal className="lg:col-span-1" delay={0.15}>
        <div className={cardClass}>
          <CardHeader title="Recent open-source activity" />
          {activity.length > 0 ? (
            <ul className="mt-4 space-y-3.5">
              {activity.map((item) => {
                const Icon = activityIcons[item.kind];
                return (
                  <li key={item.id} className="flex gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted">
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="line-clamp-2 text-sm text-fg underline-offset-4 hover:underline"
                      >
                        {item.title}
                      </a>
                      <p className="mt-0.5 truncate text-xs text-fg-subtle">
                        <time dateTime={item.date}>{formatDate(item.date)}</time> · {item.repo}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-fg-muted">No public activity in the last 90 days.</p>
          )}
        </div>
      </Reveal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-2 py-3">
      <dt className="text-[11px] uppercase tracking-wider text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 font-semibold text-fg">{formatNumber(value)}</dd>
    </div>
  );
}

function CardHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="font-semibold text-fg">{title}</h3>
      {meta ? <p className="text-sm text-fg-muted">{meta}</p> : null}
    </div>
  );
}

function LanguagesCard({ languages }: { languages: LanguageShare[] }) {
  return (
    <div className={cardClass}>
      <CardHeader title="Languages" />
      <p className="mt-1 text-xs text-fg-subtle">Share of public repositories by primary language</p>
      <div className="mt-4">
        <LanguageBar languages={languages} />
      </div>
    </div>
  );
}

function CalendarNote({ note, profileUrl }: { note: "no-token" | "unavailable" | null; profileUrl: string }) {
  return (
    <p className="mt-4 text-sm text-fg-muted">
      {isDev && note === "no-token" ? (
        <>
          <span className="font-medium text-fg">Dev note:</span> add <code className="font-mono text-xs">GITHUB_TOKEN</code> to{" "}
          <code className="font-mono text-xs">.env.local</code> to show the live contribution graph.{" "}
        </>
      ) : (
        "The live contribution graph isn't available right now. "
      )}
      <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
        View contributions on GitHub
      </a>
    </p>
  );
}

function NotConnected() {
  return (
    <Reveal>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={cn(cardClass, "flex flex-col lg:col-span-1")}>
          <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface text-fg">
            <GitHubIcon className="size-6" />
          </span>
          <h3 className="mt-5 font-semibold text-fg">GitHub activity</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Repositories, languages, contributions and open-source activity will appear here once my GitHub profile is
            connected.
          </p>
          {isDev ? (
            <p className="mt-3 rounded-lg border border-dashed border-border-strong p-3 text-xs leading-relaxed text-fg-subtle">
              Dev note: set <code className="font-mono">GITHUB_USERNAME</code> in{" "}
              <code className="font-mono">src/data/site.ts</code> to load live data.
            </p>
          ) : null}
          <div className="mt-auto pt-5">
            <ButtonLink
              href={siteConfig.github.url}
              variant="secondary"
              size="sm"
              className="w-full"
              aria-label="Visit GitHub (opens in a new tab)"
            >
              <GitHubIcon className="size-4" />
              Visit GitHub
            </ButtonLink>
          </div>
        </div>
        <div className={cn(cardClass, "lg:col-span-2")}>
          <CardHeader title="Contributions" />
          <div className="mt-5">
            <ContributionGraph calendar={null} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Unavailable({ message }: { message: string }) {
  return (
    <Reveal>
      <div className={cn(cardClass, "flex flex-col items-start gap-4 sm:flex-row sm:items-center")}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-fg-muted">
          <CircleAlert className="size-5" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-fg">Couldn&apos;t load GitHub activity</h3>
          <p className="mt-1 text-sm text-fg-muted">{message}</p>
        </div>
        <ButtonLink
          href={siteConfig.github.url}
          variant="secondary"
          size="sm"
          aria-label="View GitHub profile (opens in a new tab)"
        >
          <GitHubIcon className="size-4" />
          View on GitHub
        </ButtonLink>
      </div>
    </Reveal>
  );
}
