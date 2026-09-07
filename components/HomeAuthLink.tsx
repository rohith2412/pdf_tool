"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function HomeAuthLink() {
  const { data, status } = useSession();
  if (status === "loading") return null;
  if (data?.user) {
    return <Link href="/account">Your account →</Link>;
  }
  return <Link href="/login">Sign in with Google →</Link>;
}
