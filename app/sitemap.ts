import type { MetadataRoute } from "next";
import { HOW_TO_PAGES, TOOLS } from "@/content/tools";
import { SITE_URL } from "@/lib/seo/meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const toolUrls = TOOLS.map((t) => ({
    url: `${SITE_URL}/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const howToUrls = HOW_TO_PAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...toolUrls,
    ...howToUrls,
  ];
}
