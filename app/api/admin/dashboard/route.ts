import prisma from "@/lib/prisma";

export async function GET(){
    try{
        const reports = await prisma.report.findMany({
            orderBy:{
                createdAt:'desc'
            }    
        })
        return new Response(JSON.stringify({data:reports}), {status:200});
    } catch(error:any){
        console.error(error);
        return new Response(JSON.stringify({error:error.message}), {status:500});
    }
}