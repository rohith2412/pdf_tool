import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowToPage } from "@/components/HowToPage";
import { HOW_TO_PAGES } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

const SLUG = "how-to-compress-pdf";
const page = HOW_TO_PAGES.find((p) => p.slug === SLUG);

export const metadata: Metadata = page
  ? buildMetadata({
      title: page.title,
      description: page.description,
      path: `/${page.slug}`,
      keywords: page.keywords,
    })
  : {};

export default function Page() {
  if (!page) notFound();
  return <HowToPage page={page} />;
}
