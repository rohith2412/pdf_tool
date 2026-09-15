"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

type Level = "low" | "medium" | "high";

export function CompressTool({ targetBytes, targetLabel }: { targetBytes?: number; targetLabel?: string } = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<Level>("medium");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedInfo, setSavedInfo] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    setSavedInfo(null);
    setProgress(null);
    try {
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const before = file.size;

      if (targetBytes) {
        const { compressPdfToTargetSize } = await import("@/lib/pdf/compress");
        const result = await compressPdfToTargetSize(file, targetBytes, ({ attempt, total }) => {
          setProgress(`Trying pass ${attempt} of ${total}…`);
        });
        setProgress(null);
        const after = result.bytes.byteLength;
        const pct = Math.max(0, Math.round(((before - after) / before) * 100));
        const status = result.achieved
          ? `Hit target: ${formatSize(after)} (${pct}% smaller than ${formatSize(before)})`
          : `Best achievable: ${formatSize(after)} (${pct}% smaller). Target ${formatSize(targetBytes)} not reachable without losing content.`;
        setSavedInfo(status);
        downloadBlob(result.bytes, "compressed.pdf", "application/pdf");
      } else {
        const { compressPdf } = await import("@/lib/pdf/compress");
        const bytes = await compressPdf(file, level);
        const after = bytes.byteLength;
        const pct = Math.max(0, Math.round(((before - after) / before) * 100));
        setSavedInfo(`Original ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (${pct}% smaller)`);
        downloadBlob(bytes, "compressed.pdf", "application/pdf");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Compression failed.");
      setProgress(null);
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

      {targetBytes ? (
        <div className="mt-4 rounded-card border border-line bg-surface p-3 text-sm text-subink">
          Target size: <span className="font-medium text-ink">{targetLabel ?? formatSize(targetBytes)}</span>
          {file && (
            <span className="ml-2 text-muted">
              (current file: {formatSize(file.size)})
            </span>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <label className="mb-1 block text-sm text-subink">Compression</label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`h-9 flex-1 border text-sm capitalize transition-colors ${
                  level === l ? "border-brand bg-brand text-white" : "border-line hover:border-brand"
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
      )}

      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      {progress && <p className="mt-3 text-sm text-muted">{progress}</p>}
      {savedInfo && <p className="mt-3 text-sm text-subink">{savedInfo}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? (targetBytes ? "Working…" : "Compressing…") : targetBytes ? `Compress to ${targetLabel ?? formatSize(targetBytes)}` : "Compress"}
        </Button>
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
