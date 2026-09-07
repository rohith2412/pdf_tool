import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { ToolIcon } from "./ToolIcon";
import { TrackRecentTool } from "./TrackRecentTool";
import { TOOL_COMPONENTS } from "./toolComponents";
import type { HowToPageMeta, Tool } from "@/content/tools";
import { TOOLS, getTool } from "@/content/tools";
import {
  articleLd,
  breadcrumbLd,
  faqLd,
  howToLd,
  softwareApplicationLd,
} from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/meta";

export function HowToPage({ page }: { page: HowToPageMeta }) {
  const tool = getTool(page.toolSlug);
  if (!tool) return null;
  const Tool = TOOL_COMPONENTS[tool.slug];

  const crumbs = [
    { name: "pdftools", path: "/" },
    { name: tool.name, path: `/${tool.slug}` },
    { name: page.h1, path: `/${page.slug}` },
  ];
  const url = `${SITE_URL}/${page.slug}`;

  const related = tool.related
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter((t): t is Tool => Boolean(t));

  return (
    <article>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={softwareApplicationLd(tool)} />
      <JsonLd data={howToLd(page.h1, tool.steps)} />
      <JsonLd data={faqLd(tool.faq)} />
      <JsonLd
        data={articleLd({
          headline: page.h1,
          description: page.description,
          url,
        })}
      />
      <TrackRecentTool slug={tool.slug} />

      <Breadcrumbs items={crumbs} />

      <header className="mt-6 mb-8 flex items-start gap-4">
        <div className="rounded-card border border-line bg-surface p-3">
          <ToolIcon slug={tool.slug} className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter2 text-ink">
            {page.h1}
          </h1>
          <p className="mt-2 max-w-prose text-base text-subink">{page.lede}</p>
        </div>
      </header>

      {Tool && (
        <section
          aria-label="Tool"
          className="mb-14 rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
        >
          <Tool />
        </section>
      )}

      <section className="max-w-prose">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Step-by-step
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

      {page.extraSections?.length ? (
        <div className="mt-12 max-w-prose space-y-8">
          {page.extraSections.map((s) => (
            <section key={s.h2}>
              <h2 className="text-lg font-medium text-ink">{s.h2}</h2>
              <p className="mt-2 text-sm text-subink">{s.body}</p>
            </section>
          ))}
        </div>
      ) : null}

      <Faq items={tool.faq} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            More PDF tools
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-card border border-line bg-white p-4 no-underline transition-all duration-150 ease-soft hover:border-line-strong hover:bg-surface"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {r.name}
                    </span>
                    <span className="block text-xs text-muted">
                      {r.shortDescription}
                    </span>
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
