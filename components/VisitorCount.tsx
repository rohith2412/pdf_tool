import { isMongoConfigured, statsCollection } from "@/lib/mongodb";

async function readCount(): Promise<number | null> {
  if (!isMongoConfigured()) return null;
  try {
    const stats = await statsCollection();
    const doc = await stats.findOne({ _id: "visitors" });
    return doc?.count ?? 0;
  } catch {
    return null;
  }
}

export async function VisitorCount() {
  const count = await readCount();
  if (count === null) return null;
  return (
    <span className="text-xs text-muted">
      Visitors: {count.toLocaleString()}
    </span>
  );
}
