"use client";

import { useActionState } from "react";
import { kirimUsulan } from "@/app/usulan/actions";
import { KATEGORI_USULAN } from "@/lib/validasi";

const AWAL = { namaPengusul: "", judulBuku: "", kategori: "", alasan: "" };

function Bidang({ nama, label, galat, children }) {
  return (
    <div>
      <label htmlFor={nama} className="label">{label}</label>
      {children}
      {galat && <p id={`${nama}-galat`} className="galat" role="alert">{galat}</p>}
    </div>
  );
}

export default function FormUsulan() {
  const [state, formAction, pending] = useActionState(kirimUsulan, { errors: {}, nilai: AWAL });
  const nilai = state.nilai ?? AWAL;
  const err = state.errors ?? {};
  const prop = (nama) => ({
    id: nama,
    name: nama,
    className: "input",
    "aria-invalid": err[nama] ? "true" : undefined,
    "aria-describedby": err[nama] ? `${nama}-galat` : undefined,
  });

  return (
    <div className="form-kartu">
      {state.pesan && <p role="alert" className="alert alert-galat" style={{ marginBottom: "1.25rem" }}>{state.pesan}</p>}
      {state.sukses && <p role="status" className="alert alert-ok" style={{ marginBottom: "1.25rem" }}>{state.sukses}</p>}

      <form action={formAction} className="grid gap-5">
        <Bidang nama="namaPengusul" label="Nama pengusul" galat={err.namaPengusul}>
          <input {...prop("namaPengusul")} type="text" required maxLength={100} defaultValue={nilai.namaPengusul} placeholder="Contoh: Naufal Harits" />
        </Bidang>
        <Bidang nama="judulBuku" label="Judul buku yang diusulkan" galat={err.judulBuku}>
          <input {...prop("judulBuku")} type="text" required maxLength={200} defaultValue={nilai.judulBuku} placeholder="Contoh: Pragmatic Programmer" />
        </Bidang>
        <Bidang nama="kategori" label="Kategori" galat={err.kategori}>
          <select {...prop("kategori")} required defaultValue={nilai.kategori}>
            <option value="">Pilih kategori buku</option>
            {KATEGORI_USULAN.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Bidang>
        <Bidang nama="alasan" label="Alasan usulan" galat={err.alasan}>
          <textarea {...prop("alasan")} rows={4} required maxLength={1000} defaultValue={nilai.alasan} placeholder="Jelaskan singkat mengapa buku ini penting atau menarik untuk dihadirkan." style={{ resize: "vertical" }} />
        </Bidang>
        <button type="submit" disabled={pending} className="btn btn-utama">
          {pending ? "Mengirim..." : "Kirim Usulan Buku"}
        </button>
      </form>
    </div>
  );
}
