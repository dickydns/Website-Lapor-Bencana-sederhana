
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

export async function getSessionCheckUser(router: any){
    const res = await fetch('/api/session')
    if (res.ok){
        const body = await res.json()
        if(body.user.status !== "isLogin" || body.user.role !=="user"){
            router.replace('/');
        }
    }
}