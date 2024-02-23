import { DefaultSession } from "next-auth"
import { UserSession } from "./types/user"
 
declare module "next-auth" {
  interface Session {
    user: UserSession & DefaultSession["user"]
  }
}