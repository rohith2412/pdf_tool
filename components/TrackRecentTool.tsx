"use client";

import { useEffect } from "react";

const KEY = "pdftools:recent";
const MAX = 6;

export function TrackRecentTool({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = [slug, ...list.filter((s) => s !== slug)].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, [slug]);
  return null;
}
