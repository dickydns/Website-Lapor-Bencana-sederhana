import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const handleLogout = async() =>{
        confirm("Are you sure to logout?");
        const sessionDel = await fetch('/api/session',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(sessionDel.ok){
            router.replace('/')
        }
    }   

    return (
    <>
      {/*  Header Start */}
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          
          <div
            className="navbar-collapse justify-content-end px-0"
            id="navbarNav"
          >
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-icon-hover"
                  href="javascript:void(0)"
                  id="drop2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/admin/assets/images/profile/user-1.jpg"
                    alt=""
                    width="35"
                    height="35"
                    className="rounded-circle"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                  aria-labelledby="drop2"
                >
                  <div className="message-body">
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-user fs-6"></i>
                      <p className="mb-0 fs-3">My Profile</p>
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-mail fs-6"></i>
                      <p className="mb-0 fs-3">My Account</p>
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-list-check fs-6"></i>
                      <p className="mb-0 fs-3">My Task</p>
                    </a>
                    <a href="#" onClick={handleLogout} className="btn btn-outline-primary mx-3 mt-2 d-block" >
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/*  Header End */}
    </>
  );
}
