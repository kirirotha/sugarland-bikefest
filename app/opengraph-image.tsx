import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Sugar Land Bike Fest — Oct 24–25, 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoBuffer = readFileSync(
    join(process.cwd(), "public/images/Sugar Land Bike Fest Logo/Sugar Land Bike Fest - Full.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1e3528",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "60px 80px",
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          style={{ width: 420, height: 333, objectFit: "contain" }}
        />
        {/* Tagline */}
        <p
          style={{
            color: "#e8a230",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Oct 24–25, 2026 · Sugar Land, TX
        </p>
      </div>
    ),
    { ...size }
  );
}
