import { OG_SIZE, OG_TYPE, toolOgImage } from "@/lib/seo/og";

export const runtime = "edge";
export const alt = "Reorder pages - pdftools";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OGImage() {
  return toolOgImage("Reorder pages", "Rearrange PDF pages - in your browser.");
}
