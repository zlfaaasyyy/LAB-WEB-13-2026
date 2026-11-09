export default function RingkasanPesanan({
  itemPesanan,
  jumlahItem,
  totalHarga,
  onTambah,
  onKurang,
  onHapus,
}) {
  return (
    <section aria-label="Ringkasan pesanan" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10">
      <h2 className="font-display text-xl font-bold">Pesanan Anda</h2>

      {itemPesanan.length === 0 ? (
        <p className="mt-3 text-sm text-ink/60">
          Belum ada pesanan. Pilih menu di sebelah kiri lalu tekan Tambah.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-ink/10">
          {itemPesanan.map((item) => (
            <li key={item.id} className="py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{item.nama}</span>
                <span className="text-sm font-medium tabular-nums">
                  Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Kurangi ${item.nama}`}
                    onClick={() => onKurang(item.id)}
                    className="h-7 w-7 rounded-md bg-kabut font-bold hover:bg-senja"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-medium tabular-nums">{item.jumlah}</span>
                  <button
                    type="button"
                    aria-label={`Tambah ${item.nama}`}
                    onClick={() => onTambah(item.id)}
                    className="h-7 w-7 rounded-md bg-kabut font-bold hover:bg-senja"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onHapus(item.id)}
                  className="text-sm text-bata underline underline-offset-4"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-end justify-between border-t-2 border-dotted border-ink/25 pt-4">
        <span className="text-sm text-ink/70">{jumlahItem} item</span>
        <span className="font-display text-2xl font-bold tabular-nums">
          Rp {totalHarga.toLocaleString('id-ID')}
        </span>
      </div>
    </section>
  )
}
