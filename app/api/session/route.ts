import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type UserSession } from "@/lib/session";


export async function GET(){
    const cookieStore = await cookies();
    const session     = await getIronSession<UserSession>(cookieStore, sessionOptions);
        
    return NextResponse.json({ok:true, user:session})
}

export async function POST(){
    const cookieStore = await cookies();
    const session     = await getIronSession<UserSession>(cookieStore, sessionOptions);
    await session.destroy();
    return NextResponse.json({ok:true});
}