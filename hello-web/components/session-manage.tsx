import { auth } from "@/auth"
import { SignInButton, SignOutButton } from '@/components/auth-components'
import { UserUniqueKey, setAccessToken, UserAccessToken } from "@/utils/user"
import { cookies } from 'next/headers'
import { getUserIdByEmail, createUserByEmail } from "@/utils/graphql";

export default async function SessionManage() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    const userUniqueKey: UserUniqueKey = {
      userEmail: user.email!,
    };
    const userId = await getUserIdByEmail(userUniqueKey) || await createUserByEmail(userUniqueKey);

    const userAccessToken: UserAccessToken = {
      userId,
      accessToken: cookies().get('authjs.session-token')?.value!,
    }
    await setAccessToken(userAccessToken);
  }

  return (
    <>
      {user ? <SignOutButton /> : <SignInButton />}
    </>
  )
}