import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PdfToJpgTool } from "@/components/PdfToJpgTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("pdf-to-jpg");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/pdf-to-jpg", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("pdf-to-jpg");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <PdfToJpgTool />
    </ToolLayout>
  );
}
