import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Sign in - pdftools",
    description:
      "Sign in to pdftools with your Google account. Optional - every tool works without an account.",
    path: "/login",
  }),
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="text-xl font-semibold tracking-tighter2 text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-subink">
          Sign in with Google to save your preferences. Every tool works
          without an account - this is optional.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/account" });
          }}
          className="mt-6"
        >
          <GoogleSignInButton className="w-full" />
        </form>
        <p className="mt-6 text-xs text-muted">
          By continuing, you agree to our privacy policy. We only store your
          Google profile - never your PDFs.
        </p>
      </div>
    </div>
  );
}
