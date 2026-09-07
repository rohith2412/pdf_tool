"use client";

import { useState } from "react";
import type { NumberPlacement } from "@/lib/pdf/addPageNumbers";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

const PLACEMENTS: Array<{ v: NumberPlacement; label: string }> = [
  { v: "bottom-center", label: "Bottom center" },
  { v: "bottom-right", label: "Bottom right" },
  { v: "bottom-left", label: "Bottom left" },
  { v: "top-center", label: "Top center" },
  { v: "top-right", label: "Top right" },
  { v: "top-left", label: "Top left" },
];

export function AddPageNumbersTool() {
  const [file, setFile] = useState<File | null>(null);
  const [placement, setPlacement] = useState<NumberPlacement>("bottom-center");
  const [startAt, setStartAt] = useState(1);
  const [startFromPage, setStartFromPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    try {
      const { addPageNumbers } = await import("@/lib/pdf/addPageNumbers");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await addPageNumbers(file, { placement, startAt, startFromPage });
      downloadBlob(bytes, "numbered.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to add page numbers.");
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
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label className="mb-1 block text-sm text-subink">Placement</label>
          <div className="grid grid-cols-3 gap-2">
            {PLACEMENTS.map((p) => (
              <button
                key={p.v}
                onClick={() => setPlacement(p.v)}
                className={`h-9 border text-xs ${
                  placement === p.v ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-subink" htmlFor="start-at">
            Start number
          </label>
          <input
            id="start-at"
            type="number"
            min={0}
            value={startAt}
            onChange={(e) => setStartAt(parseInt(e.target.value || "1", 10))}
            className="h-9 w-full border border-line px-2 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-subink" htmlFor="start-page">
            Start on page
          </label>
          <input
            id="start-page"
            type="number"
            min={1}
            value={startFromPage}
            onChange={(e) => setStartFromPage(parseInt(e.target.value || "1", 10))}
            className="h-9 w-full border border-line px-2 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Working…" : "Add page numbers"}
        </Button>
      </div>
    </div>
  );
}
