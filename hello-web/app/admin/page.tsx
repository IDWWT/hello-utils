import { auth } from "@/auth"
import { useSession, getSession } from "next-auth/react"

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  console.log(user);
  if (!user) return "Please Sign In";
  if (user.roleCode !== "ADMIN") return "Not Allowed User";

  return (
    <div>
      <h1>ADMIN PAGE</h1>
    </div>
  )
}