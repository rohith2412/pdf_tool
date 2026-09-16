"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { loadPdfjs } from "./pdfjs";

export type FreePlacement =
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

export type DetectedField = {
  id: string;
  pageIndex: number;
  fieldName: string;
  kind: "text" | "signature";
  fx: number;
  fy: number;
  fw: number;
  fh: number;
  pageWidth: number;
  pageHeight: number;
};

export type FieldFill = {
  fieldId: string;
  fieldName: string;
  kind: "text" | "signature";
  value: string;
  signatureAspect?: number;
};

async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

const SIG_NAME_PATTERN = /sign|signature|initial/i;

export async function detectFields(file: File): Promise<DetectedField[]> {
  const pdfjs = await loadPdfjs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const out: DetectedField[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const pageWidth = viewport.width;
    const pageHeight = viewport.height;
    const annotations = await page.getAnnotations({ intent: "display" });

    for (const a of annotations as Array<Record<string, unknown>>) {
      if (a.subtype !== "Widget") continue;
      const rect = a.rect as [number, number, number, number] | undefined;
      if (!rect) continue;
      const fieldType = a.fieldType as string | undefined;
      const fieldName = (a.fieldName as string) ?? "";
      let kind: "text" | "signature" | null = null;
      if (fieldType === "Sig") kind = "signature";
      else if (fieldType === "Tx") kind = "text";
      else if (fieldType === "Btn") kind = null;
      else if (SIG_NAME_PATTERN.test(fieldName)) kind = "signature";
      if (!kind) continue;

      const [x1, y1, x2, y2] = rect;
      const left = Math.min(x1, x2);
      const right = Math.max(x1, x2);
      const bottom = Math.min(y1, y2);
      const top = Math.max(y1, y2);
      const fx = left / pageWidth;
      const fw = (right - left) / pageWidth;
      const fh = (top - bottom) / pageHeight;
      const fy = (pageHeight - top) / pageHeight;

      out.push({
        id: `${i - 1}:${fieldName || `unnamed_${out.length}`}`,
        pageIndex: i - 1,
        fieldName,
        kind,
        fx,
        fy,
        fw,
        fh,
        pageWidth,
        pageHeight,
      });
    }
  }
  await doc.destroy();
  return out;
}

export async function applyEdits(
  file: File,
  placements: FreePlacement[],
  fieldFills: FieldFill[],
  detected: DetectedField[],
): Promise<Uint8Array> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();

  const textFills = fieldFills.filter((f) => f.kind === "text" && f.value);
  if (textFills.length > 0) {
    try {
      const form = doc.getForm();
      for (const f of textFills) {
        try {
          const tf = form.getTextField(f.fieldName);
          tf.setText(f.value);
        } catch {
          const d = detected.find((x) => x.id === f.fieldId);
          if (d) {
            const page = pages[d.pageIndex];
            const { width, height } = page.getSize();
            const size = Math.min(d.fh * height * 0.7, 16);
            const x = d.fx * width + 2;
            const y = height - d.fy * height - d.fh * height + 2;
            page.drawText(f.value, { x, y, size, font, color: rgb(0.067, 0.067, 0.067) });
          }
        }
      }
      try {
        form.flatten();
      } catch {
        // some PDFs error on flatten; leave form filled but interactive
      }
    } catch {
      for (const f of textFills) {
        const d = detected.find((x) => x.id === f.fieldId);
        if (!d) continue;
        const page = pages[d.pageIndex];
        const { width, height } = page.getSize();
        const size = Math.min(d.fh * height * 0.7, 16);
        const x = d.fx * width + 2;
        const y = height - d.fy * height - d.fh * height + 2;
        page.drawText(f.value, { x, y, size, font, color: rgb(0.067, 0.067, 0.067) });
      }
    }
  }

  const sigCache = new Map<string, Awaited<ReturnType<typeof doc.embedPng>>>();

  const sigFills = fieldFills.filter((f) => f.kind === "signature" && f.value);
  for (const f of sigFills) {
    const d = detected.find((x) => x.id === f.fieldId);
    if (!d) continue;
    let img = sigCache.get(f.value);
    if (!img) {
      const imgBytes = await dataUrlToBytes(f.value);
      img = await doc.embedPng(imgBytes);
      sigCache.set(f.value, img);
    }
    const page = pages[d.pageIndex];
    const { width, height } = page.getSize();
    const boxW = d.fw * width;
    const boxH = d.fh * height;
    const aspect = f.signatureAspect ?? img.width / img.height;
    let w = boxW * 0.9;
    let h = w / aspect;
    if (h > boxH * 0.9) {
      h = boxH * 0.9;
      w = h * aspect;
    }
    const x = d.fx * width + (boxW - w) / 2;
    const y = height - d.fy * height - boxH + (boxH - h) / 2;
    page.drawImage(img, { x, y, width: w, height: h });
  }

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
