import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";
import { OG_SIZE, OgCard } from "@/lib/og";

export const alt = `${siteConfig.name} — ${siteConfig.headline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Portfolio"
        title={siteConfig.name}
        subtitle={siteConfig.role}
        chips={["Software Engineering", "AI / LLMs", "Full-Stack", "Developer Tools"]}
        footer={siteConfig.headline}
      />
    ),
    size,
  );
}
