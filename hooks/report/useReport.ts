import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";

interface updateReport {
    status_report?: string;
    id?: number;
    type?: string;
}

interface createReport {
    category_id:number;
    title:string;
    location:string;
    description:string;
    report_email?:string;
    report_name?:string;
    report_phone?:string;
    token?: string;

}

export function useDashboard(){
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async ()=>{
            const res = await fetch('/api/admin/dashboard');
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

export function useReport(){
    return useQuery({
        queryKey: ['report'],
        queryFn: async ()=>{
            const res = await fetch('/api/admin/report');
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


export function handleUpdateDelReport(){
    const cl = useQueryClient();
    return useMutation({
        mutationFn: async (data:updateReport)=>{
            const res = await fetch('/api/admin/report', {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                throw new Error('Gagal memperbarui laporan');
            }
            const json = await res.json();
            return json.data ?? [];
        },onSuccess: ()=>{
            cl.invalidateQueries({queryKey:['report']});
        }
    })
}

export function useCreateReport(){
    const cl = useQueryClient();
    return useMutation({
        mutationFn: async(data:createReport) =>{
            const res = await fetch('/api/admin/report', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            if(!res.ok){
                throw new Error('Gagal membuat laporan');
            }
            const json = await res.json();
            return json.data ?? [];
        }, onSuccess: ()=>{
            cl.invalidateQueries({queryKey:['report'], refetchType: 'all'});
            cl.invalidateQueries({queryKey:['dashboard'], refetchType: 'all'});
            
        }
    })
}