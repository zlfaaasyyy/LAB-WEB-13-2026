import { useState } from "react";

function FormPesan({ jumlahItem, terkirim, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [percobaan, setPercobaan] = useState(false);

  const namaError = nama.trim().length < 2 ? "Nama minimal 2 karakter." : "";
  const mejaError =
    /^\d+$/.test(meja.trim()) && Number(meja) >= 1
      ? ""
      : "Nomor meja harus berupa angka, minimal 1.";
  const pesananError = jumlahItem === 0 ? "Pesanan masih kosong. Pilih menu terlebih dahulu." : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (namaError || mejaError || pesananError) {
      setPercobaan(true);
      return;
    }
    onKirim({ nama: nama.trim(), meja: Number(meja) });
    setNama("");
    setMeja("");
    setPercobaan(false);
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-peach-300 bg-peach-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kopi-600";

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm" aria-label="Form pemesanan">
      <h2 className="text-lg font-extrabold">Kirim Pesanan</h2>

      <form onSubmit={handleSubmit} noValidate className="mt-3 flex flex-col gap-3">
        <label className="text-sm font-semibold">
          Nama
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            className={inputClass}
          />
          {percobaan && namaError && (
            <span className="mt-1 block text-sm font-normal text-red-700">{namaError}</span>
          )}
        </label>

        <label className="text-sm font-semibold">
          Nomor meja
          <input
            type="text"
            inputMode="numeric"
            value={meja}
            onChange={(e) => setMeja(e.target.value)}
            placeholder="Contoh: 7"
            className={inputClass}
          />
          {percobaan && mejaError && (
            <span className="mt-1 block text-sm font-normal text-red-700">{mejaError}</span>
          )}
        </label>

        {percobaan && pesananError && (
          <p role="alert" className="text-sm text-red-700">{pesananError}</p>
        )}

        <button
          type="submit"
          className="rounded-full bg-kopi-600 px-5 py-2.5 font-bold text-white transition-colors hover:bg-kopi-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600 focus-visible:ring-offset-2"
        >
          Kirim pesanan
        </button>
      </form>

      {terkirim && (
        <p role="status" className="mt-3 rounded-lg bg-green-100 p-3 text-sm font-semibold text-green-900">
          Terima kasih, pesanan Anda sudah terkirim!
        </p>
      )}
    </section>
  );
}

export default FormPesan;
