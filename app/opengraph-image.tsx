import { ImageResponse } from "next/og";
import { personal } from "@/lib/data";

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
            "radial-gradient(ellipse 70% 60% at 30% 40%, #17171b 0%, #0a0a0c 60%, #050506 100%)",
          padding: "72px 80px",
          color: "#ede4d3",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#8d867a",
          }}
        >
          <span>Portfolio</span>
          <span>{personal.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, background: "#c8a45c", width: 180 }} />
          <div style={{ display: "flex", fontSize: 104, marginTop: 34, letterSpacing: -2 }}>
            {personal.name}
          </div>
          <div style={{ display: "flex", fontSize: 42, marginTop: 20, color: "#c8a45c" }}>
            Engineering Behavior, Building Systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#8d867a",
          }}
        >
          Consultancy · App laboratory · Media & research
        </div>
      </div>
    ),
    size,
  );
}
