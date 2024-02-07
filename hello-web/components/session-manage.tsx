import { auth } from "@/auth"
import { SignInButton, SignOutButton } from '@/components/auth-components'
import { createUser, UserUniqueKey, setAccessToken, UserAccessToken } from "@/utils/user"
import { cookies } from 'next/headers'
import { getUserIdByEmail } from "@/utils/graphql";

export default async function SessionManage() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    const userUniqueKey: UserUniqueKey = {
      userEmail: user.email!,
    };
    const userId = await getUserIdByEmail(userUniqueKey);

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