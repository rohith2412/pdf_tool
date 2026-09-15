import { OG_SIZE, OG_TYPE, toolOgImage } from "@/lib/seo/og";

export const runtime = "edge";
export const alt = "pdfeditorkit - private, in-browser PDF utilities";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OGImage() {
  return toolOgImage(
    "pdfeditorkit",
    "Merge, split, compress, and convert PDFs - all in your browser.",
  );
}
