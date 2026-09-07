import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/meta";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Privacy - pdftools",
  description:
    "How pdftools handles your data: PDFs stay in your browser. MongoDB stores only your Google login profile and a global visitor count.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="max-w-prose">
      <JsonLd
        data={breadcrumbLd([
          { name: "pdftools", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <h1 className="text-2xl font-semibold tracking-tighter2 text-ink">Privacy</h1>
      <p className="mt-6 text-base text-subink">
        Your PDFs are processed entirely in your browser using JavaScript.
        Files are never uploaded, stored, or transmitted anywhere.
      </p>
      <p className="mt-4 text-base text-subink">
        We use MongoDB only to store your Google login profile (name, email,
        picture) and a global visitor count. No file names, no file content,
        no per-user tracking.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <CheckCircle2 className="h-4 w-4 text-ink" strokeWidth={1.5} />
            What we store
          </div>
          <ul className="mt-3 space-y-2 text-sm text-subink">
            <li>Google ID, email, name, profile image</li>
            <li>Sign-in timestamps</li>
            <li>Global visitor counter</li>
            <li>Per-tool usage counts</li>
          </ul>
        </div>
        <div className="rounded-card border border-line bg-surface p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <XCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
            What we don't
          </div>
          <ul className="mt-3 space-y-2 text-sm text-subink">
            <li>PDF contents, file names, thumbnails</li>
            <li>Per-user history of tools used</li>
            <li>Third-party analytics or ad trackers</li>
            <li>Cross-site cookies</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-medium text-ink">Local storage</h2>
      <p className="mt-2 text-sm text-subink">
        We may use your browser's localStorage to remember lightweight
        preferences (theme, last-used compression level, recently opened
        tools). This never leaves your browser.
      </p>
    </article>
  );
}
