import { Suspense } from "react";

import { GitHubActivityContent } from "@/components/github/github-activity-content";
import { GitHubActivitySkeleton } from "@/components/github/github-activity-skeleton";
import { Section } from "@/components/ui/section";

export function GitHubActivity() {
  return (
    <Section
      id="github"
      eyebrow="Developer activity"
      title="What I'm building on GitHub"
      description="Live data from the GitHub API — repositories, languages, contributions and recent open-source activity. Refreshed hourly."
    >
      <Suspense fallback={<GitHubActivitySkeleton />}>
        <GitHubActivityContent />
      </Suspense>
    </Section>
  );
}
