"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function ExtractTextTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    setBusy(true);
    setErr(null);
    setText("");
    try {
      const { extractText } = await import("@/lib/pdf/extractText");
      const out = await extractText(file);
      setText(out);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Extraction failed.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = async () => {
    const { downloadBlob } = await import("@/lib/pdf/ranges");
    downloadBlob(new TextEncoder().encode(text), (file?.name ?? "text") + ".txt", "text/plain");
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onFiles={(files) => {
          setErr(null);
          setText("");
          setFile(files[0] ?? null);
        }}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      <div className="mt-4 flex gap-3">
        <Button onClick={run} disabled={busy || !file}>
          {busy ? "Extracting…" : "Extract text"}
        </Button>
        {text && (
          <>
            <Button variant="ghost" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="ghost" onClick={download}>
              Download .txt
            </Button>
          </>
        )}
      </div>
      {text && (
        <textarea
          value={text}
          readOnly
          className="mt-4 h-72 w-full border border-line p-3 font-mono text-xs"
        />
      )}
    </div>
  );
}
