"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const addFiles = (incoming: File[]) => {
    setErr(null);
    setFiles((f) => [...f, ...incoming.filter((x) => x.type === "application/pdf" || x.name.toLowerCase().endsWith(".pdf"))]);
  };

  const move = (i: number, dir: -1 | 1) => {
    setFiles((f) => {
      const j = i + dir;
      if (j < 0 || j >= f.length) return f;
      const next = [...f];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const remove = (i: number) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const merge = async () => {
    if (files.length < 2) {
      setErr("Add at least two PDFs to merge.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const { mergePdfs } = await import("@/lib/pdf/merge");
      const bytes = await mergePdfs(files);
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error(e);
      setErr("Could not merge these PDFs. One of the files may be corrupted or encrypted.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Dropzone onFiles={addFiles} />
      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between py-2 text-sm">
              <div className="min-w-0 flex-1 truncate">
                <span className="text-ink">{f.name}</span>
                <span className="ml-2 text-muted">{fmtSize(f.size)}</span>
              </div>
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
      <div className="mt-4 flex items-center gap-3">
        <Button onClick={merge} disabled={busy || files.length < 2}>
          {busy ? "Merging…" : `Merge ${files.length || ""}`.trim()}
        </Button>
        {files.length > 0 && (
          <button
            onClick={() => setFiles([])}
            className="text-sm text-muted underline underline-offset-2"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
