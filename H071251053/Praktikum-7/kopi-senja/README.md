# Kedai Kopi Senja

Tugas Praktikum 7 — React Hooks (State & Props). Halaman pemesanan mandiri
untuk Kedai Kopi Senja, dibuat dengan React (Vite), JavaScript (JSX), function
component, dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

## Struktur

```
kopi-senja/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx                  (data menu + state utama)
    └── components/
        ├── Navbar.jsx           (kategori + jumlah & total pesanan)
        ├── MenuList.jsx         (daftar menu sesuai kategori)
        ├── MenuCard.jsx         (satu menu, state detail sendiri)
        ├── RingkasanPesanan.jsx (daftar pesanan + total)
        ├── FormPesan.jsx        (nama, nomor meja, validasi)
        └── Footer.jsx
```

## Pembagian state

| State            | Dimiliki oleh | Dipakai oleh                                        |
| ---------------- | ------------- | --------------------------------------------------- |
| `kategoriAktif`  | App           | Navbar, MenuList, Footer (lewat props)              |
| `pesanan`        | App           | Navbar, MenuList, RingkasanPesanan, FormPesan, Footer |
| `terbuka`        | MenuCard      | MenuCard itu sendiri (tiap kartu punya sendiri)     |
| `nama`, `nomorMeja`, `error*`, `terkirim` | FormPesan | FormPesan |

Jumlah item dan total harga **tidak disimpan sebagai state**; keduanya dihitung
dari `pesanan` di App, lalu dikirim lewat props sehingga angkanya selalu sama
di Navbar, Ringkasan, dan Footer.
