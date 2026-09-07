import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Account - pdftools",
    description: "Your pdftools account.",
    path: "/account",
  }),
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { name, email, image } = session.user;
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-xl font-semibold tracking-tighter2 text-ink">Account</h1>
        <div className="mt-6 flex items-center gap-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="h-14 w-14 rounded-full border border-line"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-lg text-subink"
            >
              {(name ?? email ?? "?").charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <div className="text-base font-medium text-ink">{name}</div>
            <div className="text-sm text-muted">{email}</div>
          </div>
        </div>
        <div className="mt-6 rounded border border-line bg-surface p-4 text-xs text-subink">
          Sign-in is optional - we only store your Google profile and use it
          to remember your preferences across devices. Your PDFs never leave
          your browser.
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="mt-6"
        >
          <Button type="submit" variant="ghost" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
