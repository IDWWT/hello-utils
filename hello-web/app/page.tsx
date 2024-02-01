import { SignIn, SignOut } from '@/components/auth-components'
import { auth } from "@/auth"
import { getUserId, createUser, UserUniqueKey, setAccessToken, UserAccessToken } from "@/utils/user"
import { cookies } from 'next/headers'

const Home = async () => {
  const session = await auth()

  if (session?.user) {
    const userUniqueKey: UserUniqueKey = {
      userEmail: session.user.email!,
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
    <div>
      {session?.user ? <SignOut />: <SignIn />}
    </div>
  );
}

export default Home