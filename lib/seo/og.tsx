import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_TYPE = "image/png" as const;

export function toolOgImage(name: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0a0a",
              color: "#ffffff",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            pd
          </div>
          <div style={{ fontSize: 24, color: "#3f3f46" }}>pdftools</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              fontWeight: 600,
              color: "#0a0a0a",
              letterSpacing: -2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "#3f3f46",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            color: "#dc2626",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#dc2626",
            }}
          />
          Runs in your browser · no upload · no signup
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
