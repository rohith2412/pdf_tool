"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

type Q = "screen" | "print" | "hi";
const SCALES: Record<Q, number> = { screen: 1.5, print: 2.5, hi: 3.5 };

export function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<Q>("print");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [results, setResults] = useState<Array<{ page: number; url: string; blob: Blob }>>([]);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    for (const r of results) URL.revokeObjectURL(r.url);
    setResults([]);
    try {
      const { pdfToImages } = await import("@/lib/pdf/pdfToJpg");
      const imgs = await pdfToImages(file, {
        scale: SCALES[quality],
        format: "image/jpeg",
        quality: 0.9,
      });
      setResults(
        imgs.map((i) => ({ page: i.page, url: URL.createObjectURL(i.blob), blob: i.blob })),
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = (page: number, blob: Blob) => {
    const a = document.createElement("a");
    const u = URL.createObjectURL(blob);
    a.href = u;
    a.download = `page-${page}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  };

  const downloadAll = () => {
    for (const r of results) download(r.page, r.blob);
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onFiles={(files) => {
          setErr(null);
          setFile(files[0] ?? null);
        }}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />
      <div className="mt-4">
        <label className="mb-1 block text-sm text-subink">Quality</label>
        <div className="flex gap-2">
          {(["screen", "print", "hi"] as Q[]).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`h-9 flex-1 border text-sm ${
                quality === q ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
              }`}
            >
              {q === "hi" ? "High-res" : q === "print" ? "Print" : "Screen"}
            </button>
          ))}
        </div>
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4 flex gap-3">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Rendering…" : "Convert"}
        </Button>
        {results.length > 0 && (
          <Button variant="ghost" onClick={downloadAll}>
            Download all ({results.length})
          </Button>
        )}
      </div>
      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {results.map((r) => (
            <button
              key={r.page}
              onClick={() => download(r.page, r.blob)}
              className="group block border border-line p-2 text-left hover:border-ink"
              title="Click to download"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.url} alt={`Page ${r.page}`} className="w-full" />
              <div className="mt-1 text-xs text-muted group-hover:text-ink">
                Page {r.page} - download
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
