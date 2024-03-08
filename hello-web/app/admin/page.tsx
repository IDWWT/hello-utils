import { auth } from "@/auth"
import UserTable from "@/components/user-table";
import { getUserList } from "@/utils/user";

export default async function Page() {
  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <UserTable />
    </div>
  )
}