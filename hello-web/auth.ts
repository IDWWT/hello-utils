import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from 'next-auth';
import { getUserSessionByEmail } from "./utils/graphql";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [GitHub],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async session({ session }) {
      // Add custom data to the session
      if (!session.user) return session;

      const userSession = await getUserSessionByEmail({ userEmail: session.user.email! });
      if (!userSession) return session;

      session.user = {
        ...session.user,
        ...userSession
      }
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
