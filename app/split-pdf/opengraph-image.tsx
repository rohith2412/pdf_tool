import { OG_SIZE, OG_TYPE, toolOgImage } from "@/lib/seo/og";

export const runtime = "edge";
export const alt = "Split PDF - pdftools";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OGImage() {
  return toolOgImage("Split PDF", "Extract pages or split by range - in your browser.");
}
