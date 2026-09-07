import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-subink">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="hover:text-ink">
                  {it.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-3 w-3" aria-hidden strokeWidth={1.5} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
