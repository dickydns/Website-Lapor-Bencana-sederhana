import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where:{
                status:true
            }
        });
        return new Response(JSON.stringify({ data: users }), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Gagal mengambil data pengguna' }), {status: 500});
    }
}

export async function PUT(request: Request) {
    try {
        const { id, type } = await request.json();
        if (type === 'delete') {
            await prisma.user.update({
                where: { id: id },
                data: { status: false },
            });
            return new Response(JSON.stringify({ data: 'Pengguna berhasil dihapus' }), {status: 200});
        } else {
            return new Response(JSON.stringify({ error: 'Tipe operasi tidak valid atau ID hilang' }), {status: 400});
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Gagal memperbarui data pengguna' }), {status: 500});
    }
}