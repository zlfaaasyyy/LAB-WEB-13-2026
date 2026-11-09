# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja, dibuat dengan React (Vite), JavaScript (JSX), dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Pembagian state

| State | Lokasi | Alasan |
| --- | --- | --- |
| `kategoriAktif` | `App` | Dipakai Navbar (tombol) dan daftar menu (filter) |
| `pesanan` | `App` | Dipakai Navbar, Ringkasan, MenuList, dan Form |
| `pesananTerkirim` | `App` | Dipakai Form untuk ucapan terima kasih |
| `detailTerbuka` | `MenuCard` | Milik tiap kartu, tidak memengaruhi kartu lain |
| `nama`, `meja`, `galat` | `FormPesan` | Hanya dipakai form |

Jumlah item dan total harga **tidak** disimpan sebagai state. Keduanya dihitung dari `pesanan` di `App`, sehingga Navbar dan Ringkasan selalu menampilkan angka yang sama.

## Aturan validasi form

- Nama: wajib, minimal 3 karakter, hanya huruf.
- Nomor meja: wajib, angka 1 sampai 20.
- Pesanan tidak boleh kosong.
