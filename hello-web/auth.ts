import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { Account, NextAuthConfig, Session } from 'next-auth';
import { checkNotExistUserSession, createUserByEmail, getUserSessionByEmail, setAccessToken } from "./utils/user";
import _ from 'lodash';
import { UserWithRole } from "./types/user";

const extractPropertiesFromToken = (token: Record<string, unknown>) => {
  const userWithRole: (keyof UserWithRole)[] = ['userId', 'userEmail', 'roleCode', 'socialId', 'createdAt', 'updatedAt', 'userRole'];
  const account: (keyof Account)[] = ['provider', 'providerAccountId'];
  const additional: string[] = ["accessToken"];
  const properties = [
    ...userWithRole,
    ...account,
    ...additional,
  ] as string[];

  return _.pick(token, properties);
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // user의 로그인을 허가(true)할지 불허(false) 할지 결정
    // e.g. 유저의 이메일이 "yourdomain.com" 로 끝나야 로그인 가능
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("=====================signIn");
      // console.log('user:', user)
      // console.log('account:', account)
      // console.log('profile:', profile)
      // console.log('email:', email)
      // console.log('credentials:', credentials)
      return true
    },
    // middleware 에서 호출 안하는 것 같은데 모르겠음
    // The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
    // authorized({ request, auth }) {
    //   console.log("=====================authorized");
    //   console.log('request:', request);
    //   console.log('auth:', auth);
    //   const { pathname } = request.nextUrl
    //   return true
    // },
    // 반드시 `session` 함수 전에 호출 된다
    async jwt({ token, user, account, profile, trigger, session }) {
      // console.log("=====================jwt");
      // console.log('token:', token)
      // console.log('user:', user)
      // console.log('account:', account)
      // console.log('profile:', profile)
      // console.log('trigger:', trigger)
      // console.log('session:', session)

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }

      if (trigger === 'signIn') {
        const userEmail = token.email!;
        const userSession = await getUserSessionByEmail({ userEmail }) || await createUserByEmail({ userEmail });
        token = {
          ...token,
          ...userSession,
        };

        await setAccessToken({
          userId: userSession.userId,
          accessToken: token.accessToken as string,
        });
      }

      // console.log('token-end:', token);
      return token
    },
    async session(params) {
      // config.session.strategy 를 "jwt"로 설정했음에도 오류가 나타나 타입 단언(as) 사용
      const { session, token } = params as { session: Session, token: Record<string, unknown> };      
      // console.log("=====================session");
      // console.log('session:', session)
      // console.log('token:', token)

      if (!session.user) return session;

      session.user = {
        ...session.user,
        ...extractPropertiesFromToken(token),
      }
      // console.log('session-end:', session)
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
