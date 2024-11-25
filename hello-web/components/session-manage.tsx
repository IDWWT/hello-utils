import { auth } from "@/auth"
import { SignInButton, SignOutButton } from '@/components/auth-components'

export default async function SessionManage() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      {user ? <SignOutButton /> : <SignInButton />}
    </>
  )
}