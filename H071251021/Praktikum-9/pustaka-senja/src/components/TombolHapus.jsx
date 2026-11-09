"use client";

import { useFormStatus } from "react-dom";
import { hapusBuku } from "@/app/katalog/actions";

function Tombol({ gaya }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={gaya === "tombol" ? "btn btn-bahaya" : "aksi-teks hapus"}>
      {pending ? "Menghapus..." : "Hapus"}
    </button>
  );
}

// Client Component kecil: hanya urusan konfirmasi di browser.
// Query DELETE tetap berjalan di Server Action (hapusBuku).
export default function TombolHapus({ id, judul, kembali, gaya = "teks" }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus buku "${judul}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {kembali && <input type="hidden" name="kembali" value={kembali} />}
      <Tombol gaya={gaya} />
    </form>
  );
}
