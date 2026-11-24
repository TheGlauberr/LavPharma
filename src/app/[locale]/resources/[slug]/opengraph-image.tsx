import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getResource, getResourceParams } from "@/lib/resources/content";

export const alt = "LAV PHARMA regulatory guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getResourceParams();
}

const NAVY = "#1a1f2e";
const ACCENT = "#4A90D9";
const MUTED = "#9DBEFF";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getResource(slug, locale);
  const fontDir = join(process.cwd(), "assets", "fonts");
  const [fraunces, inter] = await Promise.all([
    readFile(join(fontDir, "Fraunces-SemiBold.ttf")),
    readFile(join(fontDir, "Inter-Medium.ttf")),
  ]);
  const titleSize = article.title.length > 90 ? 52 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {article.countries.map((country) => (
            <div
              key={country}
              style={{
                display: "flex",
                color: MUTED,
                border: `2px solid ${ACCENT}`,
                borderRadius: 999,
                padding: "8px 22px",
                fontSize: 26,
              }}
            >
              {country}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontFamily: "Fraunces",
            fontSize: titleSize,
            lineHeight: 1.12,
            letterSpacing: -1,
          }}
        >
          {article.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: "white", fontSize: 30, letterSpacing: 4 }}>
            LAV PHARMA
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 24 }}>lavpharma.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        { name: "Inter", data: inter, style: "normal", weight: 500 },
      ],
    },
  );
}
