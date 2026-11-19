import { useState } from "react";

function FormPesan({ totalJumlah, onKirim }) {
  const [nama, setNama] = useState("");
  const [nomorMeja, setNomorMeja] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorMeja, setErrorMeja] = useState("");
  const [errorPesanan, setErrorPesanan] = useState("");
  const [terkirim, setTerkirim] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const namaKosong = nama.trim() === "";
    const mejaSalah =
      nomorMeja === "" ||
      Number(nomorMeja) < 1 ||
      Number(nomorMeja) > 30 ||
      Number(nomorMeja) % 1 !== 0;
    const pesananKosong = totalJumlah === 0;

    if (namaKosong) {
      setErrorNama("Nama wajib diisi.");
    } else {
      setErrorNama("");
    }

    if (mejaSalah) {
      setErrorMeja("Nomor meja harus berupa angka bulat antara 1 sampai 30.");
    } else {
      setErrorMeja("");
    }

    if (pesananKosong) {
      setErrorPesanan("Pesanan masih kosong. Tambahkan menu terlebih dahulu.");
    } else {
      setErrorPesanan("");
    }

    setTerkirim(false);

    if (namaKosong || mejaSalah || pesananKosong) {
      return;
    }

    console.log("Pesanan dikirim:", { nama, nomorMeja, totalJumlah });
    onKirim();
    setNama("");
    setNomorMeja("");
    setTerkirim(true);
  }

  return (
    <section className="rounded-3xl bg-sage-muda p-5 shadow-md">
      <h2 className="mb-3 text-xl font-extrabold text-hutan-gelap">Data Pemesan</h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm font-semibold">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Nama Anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full rounded-xl border border-sage-tua/50 bg-krem px-3 py-2 text-sm outline-none focus:border-hutan focus:ring-2 focus:ring-hutan/30"
          />
          {errorNama !== "" && (
            <p className="mt-1 text-xs font-semibold text-red-700">{errorNama}</p>
          )}
        </div>

        <div>
          <label htmlFor="nomorMeja" className="mb-1 block text-sm font-semibold">
            Nomor meja
          </label>
          <input
            id="nomorMeja"
            type="number"
            min="1"
            max="30"
            placeholder="Contoh: 5"
            value={nomorMeja}
            onChange={(e) => setNomorMeja(e.target.value)}
            className="w-full rounded-xl border border-sage-tua/50 bg-krem px-3 py-2 text-sm outline-none focus:border-hutan focus:ring-2 focus:ring-hutan/30"
          />
          {errorMeja !== "" && (
            <p className="mt-1 text-xs font-semibold text-red-700">{errorMeja}</p>
          )}
        </div>

        {errorPesanan !== "" && (
          <p className="rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-800">
            {errorPesanan}
          </p>
        )}

        <button
          type="submit"
          className="rounded-full bg-jingga px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-jingga-gelap"
        >
          Kirim Pesanan
        </button>
      </form>

      {terkirim && (
        <p className="mt-3 rounded-xl bg-hutan p-3 text-sm font-semibold text-krem">
          Terima kasih! Pesanan Anda sudah terkirim dan segera kami siapkan.
        </p>
      )}
    </section>
  );
}

export default FormPesan;