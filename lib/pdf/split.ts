import { PDFDocument } from "pdf-lib";
import { parseRanges } from "./ranges";

export async function splitPdf(file: File, ranges: string): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = parseRanges(ranges, src.getPageCount());
  if (pages.length === 0) throw new Error("No matching pages selected.");
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pages.map((p) => p - 1));
  for (const p of copied) out.addPage(p);
  return out.save();
}
