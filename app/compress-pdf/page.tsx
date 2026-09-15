import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompressTool } from "@/components/CompressTool";
import { ToolLayout } from "@/components/ToolLayout";
import { COMPRESS_VARIANTS } from "@/content/compressVariants";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("compress-pdf");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/compress-pdf", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("compress-pdf");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <CompressTool />
      <div className="mt-8 border-t border-line pt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Compress to a specific size
        </h3>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMPRESS_VARIANTS.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/${v.slug}`}
                className="block rounded-card border border-line bg-white p-3 text-sm no-underline transition-all duration-150 ease-soft hover:border-line-strong hover:bg-surface"
              >
                <span className="block font-medium text-ink">{v.tool.name}</span>
                <span className="block text-xs text-muted">Target: {v.targetLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ToolLayout>
  );
}
