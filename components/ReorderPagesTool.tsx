"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";

export function ReorderPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<Array<{ page: number; url: string }>>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      for (const t of thumbs) URL.revokeObjectURL(t.url);
    };
  }, [thumbs]);

  const load = async (f: File) => {
    setBusy(true);
    setErr(null);
    for (const t of thumbs) URL.revokeObjectURL(t.url);
    setThumbs([]);
    setOrder([]);
    try {
      const { pdfToImages } = await import("@/lib/pdf/pdfToJpg");
      const imgs = await pdfToImages(f, { scale: 0.6, format: "image/jpeg", quality: 0.7 });
      const t = imgs.map((i) => ({ page: i.page, url: URL.createObjectURL(i.blob) }));
      setThumbs(t);
      setOrder(t.map((x) => x.page));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not read PDF.");
    } finally {
      setBusy(false);
    }
  };

  const move = (i: number, d: -1 | 1) => {
    setOrder((o) => {
      const j = i + d;
      if (j < 0 || j >= o.length) return o;
      const next = [...o];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const save = async () => {
    if (!file || order.length === 0) return;
    setBusy(true);
    setErr(null);
    try {
      const { reorderPages } = await import("@/lib/pdf/reorderPages");
      const { downloadBlob } = await import("@/lib/pdf/ranges");
      const bytes = await reorderPages(file, order);
      downloadBlob(bytes, "reordered.pdf", "application/pdf");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not save PDF.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onFiles={(files) => {
          const f = files[0];
          if (!f) return;
          setFile(f);
          load(f);
        }}
        label={file ? file.name : "Drop PDF here or click to browse"}
      />
      {err && <p className="mt-3 text-sm text-accent">{err}</p>}
      {thumbs.length > 0 && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {order.map((page, i) => {
              const t = thumbs.find((x) => x.page === page)!;
              return (
                <div key={`${page}-${i}`} className="border border-line p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt={`Page ${page}`} className="w-full" />
                  <div className="mt-1 flex items-center justify-between text-xs text-muted">
                    <span>Page {page}</span>
                    <span className="flex gap-1">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        className="h-6 w-6 border border-line disabled:opacity-30"
                        aria-label="Move left"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === order.length - 1}
                        className="h-6 w-6 border border-line disabled:opacity-30"
                        aria-label="Move right"
                      >
                        →
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <Button onClick={save} disabled={busy}>
              {busy ? "Working…" : "Save reordered PDF"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
