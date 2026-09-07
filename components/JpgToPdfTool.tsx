"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const add = (incoming: File[]) => {
    setErr(null);
    setFiles((f) => [
      ...f,
      ...incoming.filter((x) => /^image\//.test(x.type) || /\.(jpe?g|png)$/i.test(x.name)),
    ]);
  };

  const move = (i: number, d: -1 | 1) => {
    setFiles((f) => {
      const j = i + d;
      if (j < 0 || j >= f.length) return f;
      const next = [...f];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const remove = (i: number) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const run = async () => {
    if (files.length === 0) return setErr("Add at least one image.");
    setBusy(true);
    setErr(null);
    try {
      const { imagesToPdf } = await import("@/lib/pdf/jpgToPdf");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await imagesToPdf(files);
      downloadBlob(bytes, "images.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Dropzone
        accept="image/jpeg,image/png"
        onFiles={add}
        label="Drop images (JPG, PNG) or click to browse"
      />
      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between py-2 text-sm">
              <span className="truncate">{f.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="h-7 w-7 border border-line text-xs disabled:opacity-30"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === files.length - 1}
                  className="h-7 w-7 border border-line text-xs disabled:opacity-30"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(i)}
                  className="h-7 w-7 border border-line text-xs hover:border-accent hover:text-accent"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || files.length === 0}>
          {busy ? "Building…" : "Convert to PDF"}
        </Button>
      </div>
    </div>
  );
}
