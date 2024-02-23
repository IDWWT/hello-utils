import { auth } from "@/auth"
import UserTable from "@/components/user-table";
import { getUserList } from "@/utils/user";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  if (!user) return "Please Sign In";
  if (user.roleCode !== "ADMIN") return "Not Allowed User";

  const userList = await getUserList({ first: 5 });

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <UserTable />
    </div>
  )
}