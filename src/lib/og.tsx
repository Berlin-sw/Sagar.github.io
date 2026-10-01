/* Shared layout for generated Open Graph images (rendered by next/og, flexbox only). */

export const OG_SIZE = { width: 1200, height: 630 };

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5b7cfa"/><stop offset="1" stop-color="#22c3d8"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#g)"/><path d="M12 10.5 6.5 16l5.5 5.5M20 10.5l5.5 5.5-5.5 5.5M17.6 8.5l-3.2 15" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const LOGO_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(LOGO_SVG)}`;

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
  footer: string;
};

export function OgCard({ eyebrow, title, subtitle, chips, footer }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#08090c",
        backgroundImage:
          "radial-gradient(circle at 85% 0%, rgba(76,110,245,0.38), transparent 55%), radial-gradient(circle at 0% 100%, rgba(34,211,238,0.18), transparent 50%)",
        color: "#ececf1",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_DATA_URI} width={56} height={56} alt="" />
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1ac", letterSpacing: 4, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#81818d" }}>{footer}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 32, color: "#b4b4be", marginTop: 20, lineHeight: 1.35, maxWidth: 1000 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#c9c9d2",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
