"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function DeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    if (!pages.trim()) return setErr("Enter pages to delete.");
    setBusy(true);
    setErr(null);
    try {
      const { deletePages } = await import("@/lib/pdf/deletePages");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await deletePages(file, pages);
      downloadBlob(bytes, "trimmed.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete pages.");
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
        <label className="mb-1 block text-sm text-subink" htmlFor="del-pages">
          Pages to remove
        </label>
        <input
          id="del-pages"
          type="text"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="e.g. 2, 4-6"
          className="h-9 w-full border border-line px-2 text-sm outline-none focus:border-ink"
        />
      </div>
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Working…" : "Delete pages"}
        </Button>
      </div>
    </div>
  );
}
