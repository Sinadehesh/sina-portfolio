import { ImageResponse } from "next/og";
import { personal } from "@/lib/data";
import { ogFonts } from "@/lib/og-fonts";

// Rendered once at build time so the OG card ships as a plain PNG with the
// rest of the static export.
export const dynamic = "force-static";

export const alt = personal.headline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse 70% 60% at 30% 40%, #16191d 0%, #08090b 60%, #040506 100%)",
          padding: "72px 80px",
          color: "#f3f0ea",
          fontFamily: "Archivo",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#7d7a74",
          }}
        >
          <span>Milan · Europe · Remote</span>
          <span>{personal.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, background: "#ff5b1f", width: 180 }} />
          <div style={{ display: "flex", fontSize: 104, marginTop: 34, letterSpacing: -3, fontWeight: 800 }}>
            {personal.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 20, color: "#ff5b1f" }}>
            Consumer Psychology Consultant · Behavioral Product Builder
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#7d7a74",
          }}
        >
          Consumer psychology · Conversion · Behavioral AI products
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
