import { PDFDocument, degrees } from "pdf-lib";
import { parseRanges } from "./ranges";

export async function rotatePdf(
  file: File,
  angle: 90 | 180 | 270,
  pagesInput: string,
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = doc.getPageCount();
  const pages =
    pagesInput.trim() === "" || pagesInput.trim().toLowerCase() === "all"
      ? Array.from({ length: total }, (_, i) => i + 1)
      : parseRanges(pagesInput, total);
  if (pages.length === 0) throw new Error("No matching pages selected.");
  for (const p of pages) {
    const page = doc.getPage(p - 1);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  }
  return doc.save();
}
