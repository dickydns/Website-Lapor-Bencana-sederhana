import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import { createSession } from "@/lib/data_session";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try{
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(user){
            const compare = await comparePassword(password, user.password);
            if(!compare){
                return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
            }
            await createSession(user.id,user.role);
            return NextResponse.json(user);
        } else{
            return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
        }
    } catch(error:any){
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}