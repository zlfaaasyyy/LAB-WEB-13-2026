import { notFound } from "next/navigation";
import FormBuku from "@/components/FormBuku";
import { ambilBukuById } from "@/lib/queries";
import { ubahBuku } from "@/app/katalog/actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  const buku = await ambilBukuById(id);

  if (!buku) {
    notFound();
  }

  // Mengikat id ke Server Action: ubahBuku(id, prevState, formData)
  const aksiUbah = ubahBuku.bind(null, buku.id);

  return (
    <section className="mx-auto max-w-4xl rounded-[28px] border border-[#d9d0c4] bg-[#faf8f3] p-6 shadow-[0_18px_60px_rgba(78,51,37,0.12)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a64f37]">
          Koleksi Kami
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#29251f]">
          Edit Buku
        </h1>
        <p className="mt-2 text-sm text-[#695f57]">
          Ubah informasi buku &quot;{buku.judul}&quot;.
        </p>
      </div>
      <FormBuku
        aksi={aksiUbah}
        buku={buku}
        labelTombol="Simpan Perubahan"
        hrefBatal={`/katalog/${buku.id}`}
      />
    </section>
  );
}
