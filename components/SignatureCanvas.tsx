"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onSave: (dataUrl: string, width: number, height: number) => void;
  onCancel?: () => void;
};

export function SignatureCanvas({ onSave, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = Math.round(rect.width * dpr);
    c.height = Math.round(rect.height * dpr);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0a0a0a";
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!dirty) setDirty(true);
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    setDirty(false);
  };

  const save = () => {
    const c = canvasRef.current;
    if (!c || !dirty) return;
    const bbox = trimTransparent(c);
    if (!bbox) return;
    const cropped = document.createElement("canvas");
    cropped.width = bbox.w;
    cropped.height = bbox.h;
    const ctx = cropped.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(c, bbox.x, bbox.y, bbox.w, bbox.h, 0, 0, bbox.w, bbox.h);
    const dataUrl = cropped.toDataURL("image/png");
    onSave(dataUrl, bbox.w, bbox.h);
  };

  return (
    <div className="rounded-card border border-brand-line bg-brand-tint p-3">
      <p className="mb-2 text-xs text-subink">Draw your signature below, then click Use.</p>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-32 w-full touch-none rounded border border-line bg-white"
      />
      <div className="mt-3 flex gap-2">
        <button
          onClick={save}
          disabled={!dirty}
          className="h-8 flex-1 border border-ink bg-ink px-3 text-xs text-white disabled:opacity-40"
        >
          Use signature
        </button>
        <button
          onClick={clear}
          className="h-8 border border-line px-3 text-xs hover:border-ink"
        >
          Clear
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="h-8 border border-line px-3 text-xs hover:border-ink"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function trimTransparent(canvas: HTMLCanvasElement): { x: number; y: number; w: number; h: number } | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height).data;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = img[(y * width + x) * 4 + 3];
      if (a > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  const pad = 4;
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const w = Math.min(width - x, maxX - minX + pad * 2);
  const h = Math.min(height - y, maxY - minY + pad * 2);
  return { x, y, w, h };
}
