"use client";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { useEffect, useState } from "react";
import { getSessionCheckAdministrator } from "@/lib/check_auth";
import { useRouter } from "next/navigation";
import { useCategory, useCreateCategory, useUpdateCategory } from "@/hooks/category/useCategory";


export default function Category() {
  const router = useRouter();
  const createCategoryMutation = useCreateCategory();
  const UpdateDelCategory      = useUpdateCategory();
  const { data, isLoading, error } = useCategory();
  console.log("error"+data)
  
  const category = data || [];
  const [title, setTitle] = useState("");
  const [id, setId]       = useState(0);

  const handleUpdatePopup = (id:number, title:string) => {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
      bsModal?.show(); 
    }
    setTitle(title);
    setId(id);
  }

  const handleDelete = (id:number) => {
    if (confirm('Apakah anda yakin ingin menghapus kategori ini?')) {
      const payload = {
        type: "delete",
        id:id
      };

      UpdateDelCategory.mutate(payload, {
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
    
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: title,
      type: "update",
      id: id
    }
    UpdateDelCategory.mutate(payload, {
        onSuccess: () => {
          // Close modal
            const modalElement = document.getElementById('exampleModal');
            if (modalElement) {
              const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
              bsModal?.hide();
            }
          // Reset form
          setTitle("");
          setId(0);
        }, onError: (error:any) => {
          alert("Gagal membuat kategori: " + error.message);
        }
      })
  }

  const handleNewCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: title,
      type: "create"
    };
    createCategoryMutation.mutate(payload, {
      onSuccess: () => {
        // Close modal
        const modalElement = document.getElementById('exampleModal');
        if (modalElement) {
          const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
          bsModal?.hide();
          
          // Hapus backdrop
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          
          // Hapus modal-open class dari body
          document.body.classList.remove('modal-open');
        }
        // Reset form
        setTitle("");
      }, onError: (error:any) => {
        alert("Gagal membuat kategori: " + error.message);
      }
    })
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const bsModal = (window as any).bootstrap?.Modal?.getOrCreateInstance(modalElement);
      bsModal?.hide();
    }
    // Reset form
    setTitle("");
    setId(0);
  }

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
                    <div className="row">
                      <div className="col-lg-4">
                          <h5 className="card-title fw-semibold mb-4">
                          Kategori
                          </h5>
                      </div>
                      <div className="col-lg-8">
                        <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-info float-right">Tambah Kategori Pengaduan</a>
                      </div>
                    </div>

              
                   
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
                              <h6 className="fw-semibold mb-0">Pengaturan</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.map((item:any, index:number) => (
                          <tr key={item.id ?? index}>
                            <td className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">{index+1}</h6>
                            </td>
                            <td className="border-bottom-0">
                              <h6 className="fw-semibold mb-1">{item.title}</h6>
                            </td>
                           
                            <td className="border-bottom-0">
                              <button onClick={() => handleUpdatePopup(item.id, item.title)}className="btn btn-primary me-2">Ubah </button>
                              <button type="button" onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus </button>
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
      <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Kategori Baru</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <form onSubmit={id === 0 ? handleNewCategory : handleUpdateCategory}>
             
              <div className="modal-body">
                  <div className="form group">
                    <label htmlFor="judul">Judul</label>
                    <input type="text" value={title} name="title" id="title" onChange={(e) => setTitle(e.target.value)} className="form-control" required/>
                  </div>
                
              </div>
              <div className="modal-footer">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary" >Close</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
