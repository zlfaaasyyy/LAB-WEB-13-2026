function RingkasanPesanan({ itemPesanan, jumlahItem, totalHarga, onKurangi, onTambah, onHapus }) {
  let ringkasan;

  if (itemPesanan.length === 0) {
    ringkasan = (
      <p className="text-sm text-(--coklat)">Belum ada pesanan.</p>
    );
  } else {
    ringkasan = (
      <ul className="flex flex-col gap-4">
        {itemPesanan.map((itemKeranjang) => (
          <li
            key={itemKeranjang.id}
            className="flex flex-col gap-2 border-b border-white/60 pb-4 last:border-0"
          >
            {/* nama menu dan total harga */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-(--maroon)">
                {itemKeranjang.nama}
              </p>
              <p className="text-sm font-bold text-(--maroon)">
                Rp {(itemKeranjang.harga * itemKeranjang.jumlah).toLocaleString("id-ID")}
              </p>
            </div>
            
            {/* harga satuan dan tombol */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-(--coklat)">
                {itemKeranjang.jumlah} x Rp {itemKeranjang.harga.toLocaleString("id-ID")}
              </p>
              
              {/* kurang angka tambah */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onKurangi(itemKeranjang.id)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-bold text-(--merah) hover:bg-(--pink)"
                >
                  -
                </button>
                <span className="w-4 text-center text-sm font-bold text-(--maroon)">
                  {itemKeranjang.jumlah}
                </span>

                <button
                  onClick={() => onTambah(itemKeranjang.id)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-lg font-bold text-(--merah) hover:bg-(--pink)"
                >
                  +
                </button>

                <button
                  onClick={() => onHapus(itemKeranjang.id)}
                  className="ml-2 cursor-pointer rounded-full bg-(--merah) px-4 py-1.5 text-xs font-bold text-white hover:bg-(--maroon)"
                >
                  Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="rounded-2xl border border-(--pink) bg-(--pink--muda) p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-(--maroon)">
        Ringkasan <span className="text-(--merah)">Pesanan</span>
      </h2>

      {ringkasan}

      <div className="mt-4 flex items-center justify-between border-t-2 border-(--merah) pt-4 text-(--maroon)">
        <p className="text-sm">Total ({jumlahItem} item)</p>
        <p className="text-xl font-bold text-(--merah)">
          Rp{totalHarga.toLocaleString("id-ID")}
        </p>
      </div>
    </section>
  );
}

export default RingkasanPesanan;