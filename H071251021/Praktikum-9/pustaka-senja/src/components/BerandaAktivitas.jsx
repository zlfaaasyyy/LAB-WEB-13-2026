import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import KartuUsulan from "@/components/KartuUsulan";

export default function BerandaAktivitas({ bukuFavorit = [], usulan = [] }) {
  return (
    <div className="grid gap-16">
      <section aria-labelledby="favorit-heading" className="grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="favorit-heading" className="judul-seksi">
              Buku favorit tersimpan{bukuFavorit.length > 0 && <span className="t-redup"> ({bukuFavorit.length})</span>}
            </h2>
            <p className="t-kabut" style={{ fontSize: "0.95rem" }}>
              Koleksi yang Anda tandai, tersimpan di database untuk browser ini.
            </p>
          </div>
          <Link href="/katalog" className="tautan">Lihat semua katalog</Link>
        </div>

        {bukuFavorit.length === 0 ? (
          <div className="kosong">
            <p className="font-judul" style={{ fontSize: "1.25rem" }}>Belum ada buku favorit</p>
            <p className="t-kabut" style={{ maxWidth: "46ch", marginBlock: "0.4rem 1.1rem" }}>
              Tekan tombol Suka pada kartu buku di katalog, dan buku itu akan menunggu Anda di sini.
            </p>
            <Link href="/katalog" className="btn btn-garis">Jelajahi Katalog Buku</Link>
          </div>
        ) : (
          <div className="daftar-buku">
            {bukuFavorit.map((b) => <BukuCard key={b.id} buku={b} favorit />)}
          </div>
        )}
      </section>

      <section aria-labelledby="usulan-heading" className="grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="usulan-heading" className="judul-seksi">
              Buku yang diusulkan{usulan.length > 0 && <span className="t-redup"> ({usulan.length} terbaru)</span>}
            </h2>
            <p className="t-kabut" style={{ fontSize: "0.95rem" }}>
              Rekomendasi judul baru dari pengunjung ruang baca.
            </p>
          </div>
          <Link href="/usulan" className="tautan">Usulkan buku baru</Link>
        </div>

        {usulan.length === 0 ? (
          <div className="kosong">
            <p className="font-judul" style={{ fontSize: "1.25rem" }}>Belum ada usulan</p>
            <p className="t-kabut" style={{ maxWidth: "46ch", marginBlock: "0.4rem 1.1rem" }}>
              Punya ide judul yang ingin dibaca di Pustaka Senja? Sampaikan lewat formulir usulan.
            </p>
            <Link href="/usulan" className="btn btn-utama">Kirim Usulan Pertama</Link>
          </div>
        ) : (
          <div className="daftar-buku">
            {usulan.map((item) => <KartuUsulan key={item.id} item={item} />)}
          </div>
        )}
      </section>
    </div>
  );
}
