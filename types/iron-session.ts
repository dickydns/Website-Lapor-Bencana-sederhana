import "iron-session"

declare module "iron-session"{
    interface IronSessionData{
        user?: {
            id:number,
            name?:string,
            email?:string,
            role:number,
            status:string
        }
    }
}