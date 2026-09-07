import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/content/tools";
import { TOOLS } from "@/content/tools";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { ToolIcon } from "./ToolIcon";
import { TrackRecentTool } from "./TrackRecentTool";
import {
  breadcrumbLd,
  faqLd,
  howToLd,
  softwareApplicationLd,
} from "@/lib/seo/jsonld";

export function ToolLayout({
  tool,
  children,
  breadcrumb = [],
}: {
  tool: Tool;
  children: ReactNode;
  breadcrumb?: Array<{ name: string; path: string }>;
}) {
  const crumbs = breadcrumb.length
    ? breadcrumb
    : [
        { name: "pdftools", path: "/" },
        { name: tool.name, path: `/${tool.slug}` },
      ];
  const related = tool.related
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));

  return (
    <article>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={softwareApplicationLd(tool)} />
      <JsonLd data={howToLd(`How to ${tool.name.toLowerCase()}`, tool.steps)} />
      <JsonLd data={faqLd(tool.faq)} />
      <TrackRecentTool slug={tool.slug} />

      <Breadcrumbs items={crumbs} />

      <header className="mt-6 mb-8 flex items-start gap-4">
        <div className="rounded-card border border-line bg-surface p-3">
          <ToolIcon slug={tool.slug} className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter2 text-ink">{tool.h1}</h1>
          <p className="mt-2 max-w-prose text-base text-subink">{tool.intro}</p>
        </div>
      </header>

      <section aria-label="Tool" className="mb-14 rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        {children}
      </section>

      <div className="grid gap-10 md:grid-cols-2">
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            How it works
          </h2>
          <ol className="space-y-4">
            {tool.steps.map((s, i) => (
              <li key={s.name} className="flex gap-3">
                <span className="tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-xs text-subink">
                  {i + 1}
                </span>
                <div className="text-sm text-subink">
                  <span className="font-medium text-ink">{s.name}. </span>
                  {s.text}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="why-heading">
          <h2 id="why-heading" className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Why use this
          </h2>
          <ul className="space-y-3 text-sm text-subink">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
              <span>
                <span className="font-medium text-ink">Private.</span> Files never leave your browser.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
              <span>
                <span className="font-medium text-ink">Free.</span> No signup, no watermark, no limits.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
              <span>
                <span className="font-medium text-ink">Fast.</span> One page, one action, one download.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <Faq items={tool.faq} />

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-14">
          <h2 id="related-heading" className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Related tools
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-card border border-line bg-white p-4 no-underline transition-all duration-150 ease-soft hover:border-line-strong hover:bg-surface"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">{r.name}</span>
                    <span className="block text-xs text-muted">{r.shortDescription}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted transition-transform duration-150 ease-soft group-hover:translate-x-0.5 group-hover:text-ink"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-14 text-xs text-muted">
        Last updated {new Date().toISOString().slice(0, 10)}.
      </p>
    </article>
  );
}
