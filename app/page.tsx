import Link from "next/link";
import type { Metadata } from "next";
import { Lock, Zap } from "lucide-react";
import { HomeAuthLink } from "@/components/HomeAuthLink";
import { JsonLd } from "@/components/JsonLd";
import { ToolGridClient } from "@/components/ToolGridClient";
import { VisitorCount } from "@/components/VisitorCount";
import { TOOLS } from "@/content/tools";
import { itemListLd, websiteLd } from "@/lib/seo/jsonld";
import { buildMetadata, SITE_URL } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "pdftools - private, in-browser PDF utilities",
  description:
    "Merge, split, compress, rotate, and convert PDFs - all in your browser. No uploads. No signup. No watermark.",
  path: "/",
  keywords: [
    "pdf tools",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "pdf to jpg",
    "in-browser pdf",
    "pdf without upload",
  ],
});

export default function HomePage() {
  return (
    <div>
      <JsonLd data={websiteLd()} />
      <JsonLd
        data={itemListLd(
          TOOLS.map((t) => ({ name: t.name, url: `${SITE_URL}/${t.slug}` })),
        )}
      />

      <section
        aria-label="Intro"
        className="relative -mx-4 mb-10 border-b border-line bg-grid px-4 py-10 sm:-mx-6 sm:px-6"
      >
        <div className="mx-auto max-w-page">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs text-subink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Runs in your browser - no upload
          </p>
          <h1 className="text-2xl font-semibold tracking-tighter2 text-ink sm:text-3xl">
            A small collection of PDF utilities.
          </h1>
          <p className="mt-3 max-w-xl text-base text-subink">
            Merge, split, compress, and convert PDFs - every operation happens
            on your device. Free, no signup, no watermark.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} /> Private by design
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" strokeWidth={1.5} /> Fast, no server round-trip
            </span>
          </div>
        </div>
      </section>

      <ToolGridClient tools={TOOLS} />

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-sm">
        <VisitorCount />
        <HomeAuthLink />
      </div>
    </div>
  );
}
