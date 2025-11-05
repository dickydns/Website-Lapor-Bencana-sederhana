
'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/sessionAtom";

export default function Authentication() {
  const router  = useRouter();
  const setUser = useSetAtom(userAtom);

  const [email ,setEmail] = useState("");
  const [password ,setPassword] = useState("");
  const [button, setButton] = useState("Sign In");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleCheckSession();
  }, []);

  const handleCheckSession = async() =>{
    const data = await fetch('/api/session');
    const res = await data.json();
    if(res.ok && res.user.status === "isLogin"){
      router.replace('/admin/dashboard');
    }
  }

  const handleAuthentication = async (e:React.FormEvent) => {
    e.preventDefault();
    setButton("Processing...");
    try{
      const response = await fetch('/api/authentication', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email, password })
      });
      const response_user = await response.json()
      if(!response.ok){
        throw new Error(response_user.error || 'Failed to authenticate');
      }
      setUser({id:response_user.id, status:"isLogin", role:response_user.role});
      setStatus("Authentication successful!");
      router.push('/admin/dashboard');  
    } catch (error :any) {
        setError(error.message)
        setButton("Sign In");
    }
  }
  
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    <div
      className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <center>
                        <img src="./admin/assets/images/logos/dark-logo.svg" width="180" alt=""/>
                    </center>
                </a>
                <p className="text-center">Your Social Campaigns</p>
                <form onSubmit={handleAuthentication}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email"  name="email" onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-4">
                    <label  className="form-label">Password</label>
                    <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                  </div>
                    {error &&
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                    }

                    {status &&
                    <div className="alert alert-primary" role="alert">
                      {status}
                    </div>
                    }
                  <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">{button}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
