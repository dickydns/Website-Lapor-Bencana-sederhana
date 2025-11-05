import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const pathFirst = parts[2];
  return (
    <>
      {/* Sidebar Start */}
      <aside className="left-sidebar">
        {/* Sidebar scroll*/}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link href="/admin/dashboard" className="text-nowrap logo-img">
              <img
                src="/admin/assets/images/logos/dark-logo.svg"
                width="180"
                alt=""
              />
            </Link>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          {/* Sidebar navigation*/}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item ">
                <Link
                  className={`sidebar-link ${pathFirst === "dashboard" ? "active" : ""}`}
                  href="/admin/dashboard"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-layout-dashboard"></i>
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className={`sidebar-link ${pathFirst === "report" ? "active" : ""}`}
                  href="/admin/report"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-login"></i>
                  </span>
                  <span className="hide-menu">Laporan</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className={`sidebar-link ${pathFirst === "category" ? "active" : ""}`}
                  href="/admin/category"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-apps"></i>
                  </span>
                  <span className="hide-menu">Kategori Laporan</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className={`sidebar-link ${pathFirst === "users" ? "active" : ""}`}
                  href="/admin/users"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-plus"></i>
                  </span>
                  <span className="hide-menu">Pengguna</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
      {/*  Sidebar End */}
    </>
  );
}
