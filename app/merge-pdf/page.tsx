import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MergeTool } from "@/components/MergeTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("merge-pdf");

export const metadata: Metadata = tool
  ? buildMetadata({
      title: tool.title,
      description: tool.description,
      path: "/merge-pdf",
      keywords: tool.keywords,
    })
  : {};

export default function MergePdfPage() {
  const t = getTool("merge-pdf");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <MergeTool />
    </ToolLayout>
  );
}
