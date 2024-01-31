import { SignIn, SignOut } from '@/components/auth-components'
import { auth } from "@/auth"

const Home = async () => {
  const session = await auth()

  return (
    <div>
      {session?.user ? <SignOut />: <SignIn />}
    </div>
  );
}

export default Home