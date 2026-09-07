"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function HeaderNav() {
  const { data, status } = useSession();
  const user = data?.user;

  return (
    <nav className="flex items-center gap-3 text-sm">
      {status === "loading" ? (
        <span className="text-muted">…</span>
      ) : user ? (
        <Link
          href="/account"
          className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 no-underline transition-colors hover:border-line-strong"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              className="h-6 w-6 rounded-full border border-line"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-[10px] text-subink"
            >
              {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
            </span>
          )}
          <span className="text-xs text-ink">
            {user.name ?? user.email ?? "account"}
          </span>
        </Link>
      ) : (
        <Link
          href="/login"
          className="rounded-full border border-ink bg-ink px-3 py-1.5 text-xs font-medium text-white no-underline transition-colors hover:bg-black"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
