import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeletePagesTool } from "@/components/DeletePagesTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("delete-pages");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/delete-pages", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("delete-pages");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <DeletePagesTool />
    </ToolLayout>
  );
}
