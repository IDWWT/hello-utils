import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from 'next-auth';
import { createUserByEmail, getAccessToken, getUserSessionByEmail, setAccessToken } from "./utils/user";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { UserAccessToken } from "./types/user";

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

      const userEmail = session.user.email || '';
      let userSession = await getUserSessionByEmail({ userEmail });
      if (!userSession) {
        await createUserByEmail({ userEmail });
        userSession = await getUserSessionByEmail({ userEmail });
      }

      const { userId } = userSession;
      let accessToken = await getAccessToken({ userId })
      if (_.isNull(accessToken)) {
        accessToken = uuidv4();
        const userAccessToken: UserAccessToken = { userId, accessToken };
        await setAccessToken(userAccessToken);
      }

      session.user = {
        ...session.user,
        ...userSession,
        accessToken,
      }
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
