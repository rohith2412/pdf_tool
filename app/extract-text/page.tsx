import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExtractTextTool } from "@/components/ExtractTextTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("extract-text");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/extract-text", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("extract-text");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <ExtractTextTool />
    </ToolLayout>
  );
}
