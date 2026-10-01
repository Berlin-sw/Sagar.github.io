import "server-only";

/**
 * Server-only GitHub data layer. Responses are cached and revalidated hourly,
 * which keeps well inside the unauthenticated rate limit (60 requests/hour).
 *
 * Optional: set GITHUB_TOKEN in .env.local (a fine-grained token with no extra
 * permissions is enough) to enable the contribution graph and higher limits.
 * The token is only ever read on the server.
 */

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
};

export type RepoHighlight = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
};

export type LanguageShare = {
  name: string;
  count: number;
  share: number;
  /** 1-based categorical colour slot, or "other" for the folded tail. */
  slot: number | "other";
};

export type ActivityKind = "push" | "pr" | "issue" | "create" | "release" | "fork" | "review" | "comment";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  title: string;
  repo: string;
  url: string;
  date: string;
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number;
};

export type ContributionCalendar = {
  total: number;
  weeks: ContributionDay[][];
};

export type GitHubActivityResult =
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | {
      status: "ok";
      profile: GitHubProfile;
      repos: RepoHighlight[];
      languages: LanguageShare[];
      activity: ActivityItem[];
      totalStars: number;
      calendar: ContributionCalendar | null;
      calendarNote: "no-token" | "unavailable" | null;
    };

class GitHubRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nextjs-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: buildHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new GitHubRequestError(response.status, `GitHub API responded with ${response.status}`);
  }

  return (await response.json()) as T;
}

/* ----------------------------------------------------------------------------
 * Raw API shapes (only the fields we read)
 * -------------------------------------------------------------------------- */

type RawUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

type RawEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref_type?: string;
    ref?: string | null;
    pull_request?: { title?: string; html_url?: string; merged?: boolean; number?: number };
    issue?: { title?: string; html_url?: string; number?: number };
    release?: { name?: string | null; tag_name?: string; html_url?: string };
    forkee?: { html_url?: string };
    comment?: { html_url?: string };
    review?: { html_url?: string };
  };
};

/* ----------------------------------------------------------------------------
 * Transformations
 * -------------------------------------------------------------------------- */

const MAX_LANGUAGES = 5;

function summariseLanguages(repos: RawRepo[]): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const head = sorted.slice(0, MAX_LANGUAGES);
  const tail = sorted.slice(MAX_LANGUAGES);

  const shares: LanguageShare[] = head.map(([name, count], index) => ({
    name,
    count,
    share: count / total,
    slot: index + 1,
  }));

  if (tail.length > 0) {
    const count = tail.reduce((sum, [, n]) => sum + n, 0);
    shares.push({ name: "Other", count, share: count / total, slot: "other" });
  }

  return shares;
}

function toActivity(event: RawEvent): ActivityItem | null {
  const repo = event.repo.name;
  const repoUrl = `https://github.com/${repo}`;
  const base = { id: event.id, repo, date: event.created_at };
  const { payload } = event;

  switch (event.type) {
    case "PushEvent":
      return { ...base, kind: "push", title: "Pushed commits", url: repoUrl };
    case "PullRequestEvent": {
      const pr = payload.pull_request;
      const action =
        payload.action === "closed" && pr?.merged ? "Merged" : capitalise(payload.action ?? "Updated");
      return {
        ...base,
        kind: "pr",
        title: `${action} pull request${pr?.title ? `: ${pr.title}` : ""}`,
        url: pr?.html_url ?? repoUrl,
      };
    }
    case "IssuesEvent": {
      const issue = payload.issue;
      return {
        ...base,
        kind: "issue",
        title: `${capitalise(payload.action ?? "Updated")} issue${issue?.title ? `: ${issue.title}` : ""}`,
        url: issue?.html_url ?? repoUrl,
      };
    }
    case "PullRequestReviewEvent":
      return {
        ...base,
        kind: "review",
        title: `Reviewed a pull request${payload.pull_request?.title ? `: ${payload.pull_request.title}` : ""}`,
        url: payload.review?.html_url ?? payload.pull_request?.html_url ?? repoUrl,
      };
    case "IssueCommentEvent":
      return {
        ...base,
        kind: "comment",
        title: payload.issue?.title ? `Commented on: ${payload.issue.title}` : "Commented on an issue",
        url: payload.comment?.html_url ?? payload.issue?.html_url ?? repoUrl,
      };
    case "CreateEvent":
      if (payload.ref_type !== "repository") return null;
      return { ...base, kind: "create", title: "Created repository", url: repoUrl };
    case "ReleaseEvent":
      return {
        ...base,
        kind: "release",
        title: `Published release ${payload.release?.name || payload.release?.tag_name || ""}`.trim(),
        url: payload.release?.html_url ?? repoUrl,
      };
    case "ForkEvent":
      return { ...base, kind: "fork", title: "Forked repository", url: payload.forkee?.html_url ?? repoUrl };
    default:
      return null;
  }
}

/** Keeps the feed readable by collapsing consecutive pushes to the same repository. */
function summariseActivity(events: RawEvent[], limit: number): ActivityItem[] {
  const items: ActivityItem[] = [];
  for (const event of events) {
    const item = toActivity(event);
    if (!item) continue;
    const previous = items.at(-1);
    if (previous && previous.kind === "push" && item.kind === "push" && previous.repo === item.repo) continue;
    items.push(item);
    if (items.length >= limit) break;
  }
  return items;
}

function capitalise(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ----------------------------------------------------------------------------
 * Contribution calendar (GraphQL — requires a token)
 * -------------------------------------------------------------------------- */

const CONTRIBUTIONS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel weekday }
          }
        }
      }
    }
  }
`;

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type RawCalendarResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
              weekday: number;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: unknown[];
};

async function getContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  const response = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { ...buildHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login: username } }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) return null;

  const json = (await response.json()) as RawCalendarResponse;
  const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVELS[day.contributionLevel] ?? 0,
        weekday: day.weekday,
      })),
    ),
  };
}

/* ----------------------------------------------------------------------------
 * Public API
 * -------------------------------------------------------------------------- */

export async function getGitHubActivity(username: string): Promise<GitHubActivityResult> {
  if (!username) return { status: "unconfigured" };

  const login = encodeURIComponent(username);
  const hasToken = Boolean(process.env.GITHUB_TOKEN);

  try {
    const [user, repos, events, calendar] = await Promise.all([
      request<RawUser>(`/users/${login}`),
      request<RawRepo[]>(`/users/${login}/repos?per_page=100&sort=pushed&type=owner`),
      request<RawEvent[]>(`/users/${login}/events/public?per_page=50`).catch(() => [] as RawEvent[]),
      hasToken ? getContributionCalendar(username).catch(() => null) : Promise.resolve(null),
    ]);

    const ownRepos = repos.filter(
      (repo) => !repo.fork && !repo.archived && repo.name.toLowerCase() !== user.login.toLowerCase(),
    );

    const highlights = [...ownRepos]
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, 4)
      .map<RepoHighlight>((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        pushedAt: repo.pushed_at,
      }));

    return {
      status: "ok",
      profile: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        htmlUrl: user.html_url,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      repos: highlights,
      languages: summariseLanguages(ownRepos),
      activity: summariseActivity(events, 6),
      totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      calendar,
      calendarNote: calendar ? null : hasToken ? "unavailable" : "no-token",
    };
  } catch (error) {
    if (error instanceof GitHubRequestError) {
      if (error.status === 404) return { status: "error", message: "GitHub profile not found." };
      if (error.status === 403 || error.status === 429) {
        return { status: "error", message: "GitHub rate limit reached. Please check back later." };
      }
    }
    return { status: "error", message: "GitHub data is temporarily unavailable." };
  }
}
