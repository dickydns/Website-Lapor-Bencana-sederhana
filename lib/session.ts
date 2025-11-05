import { SessionOptions } from "iron-session";

export type UserSession = {
    id:number,
    name?:string,
    email?:string,
    role:number,
    status:string
}
const isProd = process.env.NODE_ENV === "production"
export const sessionOptions:SessionOptions = {
  password:process.env.SESSION_PASSWORD  as string,
  cookieName:'webapp',
  cookieOptions:{
    httpOnly:true,
    maxAge:  60 * 60 * 24 * 14,
    secure: isProd,
  }
}

declare module "iron-session"{
    interface IronSessionData{
        user?:UserSession
    }
}