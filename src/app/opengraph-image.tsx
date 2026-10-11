import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const alt = "ICARO PROJECT — Train with purpose.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#F5F2EC",
        color: "#262320",
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
          color: "#563115",
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
        <span>TRAIN WITH</span>
        <span>PURPOSE.</span>
        <span style={{ color: "#563115" }}>ICARO.</span>
      </div>
      <div style={{ display: "flex", fontSize: 18, letterSpacing: 3 }}>
        TRIATLÓN · RUNNING · RESISTENCIA + FUERZA
      </div>
    </div>,
    size,
  );
}
