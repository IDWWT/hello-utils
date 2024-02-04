import { auth } from "@/auth"
import { SignInButton, SignOutButton } from '@/components/auth-components'
import { getUserId, createUser, UserUniqueKey, setAccessToken, UserAccessToken } from "@/utils/user"
import { Session } from "next-auth";
import { cookies } from 'next/headers'

export default async function SessionManage() {
  const session = await auth();
  const user = session?.user; 

  if (user) {
    const userUniqueKey: UserUniqueKey = {
      userEmail: user.email!,
      provider: 'GITHUB',
    };
    const userId = await getUserId(userUniqueKey)

    if (userId) {
      const userAccessToken: UserAccessToken = {
        userId,
        accessToken: cookies().get('authjs.session-token')?.value!,
      }
      await setAccessToken(userAccessToken);
    } else {
      await createUser(userUniqueKey);
    }
  }

  return (
    <>
      {user ? <SignOutButton /> : <SignInButton />}
    </>
  )
}