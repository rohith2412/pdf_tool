"use client";

import { PDFDocument } from "pdf-lib";
import { loadPdfjs } from "./pdfjs";

export type CompressLevel = "low" | "medium" | "high";

const PROFILES: Record<CompressLevel, { scale: number; quality: number }> = {
  low: { scale: 1.5, quality: 0.85 },
  medium: { scale: 1.1, quality: 0.7 },
  high: { scale: 0.8, quality: 0.55 },
};

export async function compressPdf(file: File, level: CompressLevel): Promise<Uint8Array> {
  const pdfjs = await loadPdfjs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await pdfjs.getDocument({ data: bytes }).promise;
  const out = await PDFDocument.create();
  const { scale, quality } = PROFILES[level];

  for (let p = 1; p <= src.numPages; p++) {
    const page = await src.getPage(p);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        "image/jpeg",
        quality,
      );
    });
    const imgBytes = new Uint8Array(await blob.arrayBuffer());
    const img = await out.embedJpg(imgBytes);
    const pageOut = out.addPage([img.width, img.height]);
    pageOut.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  await src.destroy();
  return out.save({ useObjectStreams: true });
}
