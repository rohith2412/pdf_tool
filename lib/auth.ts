import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isMongoConfigured, usersCollection } from "./mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      if (!isMongoConfigured() || !user?.email || !account) return true;
      try {
        const users = await usersCollection();
        await users.updateOne(
          { googleId: account.providerAccountId },
          {
            $set: {
              googleId: account.providerAccountId,
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
              lastLoginAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true },
        );
      } catch (e) {
        console.error("user upsert failed", e);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
});
