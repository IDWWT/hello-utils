import { DefaultSession } from "next-auth"
import { UserSession } from "./models/user.model"
 
declare module "next-auth" {
  interface Session {
    user: UserSession & DefaultSession["user"]
  }
}