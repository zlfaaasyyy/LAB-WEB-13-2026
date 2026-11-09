"use client";
import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  
  const [errorNama, setErrorNama] = useState("");
  const [errorJudul, setErrorJudul] = useState("");
  const [errorKategori, setErrorKategori] = useState("");
  const [errorAlasan, setErrorAlasan] = useState("");
  
  const [berhasil, setBerhasil] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    let adaError = false;

    // kasi kosong error setiap tombol kirim ditekan
    setErrorNama("");
    setErrorJudul("");
    setErrorKategori("");
    setErrorAlasan("");

    
    if (nama.trim() === "") {
      setErrorNama("Wajib isi nama pengusul");
      adaError = true;
    } else {
      let hitungHuruf = 0;
      for (let i = 0; i < nama.length; i++) {
        let karakter = nama[i];
        if (karakter >= "a") {
          if (karakter <= "z") {
            hitungHuruf = hitungHuruf + 1;
          }
        } else if (karakter >= "A") {
          if (karakter <= "Z") {
            hitungHuruf = hitungHuruf + 1;
          }
        }
      }
      if (hitungHuruf < 2) {
        setErrorNama("Nama minimal harus memiliki 2 huruf abjad");
        adaError = true;
      }
    }

    
    if (judul.trim() === "") {
      setErrorJudul("Wajib isi judul buku yang diusulkan");
      adaError = true;
    }

    if (kategori.trim() === "") {
      setErrorKategori("Wajib pilih kategori");
      adaError = true;
    }

    if (alasan.trim() === "") {
      setErrorAlasan("Wajib isi alasan usulan");
      adaError = true;
    } else if (alasan.trim().length < 10) {
      setErrorAlasan("Alasan usulan minimal harus 10 karakter");
      adaError = true;
    }

    if (adaError === true) {
      setBerhasil(false);
      return;
    }

    const usulanBaru = {
      id: Date.now(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setBerhasil(true);
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  function tampilErrorNama() {
    if (errorNama !== "") {
      return <p className="mt-1 text-sm font-semibold text-red-600">{errorNama}</p>;
    }
  }

  function tampilErrorJudul() {
    if (errorJudul !== "") {
      return <p className="mt-1 text-sm font-semibold text-red-600">{errorJudul}</p>;
    }
  }

  function tampilErrorKategori() {
    if (errorKategori !== "") {
      return <p className="mt-1 text-sm font-semibold text-red-600">{errorKategori}</p>;
    }
  }

  function tampilErrorAlasan() {
    if (errorAlasan !== "") {
      return <p className="mt-1 text-sm font-semibold text-red-600">{errorAlasan}</p>;
    }
  }

  function tampilBerhasil() {
    if (berhasil) {
      return (
        <p className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-center text-sm text-green-700">
          Terima kasih, usulan Anda berhasil dikirim!
        </p>
      );
    }
  }

  function tampilDaftarUsulan() {
    if (daftarUsulan.length > 0) {
      return (
        <div className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-(--maroon)">
            Usulan Terkirim
          </h2>
          <div className="space-y-3">
            {daftarUsulan.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-(--merah) bg-(--pink--muda) p-4"
              >
                <p className="font-bold text-(--maroon)">{item.judul}</p>
                <p className="text-xs font-semibold text-(--merah)">
                  {item.kategori} diusulkan oleh {item.nama}
                </p>
                <p className="mt-1 text-sm text-(--coklat)">{item.alasan}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  const inputClass =
    "w-full rounded-lg border border-(--merah) bg-white px-4 py-2 text-(--coklat)";

  return (
    <section className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-(--merah) bg-white p-6 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-(--maroon)">
          Usulan Buku
          </h1>
        <p className="mb-6 text-sm text-(--coklat)">
          Ingin buku tertentu ada di Pustaka Senja? Usulkan di sini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-(--maroon)">
              Nama Pengusul
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(event) => {
                setNama(event.target.value);
                setErrorNama("");
              }}
              className={inputClass}/>
            {tampilErrorNama()}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-(--maroon)">
              Judul Buku yang Diusulkan
            </label>
            <input
              type="text"
              placeholder="Contoh: Pemrograman Web Modern"
              value={judul}
              onChange={(event) => {
                setJudul(event.target.value);
                setErrorJudul("");
              }}
              className={inputClass}
            />
            {tampilErrorJudul()}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-(--maroon)">
              Kategori
            </label>
            <select
              value={kategori}
              onChange={(event) => {
                setKategori(event.target.value);
                setErrorKategori("");
              }}
              className={inputClass}>
              <option value="">-- Pilih kategori --</option>
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {tampilErrorKategori()}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-(--maroon)">
              Alasan Usulan
            </label>
            <textarea
              rows={4}
              placeholder="Kenapa buku ini perlu ada?"
              value={alasan}
              onChange={(event) => {
                setAlasan(event.target.value);
                setErrorAlasan("");
              }}
              className={inputClass}/>
            {tampilErrorAlasan()}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-(--merah) py-2.5 font-semibold text-white hover:bg-(--maroon)">
            Kirim Usulan
          </button>
        </form>

        {tampilBerhasil()}
      </div>

      {tampilDaftarUsulan()}
    </section>
  );
}