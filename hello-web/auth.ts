import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig, Session } from 'next-auth';
import { checkNotExistUserSession, createUserByEmail, getAccessToken, getUserSessionByEmail, setAccessToken } from "./utils/user";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { UserAccessToken } from "./types/user";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // middleware 에서 호출 안하는 것 같은데 모르겠음
    // The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   return true
    // },
    // 현재는 필요가 없는 부분
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //   }
    //   return token
    // },
    async session(params) {
      // config.session.strategy 를 "jwt"로 설정했음에도 오류가 나타나 타입 단언(as) 사용
      const { session, token } = params as { session: Session, token: Record<string, unknown>};
      if (!session.user) return session;
      
      if (checkNotExistUserSession(session)) {
        const userEmail = session.user.email!;
        const userSession = await getUserSessionByEmail({ userEmail }) || await createUserByEmail({ userEmail });
        session.user = {
          ...session.user,
          ...userSession,
        }
      }

      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
