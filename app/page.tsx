"use client";
import { useDashboard, useCreateReport } from "@/hooks/report/useReport";
import { useCategory } from "@/hooks/category/useCategory";
import { useMemo, useRef, useState } from "react";



import ReCAPTCHA from "react-google-recaptcha"

type ReportItem = {
  id: number;
  title: string;
  location?: string | null;
  description?: string | null;
  status_report?: string | null;
  createdAt?: string | null;
  status_verifikasi?: string | null;
  status_pengiriman?: string | null;
};

export default function Home() {
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
    const createReport = useCreateReport()

    const { data, isLoading, error } = useDashboard();
    const { data: categoryData } = useCategory();
    const report: ReportItem[] = (data ?? []) as ReportItem[];
    const category = categoryData ?? [];

    //Form var
    const [category_id, setCategoryId]   = useState(0);
    const [title, setTitle]              = useState("");
    const [location, setLocation]        = useState("");
    const [description, setDescription]  = useState("");
    const [report_email, setReportEmail] = useState("");
    const [report_name, setReportName]   = useState("");
    const [report_phone, setReportPhone] = useState("");
    const [status, setStatus] = useState("");
    const [sent, setSent] = useState(0);

    const all = useMemo(() => report.length, [report]);

    const done = useMemo(
        () =>
        report.filter((d) => d.status_report?.toLowerCase() === "done").length,
        [report]
    );

    const proses = useMemo(
        () =>
        report.filter((d) => d.status_report?.toLowerCase() === "progress")
            .length,
        [report]
    );

    const handleSentReport = async(e: React.FormEvent) =>{
        e.preventDefault();
        let token;
        try {
            token = await recaptchaRef.current?.executeAsync()
        } catch (err) {
            token = undefined
        }

        if (!token) {
            alert('Captcha gagal, coba lagi.')
            return
        }
        const payload ={
            category_id:category_id,
            title:title,
            location:location,
            description:description,
            report_email:report_email,
            report_name:report_name,
            report_phone:report_phone,
            token:token 
        }
        createReport.mutate(payload, {
        onSuccess: () => {
            setCategoryId(0)
            setTitle("");
            setLocation("")
            setDescription("")
            setReportEmail("")
            setReportName("")
            setReportPhone("")
            setStatus("Berhasil Menambahkan Laporan")
            setSent(0)
        }, onError: (error:any) => {
            setSent(0)
            alert("Gagal membuat laporan: " + error.message);
        }
      })
    }
    return (
        <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
            <a className="navbar-brand" href="#">
                <i className="fas fa-clipboard-list"></i> Laporan Warga
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link active" href="#beranda">
                    Beranda
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#lapor">
                    Buat Laporan
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#riwayat">
                    Riwayat Laporan
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <div className="container mt-4">
            {/* Hero Section */}
            <div className="hero-section" id="beranda">
            <div className="row align-items-center">
                <div className="col-lg-8">
                <h1>
                    <i className="fas fa-megaphone"></i> Selamat Datang di Sistem
                    Laporan Warga
                </h1>
                <p>
                    Laporkan masalah lingkungan seperti sampah menumpuk, jalan
                    rusak, atau keluhan lainnya dengan mudah dan cepat. Bersama kita
                    ciptakan lingkungan yang lebih bersih dan nyaman!
                </p>
                </div>
                <div className="col-lg-4 text-center">
                <i
                    className="fas fa-city"
                    style={{ fontSize: "120px", color: "var(--secondary-color)" }}
                ></i>
                </div>
            </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
            <div className="col-md-4">
                <div className="stats-card">
                <i className="fas fa-exclamation-circle icon-danger"></i>
                <h3>{all}</h3>
                <p>Semua Laporan</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="stats-card">
                <i className="fas fa-refresh icon-primary"></i>
                <h3>{proses}</h3>
                <p>Laporan Diprosess</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="stats-card">
                <i className="fas fa-check-circle icon-success"></i>
                <h3>{done}</h3>
                <p>Laporan Selesai</p>
                </div>
            </div>
            </div>

            {/* Form Laporan */}
            <div className="form-container" id="lapor">
            <h2 className="mb-4">
                <i className="fas fa-edit"></i> Buat Laporan Baru
            </h2>
            <form id="laporanForm" onSubmit={handleSentReport}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="nama" className="form-label">
                    Nama Lengkap
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={report_name}
                    placeholder="Masukkan nama lengkap"
                    onChange={(e) => setReportName(e.target.value)}
                    
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="telepon" className="form-label">
                    Nomor Telepon
                    </label>
                    <input
                    type="tel"
                    className="form-control"
                    id="telepon"
                    placeholder="08xx-xxxx-xxxx"
                    value={report_phone}

                    onChange={(e) => setReportPhone(e.target.value)}
                    
                    />
                </div>
                </div>

                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="email@contoh.com"
                    value={report_email}

                    onChange={(e) => setReportEmail(e.target.value)}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Judul Laporan
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="--"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}

                    required
                />
                </div>

                <div className="mb-3">
                    <label htmlFor="kategori" className="form-label">
                        Kategori Laporan
                    </label>
                    <select className="form-select" id="kategori" onChange={(e) => setCategoryId(parseInt(e.target.value))} required>
                        <option value="">Pilih kategori...</option>
                        {category.map((cat:any) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                <label htmlFor="lokasi" className="form-label">
                    Lokasi Kejadian
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="lokasi"
                    placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 05"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    required
                />
                </div>

                <div className="mb-3">
                <label htmlFor="deskripsi" className="form-label">
                    Deskripsi Laporan
                </label>
                <textarea
                    className="form-control"
                    id="deskripsi"
                    rows={4}
                    placeholder="Jelaskan masalah yang Anda laporkan dengan detail..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                ></textarea>
                </div>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    size="invisible"
                />
                { status !== "" ? (
                <div className="alert alert-primary" role="alert">
                    {status}
                </div>
                ):''}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {sent === 0 ? ( 
                        <button type="submit" className="btn btn-submit text-white">
                            <i className="fas fa-paper-plane"></i> Kirim Laporan
                        </button>
                    ) : ( 
                        <button type="button" className="btn btn-submit text-white">
                            <i className="fas fa-paper-plane"></i> Menunggu....
                        </button>

                    )}
                </div>
            </form>
            </div>

            {/* Riwayat Laporan */}
            <div className="report-list" id="riwayat">
                <h2 className="mb-4">
                    <i className="fas fa-history"></i> Riwayat Laporan Terbaru
                </h2>

                {report.map((item, index:number) => (
                <div className="report-item" id={String(index+1)}>
                    <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 className="mb-1"> {item.title}</h5>
                        <p className="mb-1 text-muted">
                        <i className="fas fa-map-marker-alt"></i> {item.location}
                        </p>
                        <small className="text-muted">
                        <i className="fas fa-clock"></i>{' '}
                        {item.createdAt
                            ? new Date(item.createdAt).toLocaleString('id-ID', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                            : '-'}
                        </small>
                    </div>
                    


                    {item.status_report === "pending" ? (
                        <span className="badge bg-warning badge-status">Menunggu</span>
                    ) : item.status_report === "done" ? (
                        <span className="badge bg-success badge-status">Selesai</span>
                    ) : item.status_report === "progress" && (
                        <span className="badge bg-info badge-status">Diproses</span>
                    )}
                
                    </div>
                </div>
                ))}

            </div>
        </div>

        {/*  */}
        {/* Footer */}
        <footer className="container">
            <div className="text-center">
            <p className="mb-0">
                &copy; 2025 Sistem Laporan Warga. Dibuat untuk melayani masyarakat
                dengan lebih baik.
            </p>
            <p className="mb-0 mt-2">
        
                <i className="fas fa-envelope"></i> info@laporanwarga.
            </p>
            </div>
        </footer>
    </>
  );
}
