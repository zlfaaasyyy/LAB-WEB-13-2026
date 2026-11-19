"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus buku "${judul}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-red-500 hover:underline">
        Hapus
      </button>
    </form>
  );
}