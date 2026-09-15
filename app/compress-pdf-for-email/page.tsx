import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompressTool } from "@/components/CompressTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getCompressVariant } from "@/content/compressVariants";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const SLUG = "compress-pdf-for-email";
const variant = getCompressVariant(SLUG);

export const metadata: Metadata = variant
  ? buildMetadata({
      title: variant.tool.title,
      description: variant.tool.description,
      path: `/${SLUG}`,
      keywords: variant.tool.keywords,
    })
  : {};

export default function Page() {
  const v = getCompressVariant(SLUG);
  if (!v) notFound();
  return (
    <ToolLayout tool={v.tool}>
      <CompressTool targetBytes={v.targetBytes} targetLabel={v.targetLabel} />
    </ToolLayout>
  );
}
