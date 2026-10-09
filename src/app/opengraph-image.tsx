import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const alt = "ICARO PROJECT — Tu reto. Nuestro camino.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#392b24",
        color: "#f7f3ed",
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
          color: "#d9b66f",
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
        <span>TU RETO.</span>
        <span>NUESTRO CAMINO.</span>
        <span style={{ color: "#d9b66f" }}>CONTIGO.</span>
      </div>
      <div style={{ display: "flex", fontSize: 18, letterSpacing: 3 }}>
        TRIATLÓN · RUNNING · RESISTENCIA + FUERZA
      </div>
    </div>,
    size,
  );
}
