"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    if (!ranges.trim()) return setErr("Enter pages like 1-3, 5, 8-10.");
    setBusy(true);
    setErr(null);
    try {
      const { splitPdf } = await import("@/lib/pdf/split");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await splitPdf(file, ranges);
      downloadBlob(bytes, "split.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Split failed.");
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
          setFile(files[0] ?? null);
        }}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />
      <div className="mt-4">
        <label className="mb-1 block text-sm text-subink" htmlFor="ranges">
          Pages to keep
        </label>
        <input
          id="ranges"
          type="text"
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          placeholder="e.g. 1-3, 5, 8-10"
          className="h-9 w-full border border-line px-2 text-sm outline-none focus:border-ink"
        />
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Working…" : "Split"}
        </Button>
      </div>
    </div>
  );
}
