function RingkasanPesanan({ itemPesanan, totalJumlah, totalHarga, onTambah, onKurangi }) {
  return (
    <section className="rounded-3xl bg-sage-muda p-5 shadow-md">
      <h2 className="mb-3 text-xl font-extrabold text-hutan-gelap">Ringkasan Pesanan</h2>

      {totalJumlah === 0 ? (
        <p className="rounded-xl bg-krem p-3 text-sm text-tinta/70">
          Belum ada pesanan. Tekan Tambah pada menu yang Anda inginkan.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {itemPesanan.map(
            (item) =>
              item.jumlah > 0 && (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 rounded-xl bg-krem p-3"
            >
              <div>
                <p className="text-sm font-bold">{item.nama}</p>
                <p className="text-xs text-tinta/70">
                  Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onKurangi(item.id, item.harga)}
                  aria-label={"Kurangi " + item.nama}
                  className="h-7 w-7 rounded-full bg-sage font-bold text-hutan-gelap hover:bg-sage-tua"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-bold">{item.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(item.id, item.harga)}
                  aria-label={"Tambah " + item.nama}
                  className="h-7 w-7 rounded-full bg-hutan font-bold text-krem hover:bg-hutan-gelap"
                >
                  +
                </button>
              </div>
            </li>
          )
          )}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-sage-tua/40 pt-3">
        <p className="text-sm font-semibold">{totalJumlah} item</p>
        <p className="text-lg font-extrabold text-hutan-gelap">
          Rp {totalHarga.toLocaleString("id-ID")}
        </p>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
