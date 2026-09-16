"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";
import { SignatureCanvas } from "./SignatureCanvas";
import type { Placement } from "@/lib/pdf/signAndFill";

type Mode = "text" | "signature" | "none";

type Signature = { dataUrl: string; aspect: number };

const PREVIEW_MAX_WIDTH = 720;

export function SignAndFillTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState<Mode>("none");
  const [textValue, setTextValue] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [signature, setSignature] = useState<Signature | null>(null);
  const [showSigPad, setShowSigPad] = useState(false);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const renderPage = useCallback(async () => {
    if (!file) return;
    try {
      const { loadPdfjs } = await import("@/lib/pdf/pdfjs");
      const pdfjs = await loadPdfjs();
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: bytes }).promise;
      setTotalPages(doc.numPages);
      const page = await doc.getPage(pageIndex + 1);
      const viewport1 = page.getViewport({ scale: 1 });
      const scale = Math.min(PREVIEW_MAX_WIDTH / viewport1.width, 2);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
      setDisplaySize({ w: canvas.width, h: canvas.height });
      await doc.destroy();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to render page.");
    }
  }, [file, pageIndex]);

  useEffect(() => {
    if (file) renderPage();
  }, [file, pageIndex, renderPage]);

  const onDrop = (files: File[]) => {
    setErr(null);
    setPlacements([]);
    setPageIndex(0);
    setTotalPages(0);
    setFile(files[0] ?? null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "none") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const fx = px / rect.width;
    const fy = py / rect.height;

    if (mode === "text") {
      if (!textValue.trim()) {
        setErr("Type some text first.");
        return;
      }
      setErr(null);
      const newPlacement: Placement = {
        type: "text",
        pageIndex,
        fx,
        fy,
        text: textValue,
        fontSize,
      };
      setPlacements((prev) => [...prev, newPlacement]);
    } else if (mode === "signature") {
      if (!signature) {
        setErr("Draw a signature first.");
        setShowSigPad(true);
        return;
      }
      setErr(null);
      const targetW = 0.25;
      const targetH = targetW / signature.aspect * (rect.width / rect.height);
      const newPlacement: Placement = {
        type: "signature",
        pageIndex,
        fx,
        fy,
        fw: targetW,
        fh: targetH,
        dataUrl: signature.dataUrl,
      };
      setPlacements((prev) => [...prev, newPlacement]);
    }
  };

  const removePlacement = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlacements((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSigSave = (dataUrl: string, w: number, h: number) => {
    setSignature({ dataUrl, aspect: w / h });
    setShowSigPad(false);
    setMode("signature");
  };

  const run = async () => {
    if (!file) return setErr("Add a PDF.");
    if (placements.length === 0) return setErr("Add at least one signature or text.");
    setBusy(true);
    setErr(null);
    try {
      const { applyPlacements } = await import("@/lib/pdf/signAndFill");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await applyPlacements(file, placements);
      downloadBlob(bytes, "signed.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to save PDF.");
    } finally {
      setBusy(false);
    }
  };

  const currentPagePlacements = placements
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.pageIndex === pageIndex);

  return (
    <div>
      <Dropzone
        multiple={false}
        onFiles={onDrop}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />

      {file && (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-line pb-3">
            <button
              onClick={() => setMode(mode === "text" ? "none" : "text")}
              className={`h-9 border px-3 text-sm ${
                mode === "text" ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
              }`}
            >
              Text
            </button>
            <button
              onClick={() => {
                if (!signature) {
                  setShowSigPad(true);
                  setMode("signature");
                } else {
                  setMode(mode === "signature" ? "none" : "signature");
                }
              }}
              className={`h-9 border px-3 text-sm ${
                mode === "signature" ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
              }`}
            >
              Signature
            </button>
            {signature && (
              <button
                onClick={() => setShowSigPad(true)}
                className="h-9 border border-line px-3 text-sm hover:border-ink"
              >
                Redraw
              </button>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-subink">
              <button
                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                disabled={pageIndex === 0}
                className="h-9 border border-line px-3 disabled:opacity-40"
              >
                ‹
              </button>
              <span className="tabular">
                {pageIndex + 1} / {totalPages || "…"}
              </span>
              <button
                onClick={() => setPageIndex((i) => Math.min(totalPages - 1, i + 1))}
                disabled={pageIndex >= totalPages - 1}
                className="h-9 border border-line px-3 disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>

          {mode === "text" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Type text, then click on the page to place it"
                className="h-9 flex-1 min-w-[200px] border border-line px-2 text-sm outline-none focus:border-ink"
              />
              <input
                type="number"
                min={6}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value || "16", 10))}
                className="h-9 w-20 border border-line px-2 text-sm outline-none focus:border-ink"
                title="Font size"
              />
            </div>
          )}

          {showSigPad && (
            <div className="mt-3">
              <SignatureCanvas onSave={onSigSave} onCancel={() => setShowSigPad(false)} />
            </div>
          )}

          <div
            ref={wrapRef}
            onClick={handleCanvasClick}
            className={`relative mx-auto mt-4 max-w-full overflow-hidden rounded-card border border-line bg-white shadow-card ${
              mode !== "none" ? "cursor-crosshair" : ""
            }`}
            style={{ width: displaySize.w || undefined }}
          >
            <canvas ref={canvasRef} className="block max-w-full" />
            {displaySize.w > 0 &&
              currentPagePlacements.map(({ p, i }) => {
                const left = p.fx * displaySize.w;
                const top = p.fy * displaySize.h;
                if (p.type === "text") {
                  return (
                    <div
                      key={i}
                      className="absolute select-none"
                      style={{
                        left,
                        top,
                        fontSize: p.fontSize,
                        color: "#111",
                        fontFamily: "Helvetica, Arial, sans-serif",
                      }}
                    >
                      {p.text}
                      <button
                        onClick={(e) => removePlacement(i, e)}
                        className="ml-1 rounded-full border border-line bg-white px-1 text-[10px] text-muted hover:text-accent"
                        style={{ fontSize: 10, lineHeight: 1 }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  );
                }
                const w = p.fw * displaySize.w;
                const h = p.fh * displaySize.h;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left, top, width: w, height: h }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.dataUrl}
                      alt="Signature"
                      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
                    />
                    <button
                      onClick={(e) => removePlacement(i, e)}
                      className="absolute -right-2 -top-2 h-5 w-5 rounded-full border border-line bg-white text-xs text-muted hover:text-accent"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
          </div>

          {mode !== "none" && (
            <p className="mt-2 text-xs text-muted">
              Click on the page to place {mode === "text" ? "the text" : "your signature"}.
            </p>
          )}

          {err && <p className="mt-3 text-sm text-accent">{err}</p>}

          <div className="mt-4 flex items-center gap-3">
            <Button onClick={run} disabled={busy || placements.length === 0}>
              {busy ? "Saving…" : `Save PDF (${placements.length})`}
            </Button>
            {placements.length > 0 && (
              <button
                onClick={() => setPlacements([])}
                className="text-sm text-muted hover:text-ink"
              >
                Clear all
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
