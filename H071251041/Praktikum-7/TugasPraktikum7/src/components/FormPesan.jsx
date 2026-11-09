import { useState } from "react";

const jumlah_meja = 35;

function FormPesan({ jumlahItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [status, setStatus] = useState(""); 
  const [pesanTeks, setPesanTeks] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    let kumpulanError = "Data belum lengkap: ";
    let adaError = false;

    if (jumlahItem === 0) {
      kumpulanError = kumpulanError + "[Pesanan masih kosong] ";
      adaError = true;
    }

    let hitungHuruf = 0;

    // looping nama
    for (let i = 0; i < nama.length; i++) {
      let karakter = nama[i];
      
      // hitung nambah 1
      if ((karakter >= "a" && karakter <= "z") || (karakter >= "A" && karakter <= "Z")) {
        hitungHuruf = hitungHuruf + 1;
      }
    }

    if (hitungHuruf < 2) {
      kumpulanError = kumpulanError + "[Nama minimal harus memiliki 2 huruf abjad] ";
      adaError = true;
    }

    if (meja === "") {
      kumpulanError = kumpulanError + "[Nomor Meja belum diisi] ";
      adaError = true;
    } else {
      if (meja < 1 || meja > jumlah_meja || meja.includes(".") || meja.includes(",")) {
        kumpulanError = kumpulanError + `[Meja yang tersedia hanya 1-${jumlah_meja}] `;
        adaError = true;
      }
    }

    // tampilkan semua error gabungan
    if (adaError === true) {
      setStatus("error");
      setPesanTeks(kumpulanError);
      return;
    }

    setStatus("sukses");
    setPesanTeks(`Terima kasih, ${nama}! Pesanan untuk Meja ${meja} segera diproses.`);
    setNama("");
    setMeja("");
    onKirim();
  }

  let notifError;
  if (status === "error") {
    notifError = (
      <p className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm font-bold text-red-600">
        {pesanTeks}
      </p>
    );
  }

  let notifSukses;
  if (status === "sukses") {
    notifSukses = (
      <p className="rounded-lg border border-green-300 bg-green-100 p-3 text-sm font-bold text-green-700 ">
        {pesanTeks}
      </p>
    );
  }

  return (
    <section className="rounded-2xl border border-(--pink) bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-(--maroon)">
        Data <span className="text-(--merah)">Pemesan</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Masukkan nama"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
          className="rounded-lg border border-(--pink) px-4 py-2 text-sm text-(--coklat) outline-none focus:border-(--merah)"
        />
        <input
          type="number"
          placeholder={`Nomor meja (1 - ${jumlah_meja})`}
          value={meja}
          onChange={(event) => setMeja(event.target.value)}
          className="rounded-lg border border-(--pink) px-4 py-2 text-sm text-(--coklat) outline-none focus:border-(--merah)"
        />

        {notifError}
        {notifSukses}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-(--merah) px-4 py-2 text-sm font-semibold text-white hover:bg-(--maroon)"
        >
          Kirim Pesanan
        </button>
      </form>
    </section>
  );
}

export default FormPesan;