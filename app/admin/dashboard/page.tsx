"use client";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { useEffect } from "react";
import { getSessionCheckAdministrator } from "@/lib/check_auth";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/report/useReport";
import { useMemo } from 'react';

type ReportItem = {
  id: number;
  status_report?: string | null;
  status_verifikasi?: string | null;
  status_pengiriman?: string | null;
};

export default function Dashboard() {
  const router = useRouter();
  
	const { data, isLoading, error } = useDashboard();
	const report: ReportItem[] = (data ?? []) as ReportItem[];


  // kasih default kosong + pastikan tipenya array of ReportItem

  // ✅ hitung status (gunakan useMemo biar nggak re-calc tiap render)
  const all = useMemo(
    () => report.length,
    [report]
  );

  const done = useMemo(
    () => report.filter((d) => d.status_report?.toLowerCase() === 'done').length,
    [report]
  );

  const proses = useMemo(
    () => report.filter((d) => d.status_report?.toLowerCase() === 'progress').length,
    [report]
  );


 

  useEffect(() => {
    getSessionCheckAdministrator(router);
  }, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {(error as Error).message}</div>;
	}

  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        {/* sidebar */}
        <Sidebar />
        {/* end sidebar */}

        {/*  Main wrapper */}
        <div className="body-wrapper">
          {/* header */}
          <Header />
          {/* end header */}
          <div className="container-fluid">
            {/*  Row 1 */}
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="row alig n-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold"> Total Laporan Masuk </h5>
                        <h4 className="fw-semibold mb-3">{all}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div
                            className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i className="ti ti-alert-triangle fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="row alig n-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold"> Total Diproses</h5>
                        <h4 className="fw-semibold mb-3">{proses}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div
                            className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i className="ti ti-check fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="row alig n-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-9 fw-semibold"> Total Selesai  </h5>
                        <h4 className="fw-semibold mb-3">{done}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div
                            className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <i className="ti ti-checks fs-6"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
