import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SplitTool } from "@/components/SplitTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("split-pdf");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/split-pdf", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("split-pdf");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <SplitTool />
    </ToolLayout>
  );
}
