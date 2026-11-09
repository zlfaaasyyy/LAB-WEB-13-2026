import { hueKategori } from "@/lib/kategori";

// Sampul dibangun dari tipografi dan warna kategori (data tidak punya gambar).
export default function Sampul({ buku, besar = false }) {
  return (
    <span
      className={`sampul ${besar ? "sampul-besar" : ""}`}
      style={{ "--h": hueKategori(buku.kategori) }}
    >
      <span>
        <span className="sampul-kat">{buku.kategori}</span>
        <span className="sampul-judul">{buku.judul}</span>
      </span>
      <span className="sampul-bawah">
        <span className="sampul-penulis">{buku.penulis}</span>
        <span className="sampul-tahun">{buku.tahun}</span>
      </span>
    </span>
  );
}
