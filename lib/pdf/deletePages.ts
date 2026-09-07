import { PDFDocument } from "pdf-lib";
import { parseRanges } from "./ranges";

export async function deletePages(file: File, pagesInput: string): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = doc.getPageCount();
  const toDelete = new Set(parseRanges(pagesInput, total));
  if (toDelete.size === 0) throw new Error("No matching pages selected.");
  if (toDelete.size === total) throw new Error("That would delete every page.");
  for (let i = total; i >= 1; i--) {
    if (toDelete.has(i)) doc.removePage(i - 1);
  }
  return doc.save();
}
