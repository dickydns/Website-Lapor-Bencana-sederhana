"use client";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { use, useEffect, useState } from "react";
import { getSessionCheckAdministrator } from "@/lib/check_auth";
import { useRouter } from "next/navigation";
import { useReport, handleUpdateDelReport } from "@/hooks/report/useReport";

export default function Report() {
  const router = useRouter();
  // const createCategoryMutation = useCreateCategory();
  const updateDelReport      = handleUpdateDelReport();

  const { data, isLoading, error } = useReport();
  const report = data || [];
  const [title, setTitle] = useState("");
  const [kategori, setKategori] = useState("");
  const [statusReport, setStatusReport] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [id, setId] = useState(0);

  const handleUpdatePopup = (id: number, status: string) => {
    const modalElement = document.getElementById("exampleModal");

    setStatusReport(status);
    setId(id);

    if (modalElement) {
      const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(
        modalElement
      );
      bsModal?.show();
    }
  };

  const handleDetail = async (id: number) => {
    const modalElement = document.getElementById("detailReport");
    const modal = new (window as any).bootstrap.Modal(modalElement);
    try {
      const res = await fetch("/api/admin/report?id=" + id);
      const response = await res.json();
      if (response.data) {
        setTitle(response.data.title);
        setKategori(response.data.category?.title ?? "");
        setStatusReport(response.data.status_report ?? "");
        setCreatedAt(new Date(response.data.createdAt).toLocaleString());
        setDeskripsi(response.data.description);

        modal.show();
      }
    } catch (error: any) {
      alert("Gagal mengambil detail item: " + error.message);
    }
  };

  const handleDelete = (id: number) => {
      if (confirm('Apakah anda yakin ingin menghapus kategori ini?')) {
        const payload = {
          type: "delete",
          id:id
        };
        updateDelReport.mutate(payload, {
          onSuccess: () => {
            // Close modal
              const modalElement = document.getElementById('exampleModal');
              if (modalElement) {
                const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
                bsModal?.hide();
              }
            // Reset form
            setTitle("");
          }, onError: (error:any) => {
            alert("Gagal membuat kategori: " + error.message);
          }
        })
      }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      status_report: statusReport,
      type: "update",
      id: id,
    };
    updateDelReport.mutate(payload, {
      onSuccess: () => {
        // Close modal
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(
            modalElement
          );
          bsModal?.hide();
        }
        // Reset form
        setId(0);
        setStatusReport("")
      },
      onError: (error: any) => {
        alert("Gagal membuat kategori: " + error.message);
      },
    });
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById("exampleModal");
    if (modalElement) {
      const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(
        modalElement
      );
      bsModal?.hide();
    }
    // Reset form
    setTitle("");
  };

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
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">
                      Laporan Masuk
                    </h5>
                    <div className="table-responsive">
                      <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">No</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Judul</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Status</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Pengaturan</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.map((item: any, index: number) => (
                            <tr key={item.id ?? index}>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  {index + 1}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {item.title}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1 capitalize">
                                  {item.status_report}
                                </h6>
                              </td>

                              <td className="border-bottom-0">
                                <button
                                  onClick={() => handleDetail(item.id)}
                                  className="btn btn-primary me-2"
                                >
                                  Detail
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdatePopup(
                                      item.id,
                                      item.status_report
                                    )
                                  }
                                  className="btn btn-primary me-2"
                                >
                                  Ubah Status
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="btn btn-danger"
                                >
                                  Hapus{" "}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="detailReport"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Keterangan
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Judul</td>
                      <td>: {title}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Kategori</td>
                      <td>: {kategori}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Status</td>
                      <td className="capitalize">: {statusReport}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Tanggal Laporan</td>
                      <td>: {created_at}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        Deskripsi
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>{deskripsi}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ubah status pengerjaan
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleUpdateStatus}>
              <div className="modal-body">
                <div className="form group">
                  <label htmlFor="judul">Ubah Status</label>
                  <br />
                  <br />
                  <select
                    id="status"
                    className="form-control"
                    value={statusReport}
                    onChange={(e) => setStatusReport(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="progress">Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
