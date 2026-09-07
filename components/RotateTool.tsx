"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function RotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [pages, setPages] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    try {
      const { rotatePdf } = await import("@/lib/pdf/rotate");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await rotatePdf(file, angle, pages);
      downloadBlob(bytes, "rotated.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Rotate failed.");
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
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-subink">Angle</label>
          <div className="flex gap-2">
            {[90, 180, 270].map((a) => (
              <button
                key={a}
                onClick={() => setAngle(a as 90 | 180 | 270)}
                className={`h-9 flex-1 border text-sm ${
                  angle === a ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                }`}
              >
                {a}°
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-subink" htmlFor="rotate-pages">
            Pages (blank = all)
          </label>
          <input
            id="rotate-pages"
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="e.g. 1, 3-5"
            className="h-9 w-full border border-line px-2 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Working…" : "Rotate"}
        </Button>
      </div>
    </div>
  );
}
