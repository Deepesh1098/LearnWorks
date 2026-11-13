import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { DefaultSession } from "next-auth";

type SessionUser = DefaultSession["user"] & {
  id?: string;
  role?: string;
  username?: string;
  bio?: string | null;
  location?: string | null;
  headline?: string | null;
  createdAt?: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await db.user.findUnique({ where: { email: credentials.email as string } });
        if (!user || !user.password) return null;
        const isValid = await compare(credentials.password as string, user.password);
        if (!isValid) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.avatar };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        const dbUser = await db.user.findUnique({ where: { id: token.id as string } });
        if (dbUser) {
          const sessionUser = session.user as SessionUser;
          sessionUser.role = dbUser.role;
          sessionUser.username = dbUser.username;
          sessionUser.bio = dbUser.bio;
          sessionUser.location = dbUser.location;
          sessionUser.headline = dbUser.headline;
          sessionUser.createdAt = dbUser.createdAt.toISOString();
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "learnworks-dev-secret-key-change-in-production",
});
