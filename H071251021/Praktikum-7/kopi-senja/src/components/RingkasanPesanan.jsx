function RingkasanPesanan({ itemPesanan, totalItem, totalHarga, onTambah, onKurang }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm" aria-label="Ringkasan pesanan">
      <h2 className="text-lg font-extrabold">Ringkasan Pesanan</h2>

      {itemPesanan.length === 0 ? (
        <p className="mt-3 text-sm text-kopi-600">
          Belum ada pesanan. Tekan Tambah pada menu pilihan Anda.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {itemPesanan.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <img
                src={item.gambar}
                alt=""
                className="h-12 w-12 flex-none rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{item.nama}</p>
                <p className="text-xs text-kopi-600">
                  Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center rounded-full bg-peach-100">
                <button
                  type="button"
                  onClick={() => onKurang(item.id)}
                  aria-label={"Kurangi " + item.nama}
                  className="h-8 w-8 rounded-full font-bold hover:bg-peach-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600"
                >
                  &minus;
                </button>
                <span className="w-5 text-center text-sm font-bold">{item.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(item.id)}
                  aria-label={"Tambah " + item.nama}
                  className="h-8 w-8 rounded-full font-bold hover:bg-peach-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-kopi-600"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-peach-200 pt-3 font-extrabold">
        <span>Total ({totalItem} item)</span>
        <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
