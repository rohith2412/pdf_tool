import { PDFDocument } from "pdf-lib";

export async function reorderPages(file: File, order: number[]): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, order.map((p) => p - 1));
  for (const p of copied) out.addPage(p);
  return out.save();
}
