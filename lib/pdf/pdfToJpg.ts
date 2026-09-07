"use client";

import { loadPdfjs } from "./pdfjs";

export type PageImage = { page: number; blob: Blob };

export async function pdfToImages(
  file: File,
  opts: { scale?: number; format?: "image/jpeg" | "image/png"; quality?: number } = {},
): Promise<PageImage[]> {
  const pdfjs = await loadPdfjs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const scale = opts.scale ?? 2;
  const format = opts.format ?? "image/jpeg";
  const quality = opts.quality ?? 0.85;
  const results: PageImage[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        format,
        quality,
      );
    });
    results.push({ page: p, blob });
  }
  await doc.destroy();
  return results;
}
