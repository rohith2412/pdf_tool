import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type NumberPlacement =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right"
  | "top-left";

export async function addPageNumbers(
  file: File,
  opts: { placement: NumberPlacement; startAt: number; startFromPage: number; fontSize?: number },
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const size = opts.fontSize ?? 10;
  const margin = 24;
  const pages = doc.getPages();
  const total = pages.length;
  for (let i = 0; i < total; i++) {
    if (i + 1 < opts.startFromPage) continue;
    const page = pages[i];
    const { width, height } = page.getSize();
    const num = i + 1 - opts.startFromPage + opts.startAt;
    const text = `${num}`;
    const textWidth = font.widthOfTextAtSize(text, size);
    let x = margin;
    let y = margin;
    if (opts.placement.startsWith("top")) y = height - margin - size;
    if (opts.placement.endsWith("center")) x = (width - textWidth) / 2;
    if (opts.placement.endsWith("right")) x = width - margin - textWidth;
    page.drawText(text, { x, y, size, font, color: rgb(0.067, 0.067, 0.067) });
  }
  return doc.save();
}
