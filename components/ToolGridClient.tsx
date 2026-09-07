"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import { ToolIcon } from "./ToolIcon";
import { CATEGORY_LABELS, type Tool, type ToolCategory } from "@/content/tools";

const RECENT_KEY = "pdftools:recent";
const MAX_RECENT = 4;

const ORDER: ToolCategory[] = ["operations", "conversion", "other"];

export function ToolGridClient({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState("");
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecentSlugs(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.shortDescription.toLowerCase().includes(term) ||
        t.keywords.some((k) => k.toLowerCase().includes(term)),
    );
  }, [q, tools]);

  const recentTools = useMemo(
    () =>
      recentSlugs
        .map((s) => tools.find((t) => t.slug === s))
        .filter((t): t is Tool => Boolean(t))
        .slice(0, MAX_RECENT),
    [recentSlugs, tools],
  );

  return (
    <div>
      <div className="mb-8 flex items-center gap-2 rounded-card border border-line bg-white px-3 shadow-card focus-within:border-line-strong">
        <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools - merge, split, compress…"
          aria-label="Search PDF tools"
          className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-xs text-muted hover:text-ink"
            aria-label="Clear search"
          >
            clear
          </button>
        )}
      </div>

      {mounted && recentTools.length > 0 && !q && (
        <section aria-labelledby="recent-heading" className="mb-10">
          <h2
            id="recent-heading"
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted"
          >
            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} /> Recently used
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recentTools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="group flex items-center gap-3 rounded-card border border-line bg-white p-3 no-underline transition-all duration-150 ease-soft hover:border-line-strong hover:bg-surface"
                >
                  <div className="rounded border border-line bg-surface p-1.5 text-ink group-hover:border-ink">
                    <ToolIcon slug={t.slug} className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate text-sm text-ink">{t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {ORDER.map((cat) => {
        const items = filtered.filter((t) => t.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} aria-labelledby={`cat-${cat}`} className="mb-12">
            <h2
              id={`cat-${cat}`}
              className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted"
            >
              {CATEGORY_LABELS[cat]}
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="group relative flex h-full flex-col justify-between rounded-card border border-line bg-white p-4 no-underline shadow-card transition-all duration-150 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded border border-line bg-surface p-2 text-ink transition-colors group-hover:border-ink group-hover:bg-white">
                        <ToolIcon slug={t.slug} className="h-4 w-4" />
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-transform duration-150 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="mt-6">
                      <div className="text-base font-medium text-ink">{t.name}</div>
                      <div className="mt-1 text-sm text-subink">{t.shortDescription}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {q && filtered.length === 0 && (
        <div className="rounded-card border border-line bg-surface p-8 text-center text-sm text-subink">
          No tools match <span className="font-medium text-ink">"{q}"</span>.
        </div>
      )}
    </div>
  );
}
