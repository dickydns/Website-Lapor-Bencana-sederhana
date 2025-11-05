"use client";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { use, useEffect, useState } from "react";
import { getSessionCheckAdministrator } from "@/lib/check_auth";
import { useRouter } from "next/navigation";
import { useUsers, handleUpdateDelUser } from "@/hooks/users/useUsers";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/sessionAtom";

export default function Users() {
  const router = useRouter();
  const user_id= useAtomValue(userAtom);
  const updateDelUser      = handleUpdateDelUser();
  const { data, isLoading, error } = useUsers();
  const users = data || [];

  const handleDelete = (id: number) => {
      if (confirm('Apakah anda yakin ingin menghapus kategori ini?')) {
        const payload = {
          type: "delete",
          id:id
        };
        updateDelUser.mutate(payload, {
          onSuccess: () => {
            // Close modal
              const modalElement = document.getElementById('exampleModal');
              if (modalElement) {
                const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
                bsModal?.hide();
              }
          }, onError: (error:any) => {
            alert("Gagal membuat kategori: " + error.message);
          }
        })
      }
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
                      Pengguna 
                    </h5>
                    <div className="table-responsive">
                      <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">No</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Nama</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Email</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Pengaturan</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((item: any, index: number) => (
                            <tr key={item.id ?? index}>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  {index + 1}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">
                                  {item.name}
                                </h6>
                              </td>
                              <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1 capitalize">
                                  {item.email}
                                </h6>
                              </td>

                              <td className="border-bottom-0">
                                {user_id?.id == item.id ? (
                                  <span className="text-muted">-</span>
                               
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="btn btn-danger"
                                  >
                                    Hapus
                                  </button>
                                )}
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

      

      
    </>
  );
}
