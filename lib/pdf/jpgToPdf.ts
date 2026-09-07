import { PDFDocument } from "pdf-lib";

export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = file.type.toLowerCase();
    let img;
    if (type.includes("png") || file.name.toLowerCase().endsWith(".png")) {
      img = await doc.embedPng(bytes);
    } else {
      img = await doc.embedJpg(bytes);
    }
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  return doc.save();
}
