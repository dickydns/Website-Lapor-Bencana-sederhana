
'use client'
export async function getSessionCheckAdministrator(router: any){
    const res = await fetch('/api/session')
    if (res.ok){
        const body = await res.json()
        if(body.user.status !== "isLogin" || body.user.role !=="administrator"){
            router.replace('/admin');
        }
    }
}
// export async function getSessionCheckAdministrator(router: any) {
//     try {
//         const res = await fetch('/api/session');

//         if (!res.ok) {
//             router.replace('/login');
//             return;
//         }

//         const { user } = await res.json();

//         if (user.status !== "isLogin") {
//             router.replace('/login');
//             return;
//         }

//         if (user.role !== "administrator") {
//             router.replace('/');
//             return;
//         }

//     } catch (err) {
//         router.replace('/login');
//     }
// }

export async function getSessionCheckUser(router: any){
    const res = await fetch('/api/session')
    if (res.ok){
        const body = await res.json()
        if(body.user.status !== "isLogin" || body.user.role !=="user"){
            router.replace('/');
        }
    }
}