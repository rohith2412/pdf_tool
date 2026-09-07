import type { FaqItem } from "@/content/tools";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        Frequently asked
      </h2>
      <div className="divide-y divide-line rounded-card border border-line bg-white">
        {items.map((it) => (
          <details key={it.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-ink hover:bg-surface">
              <span>{it.q}</span>
              <span
                aria-hidden
                className="tabular text-xs text-muted transition-transform duration-150 ease-soft group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm text-subink">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
