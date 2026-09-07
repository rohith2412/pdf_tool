import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddPageNumbersTool } from "@/components/AddPageNumbersTool";
import { ToolLayout } from "@/components/ToolLayout";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const tool = getTool("add-page-numbers");

export const metadata: Metadata = tool
  ? buildMetadata({ title: tool.title, description: tool.description, path: "/add-page-numbers", keywords: tool.keywords })
  : {};

export default function Page() {
  const t = getTool("add-page-numbers");
  if (!t) notFound();
  return (
    <ToolLayout tool={t}>
      <AddPageNumbersTool />
    </ToolLayout>
  );
}
