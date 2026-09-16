"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type Placement =
  | {
      type: "text";
      pageIndex: number;
      fx: number;
      fy: number;
      text: string;
      fontSize: number;
    }
  | {
      type: "signature";
      pageIndex: number;
      fx: number;
      fy: number;
      fw: number;
      fh: number;
      dataUrl: string;
    };

async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

export async function applyPlacements(
  file: File,
  placements: Placement[],
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();

  const sigCache = new Map<string, Awaited<ReturnType<typeof doc.embedPng>>>();

  for (const p of placements) {
    const page = pages[p.pageIndex];
    if (!page) continue;
    const { width, height } = page.getSize();

    if (p.type === "text") {
      const size = p.fontSize;
      const x = p.fx * width;
      const y = height - p.fy * height - size;
      page.drawText(p.text, { x, y, size, font, color: rgb(0.067, 0.067, 0.067) });
    } else {
      let img = sigCache.get(p.dataUrl);
      if (!img) {
        const imgBytes = await dataUrlToBytes(p.dataUrl);
        img = await doc.embedPng(imgBytes);
        sigCache.set(p.dataUrl, img);
      }
      const w = p.fw * width;
      const h = p.fh * height;
      const x = p.fx * width;
      const y = height - p.fy * height - h;
      page.drawImage(img, { x, y, width: w, height: h });
    }
  }

  return doc.save();
}
