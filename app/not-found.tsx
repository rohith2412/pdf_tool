import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-card border border-line bg-surface text-2xl font-semibold text-ink">
        404
      </div>
      <h1 className="text-2xl font-semibold tracking-tighter2 text-ink">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-subink">
        That URL doesn't match any of the tools on the site.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm text-ink no-underline transition-colors hover:border-ink hover:bg-surface-2"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to tools
      </Link>
    </div>
  );
}
