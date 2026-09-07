import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "About - pdftools",
  description:
    "About pdftools: a minimal set of PDF utilities that run entirely in your browser.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="max-w-prose">
      <JsonLd
        data={breadcrumbLd([
          { name: "pdftools", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <h1 className="text-2xl font-semibold tracking-tighter2 text-ink">About</h1>
      <p className="mt-6 text-base text-subink">
        pdftools is a minimal set of PDF utilities that run entirely in your
        browser. There are no ads, no upsells, and nothing is uploaded.
      </p>
      <p className="mt-4 text-base text-subink">
        The site is open by design - every tool is a static page, indexable and
        fast. Sign-in is optional; it only stores your preferences.
      </p>
      <div className="mt-8 rounded-card border border-line bg-surface p-5 text-sm text-subink">
        <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Built with
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-y-2 text-ink">
          <li>Next.js 15</li>
          <li>Tailwind CSS</li>
          <li>pdf-lib</li>
          <li>pdfjs-dist</li>
          <li>MongoDB</li>
          <li>Auth.js</li>
        </ul>
      </div>
    </article>
  );
}
