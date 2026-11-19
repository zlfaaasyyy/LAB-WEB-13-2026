import { formatWaktu } from "@/lib/format";

export default function KartuUsulan({ item }) {
  return (
    <article className="entri" style={{ "--h": 42 }}>
      <div className="entri-bilah" aria-hidden="true" />
      <div className="entri-isi">
        <div className="entri-meta">
          <span className="chip chip-kat">{item.kategori}</span>
          <span className="t-redup" style={{ fontSize: "0.8rem" }}>{formatWaktu(item.dibuat_pada)}</span>
        </div>
        <h3 className="entri-judul">{item.judul_buku}</h3>
        <p className="t-kabut" style={{ fontSize: "0.9rem" }}>
          Diusulkan oleh <strong style={{ color: "var(--krem)" }}>{item.nama_pengusul}</strong>
        </p>
        <p className="font-judul t-kabut" style={{ marginTop: "0.4rem" }}>&ldquo;{item.alasan}&rdquo;</p>
      </div>
    </article>
  );
}
