import Link from "next/link";

export default function Hero({
  nama = "Pustaka Senja",
  slogan = "Ruang baca dan perpustakaan komunitas terbuka bagi siapa saja yang ingin belajar, bertukar ide, dan bertumbuh.",
  lokasi = "Jl. Pendidikan No. 12 (Dekat Kampus). Buka setiap hari, 09.00 sampai 21.00.",
  children,
}) {
  const [depan, ...sisa] = nama.split(" ");
  return (
    <section className="hero wrap">
      <h1 className="hero-judul">
        <span>{depan}</span>
        {sisa.length > 0 && <span>{sisa.join(" ")}</span>}
      </h1>

      <div className="hero-bawah">
        <div className="grid gap-5">
          <p className="lead">{slogan}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/katalog" className="btn btn-utama">Jelajahi Katalog Buku</Link>
            <Link href="/usulan" className="btn btn-garis">Usulkan Buku Baru</Link>
          </div>
          <p className="lokasi">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{lokasi}</span>
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
