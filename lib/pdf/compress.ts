"use client";

import { PDFDocument } from "pdf-lib";
import { loadPdfjs } from "./pdfjs";

export type CompressLevel = "low" | "medium" | "high";

type Profile = { scale: number; quality: number };

const PROFILES: Record<CompressLevel, Profile> = {
  low: { scale: 1.5, quality: 0.85 },
  medium: { scale: 1.1, quality: 0.7 },
  high: { scale: 0.8, quality: 0.55 },
};

const TARGET_PROFILES: Profile[] = [
  { scale: 2.0, quality: 0.92 },
  { scale: 1.5, quality: 0.85 },
  { scale: 1.2, quality: 0.75 },
  { scale: 1.0, quality: 0.65 },
  { scale: 0.8, quality: 0.55 },
  { scale: 0.65, quality: 0.45 },
  { scale: 0.5, quality: 0.35 },
  { scale: 0.4, quality: 0.25 },
];

async function rasterize(file: File, profile: Profile): Promise<Uint8Array> {
  const pdfjs = await loadPdfjs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await pdfjs.getDocument({ data: bytes }).promise;
  const out = await PDFDocument.create();
  const { scale, quality } = profile;

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

export async function compressPdf(file: File, level: CompressLevel): Promise<Uint8Array> {
  return rasterize(file, PROFILES[level]);
}

export type TargetResult = {
  bytes: Uint8Array;
  achieved: boolean;
  attempts: number;
};

export type ProgressFn = (info: { attempt: number; total: number; lastSize: number | null }) => void;

export async function compressPdfToTargetSize(
  file: File,
  targetBytes: number,
  onProgress?: ProgressFn,
): Promise<TargetResult> {
  if (file.size <= targetBytes) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    return { bytes, achieved: true, attempts: 0 };
  }

  let best: Uint8Array | null = null;
  const total = TARGET_PROFILES.length;

  for (let i = 0; i < total; i++) {
    onProgress?.({ attempt: i + 1, total, lastSize: best ? best.byteLength : null });
    const attemptBytes = await rasterize(file, TARGET_PROFILES[i]);
    if (!best || attemptBytes.byteLength < best.byteLength) best = attemptBytes;
    if (attemptBytes.byteLength <= targetBytes) {
      return { bytes: attemptBytes, achieved: true, attempts: i + 1 };
    }
  }

  if (!best) throw new Error("Compression failed.");
  return { bytes: best, achieved: false, attempts: total };
}
