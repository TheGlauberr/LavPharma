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

const INK = "#131826";
const MUTED = "#5d6679";
const LINE = "#e4e8f0";
const DEEP = "#1E4FAA";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getResource(slug, locale);
  const fontDir = join(process.cwd(), "assets", "fonts");
  const [geistMedium, geistSemiBold, geistMono] = await Promise.all([
    readFile(join(fontDir, "Geist-Medium.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
    readFile(join(fontDir, "GeistMono-Medium.ttf")),
  ]);
  const titleSize = article.title.length > 90 ? 54 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "white",
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          padding: "64px 72px",
          fontFamily: "Geist",
          borderTop: `10px solid ${DEEP}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {article.countries.map((country) => (
            <div
              key={country}
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                color: "white",
                background: INK,
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 22,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {country}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            color: INK,
            fontWeight: 600,
            fontSize: titleSize,
            lineHeight: 1.06,
            letterSpacing: -2,
            background: "white",
            padding: "8px 0",
          }}
        >
          {article.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: INK, fontWeight: 600, fontSize: 30, letterSpacing: 1 }}>
            LAV PHARMA
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", color: MUTED, fontSize: 22 }}>
            lavpharma.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistMedium, style: "normal", weight: 500 },
        { name: "Geist", data: geistSemiBold, style: "normal", weight: 600 },
        { name: "Geist Mono", data: geistMono, style: "normal", weight: 500 },
      ],
    },
  );
}
