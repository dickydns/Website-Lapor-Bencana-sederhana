import prisma from "@/lib/prisma";



export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        
        let reports;
        if(id){
            reports = await prisma.report.findUnique({
                where: { id: Number(id) },
                include: { category: true },
            });
        } else{
            reports = await prisma.report.findMany({
                orderBy:{
                    createdAt:'desc'
                },
                where:{
                    status:true
                }    
            })
        }
       
        return new Response(JSON.stringify({data:reports}), {status:200});
    } catch(error:any){
        console.error(error);
        return new Response(JSON.stringify({error:error.message}), {status:500});
    }
}

export async function PUT(req: Request){
    try{
        const {id, status_report, type} = await req.json();

        if(type === 'delete'){
             const updatedReport = await prisma.report.update({
                where: { id: Number(id) },
                data: {
                    status: false,
                },
            });
            return new Response(JSON.stringify({data:updatedReport}), {status:200});
        } else{
            const updatedReport = await prisma.report.update({
                where: { id: Number(id) },
                data: {
                    status_report: status_report,
                },
            });
            return new Response(JSON.stringify({data:updatedReport}), {status:200});
        }
    } catch(error :any){
        console.error(error);
        return new Response(JSON.stringify({error:error.message}), {status:500});
    }
}

export async function POST(req: Request){
    try{
        const {category_id, title, location, description, report_email, report_name, report_phone, token} = await req.json();


        if (!token) {
            return new Response(JSON.stringify({error:"No captcha token"}), {status:500});
        }

        const secret = process.env.RECAPTCHA_SECRET_KEY
        if (!secret) {
            return new Response(JSON.stringify({error:"Server misconfigured"}), {status:500});
        }


        const params = new URLSearchParams()
        params.append('secret', secret)
        params.append('response', token)

        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        })
        const verifyData = await verifyRes.json()

        if (!verifyData.success) {
            return new Response(JSON.stringify({success: false, verifyData}), {status:400});
        }



        const craete = await prisma.report.create({
            data:{
                category_id:category_id,
                title:title,
                location:location,
                description:description,
                report_email:report_email,
                report_name:report_name,
                report_phone:report_phone
            }
        });

        return new Response(JSON.stringify({data:craete}), {status:200});
    } catch(error :any){
        console.error(error);
        return new Response(JSON.stringify({error:error.message}), {status:500});
    }
}