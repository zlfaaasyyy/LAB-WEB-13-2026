# Kedai Kopi Senja

Halaman pemesanan mandiri untuk tablet di meja, dibuat dengan React (Vite) dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

## Ringkasan desain

- `App.jsx` menyimpan data menu (satu kali) dan state utama: `kategoriAktif`, `pesanan` (id + jumlah), dan `pemesanTerkirim`.
- Jumlah item dan total harga dihitung dari `pesanan`, lalu dikirim ke Navbar dan RingkasanPesanan, sehingga angkanya selalu sama.
- `MenuCard` punya state lokal untuk buka/tutup detail, sehingga tidak memengaruhi menu lain.
- `FormPesan` memvalidasi nama, nomor meja, dan pesanan kosong, lalu mengosongkan form setelah terkirim.
