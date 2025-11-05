import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";

interface updateUser {
    id?: number;
    type?: string;
}



export function useUsers(){
    return useQuery({
        queryKey: ['users'],
        queryFn: async ()=>{
            const res = await fetch('/api/admin/users');
            if(!res){
                throw new Error('Gagal mengambil data laporan');
            } 
            const json = await res.json();
            return json.data ?? [];
        },
       
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 menit
    })
}


export function handleUpdateDelUser(){
    const cl = useQueryClient();
    return useMutation({
        mutationFn: async (data:updateUser)=>{
            const res = await fetch('/api/admin/users', {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                throw new Error('Gagal memperbarui User');
            }
            const json = await res.json();
            return json.data ?? [];
        },onSuccess: ()=>{
            cl.invalidateQueries({queryKey:['users']});
        }
    })
}