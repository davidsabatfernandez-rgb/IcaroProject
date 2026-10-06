import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const alt = "ICARO PROJECT — Triatlón a tu medida.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#191b18",
        color: "#f3f2e9",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "65px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 5,
          color: "#c1d890",
        }}
      >
        {site.brandName}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 83,
          fontWeight: 700,
          lineHeight: 1.02,
        }}
      >
        <span>TRIATLÓN.</span>
        <span>A TU MEDIDA.</span>
        <span style={{ color: "#c1d890" }}>CONTIGO.</span>
      </div>
      <div style={{ display: "flex", fontSize: 18, letterSpacing: 3 }}>
        SWIM · BIKE · RUN
      </div>
    </div>,
    size,
  );
}
