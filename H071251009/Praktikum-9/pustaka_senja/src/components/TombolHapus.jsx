"use client";

import { hapusBuku } from "@/app/katalog/actions";

function TombolHapus({ id, judul }) {
  const hapusDenganId = hapusBuku.bind(null, id);

  function handleSubmit(e) {
    const setuju = window.confirm(
      `Hapus buku "${judul}"? Tindakan ini tidak dapat dibatalkan.`
    );
    // Jika dibatalkan, Server Action tidak dijalankan dan data tetap tersimpan.
    if (!setuju) e.preventDefault();
  }

  return (
    <form action={hapusDenganId} onSubmit={handleSubmit}>
      <button
        type="submit"
        className="rounded-lg border border-rose-500/40 px-3 py-1.5 text-sm text-rose-300 transition hover:bg-rose-500/10"
      >
        Hapus
      </button>
    </form>
  );
}

export default TombolHapus;
