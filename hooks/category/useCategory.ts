import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";

interface updateCategory {
    title?: string;
    type?: string;
    id?: number;
}

interface createCategory {
    title?: string;
 
}

export function useCategory(){
    return useQuery({
        queryKey: ['category'],
        queryFn: async ()=>{
            const res = await fetch('/api/admin/category');
            if(!res){
                throw new Error('Gagal mengambil data kategori');
            }
            const json = await res.json();
            return json.data ?? [];
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, 
    })
}


export function useCreateCategory(){
    const cl = useQueryClient();
    return useMutation({
        mutationFn: async (data:createCategory)=>{
            const res = await fetch('/api/admin/category', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                throw new Error('Gagal membuat kategori');
            }
            const json = await res.json();
            return json.data ?? [];
        },onSuccess: ()=>{
            cl.invalidateQueries({queryKey:['category']});
        }
    })
}


export function useUpdateCategory(){
    const cl = useQueryClient();
    return useMutation({
        mutationFn: async (data:updateCategory)=>{
            const res = await fetch('/api/admin/category', {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                throw new Error('Gagal membuat kategori');
            }
            const json = await res.json();
            return json.data ?? [];
        },onSuccess: ()=>{
            cl.invalidateQueries({queryKey:['category']});
        }
    })
}