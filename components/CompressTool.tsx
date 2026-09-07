"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

type Level = "low" | "medium" | "high";

export function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<Level>("medium");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedInfo, setSavedInfo] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    setSavedInfo(null);
    try {
      const { compressPdf } = await import("@/lib/pdf/compress");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await compressPdf(file, level);
      const before = file.size;
      const after = bytes.byteLength;
      const pct = Math.max(0, Math.round(((before - after) / before) * 100));
      setSavedInfo(`Original ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (${pct}% smaller)`);
      downloadBlob(bytes, "compressed.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Compression failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onFiles={(files) => {
          setErr(null);
          setSavedInfo(null);
          setFile(files[0] ?? null);
        }}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />
      <div className="mt-4">
        <label className="mb-1 block text-sm text-subink">Compression</label>
        <div className="flex gap-2">
          {(["low", "medium", "high"] as Level[]).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`h-9 flex-1 border text-sm capitalize ${
                level === l ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          High compression rasterizes each page to a JPEG - smallest file, lower text sharpness.
        </p>
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      {savedInfo && <p className="mt-3 text-sm text-subink">{savedInfo}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Compressing…" : "Compress"}
        </Button>
      </div>
    </div>
  );
}
