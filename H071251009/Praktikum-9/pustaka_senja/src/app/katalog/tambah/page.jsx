import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBukuPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[28px] border border-[#d9d0c4] bg-[#faf8f3] p-6 shadow-[0_18px_60px_rgba(78,51,37,0.12)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a64f37]">
          Koleksi Kami
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#29251f]">
          Tambah Buku
        </h1>
        <p className="mt-2 text-sm text-[#695f57]">
          Lengkapi informasi buku untuk menambahkannya ke katalog Pustaka Senja.
        </p>
      </div>
      <FormBuku aksi={tambahBuku} labelTombol="Simpan Buku" hrefBatal="/katalog" />
    </section>
  );
}
