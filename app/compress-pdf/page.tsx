import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompressTool } from "@/components/CompressTool";
import { ToolLayout } from "@/components/ToolLayout";
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
    </ToolLayout>
  );
}
