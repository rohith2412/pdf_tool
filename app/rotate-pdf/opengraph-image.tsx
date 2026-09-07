import { OG_SIZE, OG_TYPE, toolOgImage } from "@/lib/seo/og";

export const runtime = "edge";
export const alt = "Rotate PDF - pdftools";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OGImage() {
  return toolOgImage("Rotate PDF", "Rotate pages 90°, 180°, or 270° - in your browser.");
}
