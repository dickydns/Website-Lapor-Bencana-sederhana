import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type UserSession } from "@/lib/session";
import { NextResponse } from "next/server";


export async function createSession(id:number,role:number){
    const cookieStore = await cookies();
    const session     = await getIronSession<UserSession>(cookieStore, sessionOptions);

    session.id     = id;
    session.role   = role;
    session.status = "isLogin";

    await session.save();
    return NextResponse.json({ok:true,  user:session});
}

export async function getSession(){
    const cookieStore = await cookies();
    const session     = await getIronSession<UserSession>(cookieStore, sessionOptions);
    return NextResponse.json({ok:true,  user:session});
}