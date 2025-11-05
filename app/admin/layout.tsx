'use client'

import Script from "next/script";
import { Providers } from "../provider";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  const pathname    = usePathname();
  const isDashboard = pathname === "/admin/dashboard";
  return (
    <>
      <link rel="shortcut icon" type="image/png" href="/admin/assets/images/logos/favicon.png" />
      <link rel="stylesheet" href="/admin/assets/css/styles.min.css" />
      
      <div className="admin-wrapper">
        <Providers>{children}</Providers>
      </div>
      <Script src="/admin/assets/libs/jquery/dist/jquery.min.js" strategy="afterInteractive"/>
      <Script src="/admin/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive"/>
      <Script src="/admin/assets/js/sidebarmenu.js" strategy="afterInteractive"/>
      <Script src="/admin/assets/js/app.min.js" strategy="afterInteractive"/>
      <Script src="/admin/assets/libs/simplebar/dist/simplebar.js" strategy="afterInteractive"/>
    </>
  );
}
