import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const category = await prisma.category.findMany({
            where:{
                status:true
            },
            orderBy:{
                createdAt:'desc'
            }    
        })
        return NextResponse.json({data:category, status:200});
    } catch(error:any){
        console.error(error);
        return NextResponse.json({error:error.message}, {status:500});
    }
    
}   

export async function POST(request: Request){
    try{ 
        const {title} = await request.json();
        const newCategory = await prisma.category.create({
                data:{
                    title,
                }
            });
        
        return NextResponse.json({data:newCategory, status:200});
    } catch(error:any){ 
        console.error(error);
        return NextResponse.json({error:error.message}, {status:500});

    }
}



export async function PUT(request: Request){
    try{ 
        const {title, type, id} = await request.json();
        let newCategory;
        if(type == "delete"){
            newCategory = await prisma.category.update({
                data:{
                    status:false,
                },where:{
                    id: id
                }
            });
        } else{
            newCategory = await prisma.category.update({
                data:{
                    title,
                }, where:{
                    id: id
                }
            });
        }
        
        return NextResponse.json({data:newCategory, status:200});
    } catch(error:any){ 
        console.error(error);
        return NextResponse.json({error:error.message}, {status:500});

    }
}