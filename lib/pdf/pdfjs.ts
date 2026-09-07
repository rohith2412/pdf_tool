"use client";

import type * as PdfjsNs from "pdfjs-dist";

let cached: typeof PdfjsNs | null = null;

export async function loadPdfjs(): Promise<typeof PdfjsNs> {
  if (cached) return cached;
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  cached = pdfjs;
  return pdfjs;
}
