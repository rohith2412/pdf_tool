import { NextResponse } from "next/server";
import { isMongoConfigured, statsCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  if (!isMongoConfigured()) {
    return NextResponse.json({ ok: false, reason: "mongo_not_configured" });
  }
  try {
    const stats = await statsCollection();
    const res = await stats.findOneAndUpdate(
      { _id: "visitors" },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: res?.count ?? null });
  } catch (e) {
    console.error("visit ping failed", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json({ count: null });
  }
  try {
    const stats = await statsCollection();
    const doc = await stats.findOne({ _id: "visitors" });
    return NextResponse.json({ count: doc?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
