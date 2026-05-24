import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ffffff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#4f46e5",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            T
          </div>
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#171717" }}>
            {siteConfig.name}
          </span>
        </div>
        <p
          style={{
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#171717",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          Task management that keeps you moving
        </p>
        <p
          style={{
            fontSize: "26px",
            lineHeight: 1.4,
            color: "#525252",
            marginTop: "24px",
            maxWidth: "800px",
          }}
        >
          {siteConfig.shortDescription}
        </p>
      </div>
    ),
    { ...size },
  );
}
