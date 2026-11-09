"use client";

import { useActionState } from "react";
import Link from "next/link";

function Bidang({ nama, label, galat, children }) {
  return (
    <div>
      <label htmlFor={nama} className="label">{label}</label>
      {children}
      {galat && (
        <p id={`${nama}-galat`} className="galat" role="alert">{galat}</p>
      )}
    </div>
  );
}

export default function FormBuku({ aksi, awal, id, kategoriSaran = [], labelKirim, batalHref }) {
  const [state, formAction, pending] = useActionState(aksi, { errors: {}, nilai: awal });
  const nilai = state.nilai ?? awal;
  const err = state.errors ?? {};
  const prop = (nama) => ({
    id: nama,
    name: nama,
    "aria-invalid": err[nama] ? "true" : undefined,
    "aria-describedby": err[nama] ? `${nama}-galat` : undefined,
    className: "input",
  });

  return (
    <form action={formAction} className="form-kartu grid gap-5" noValidate={false}>
      {state.pesan && <p role="alert" className="alert alert-galat">{state.pesan}</p>}
      {id && <input type="hidden" name="id" value={id} />}

      <Bidang nama="judul" label="Judul buku" galat={err.judul}>
        <input {...prop("judul")} type="text" required maxLength={200} defaultValue={nilai.judul} placeholder="Contoh: Clean Code" />
      </Bidang>

      <Bidang nama="penulis" label="Penulis" galat={err.penulis}>
        <input {...prop("penulis")} type="text" required maxLength={150} defaultValue={nilai.penulis} placeholder="Contoh: Robert C. Martin" />
      </Bidang>

      <div className="grid gap-5 sm:grid-cols-2">
        <Bidang nama="kategori" label="Kategori" galat={err.kategori}>
          <input {...prop("kategori")} type="text" required maxLength={50} list="saran-kategori" defaultValue={nilai.kategori} placeholder="Pilih atau ketik baru" />
          <datalist id="saran-kategori">
            {kategoriSaran.map((k) => <option key={k} value={k} />)}
          </datalist>
        </Bidang>

        <Bidang nama="tahun" label="Tahun terbit" galat={err.tahun}>
          <input {...prop("tahun")} type="number" required min={1000} max={2100} step={1} inputMode="numeric" defaultValue={nilai.tahun} placeholder="2018" />
        </Bidang>
      </div>

      <fieldset>
        <legend className="label">Status ketersediaan</legend>
        <div className="pilihan">
          <label>
            <input type="radio" name="tersedia" value="true" defaultChecked={String(nilai.tersedia) !== "false"} />
            Tersedia
          </label>
          <label>
            <input type="radio" name="tersedia" value="false" defaultChecked={String(nilai.tersedia) === "false"} />
            Sedang Dipinjam
          </label>
        </div>
        {err.tersedia && <p className="galat" role="alert">{err.tersedia}</p>}
      </fieldset>

      <Bidang nama="sinopsis" label="Sinopsis" galat={err.sinopsis}>
        <textarea {...prop("sinopsis")} rows={5} required maxLength={1500} defaultValue={nilai.sinopsis} placeholder="Ringkasan isi buku dalam beberapa kalimat." style={{ resize: "vertical" }} />
      </Bidang>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-utama">
          {pending ? "Menyimpan..." : labelKirim}
        </button>
        <Link href={batalHref} className="btn btn-garis">Batal</Link>
      </div>
    </form>
  );
}
