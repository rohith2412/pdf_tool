import { OG_SIZE, OG_TYPE, toolOgImage } from "@/lib/seo/og";

export const runtime = "edge";
export const alt = "PDF to JPG - pdftools";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OGImage() {
  return toolOgImage("PDF to JPG", "Turn PDF pages into JPG images - in your browser.");
}
