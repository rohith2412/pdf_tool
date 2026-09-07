import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReorderPagesTool } from "@/components/ReorderPagesTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("reorder-pages");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/reorder-pages", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("reorder-pages");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <ReorderPagesTool />
    </ToolLayout>
  );
}
