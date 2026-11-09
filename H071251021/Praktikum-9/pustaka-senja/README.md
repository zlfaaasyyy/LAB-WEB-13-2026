# Pustaka Senja — Ruang Baca & Perpustakaan Komunitas

Aplikasi web multi-halaman untuk ruang baca komunitas **Pustaka Senja**, dibangun menggunakan **Next.js (App Router)** dan **Tailwind CSS** sesuai ketentuan **Tugas Praktikum 8 | Framework React (Next.js Intro)**.

## Fitur Utama

1. **Root Layout & Navigasi Bersama (F1)**
   - Komponen `Navbar` dan `Footer` dipasang satu kali di `src/app/layout.jsx` mengapit `{children}` tanpa reload antar-halaman.
   - Menu navigasi (`Beranda`, `Katalog`, `Usulan Buku`) dirender dinamis menggunakan `.map()` dan komponen `<Link>`.
   - Menggunakan hook `usePathname()` dari `next/navigation` untuk mendeteksi rute aktif otomatis, termasuk mempertahankan menu *Katalog* aktif saat berada di halaman detail `/katalog/[id]`.
2. **Halaman Beranda (F2 - `/`)**
   - Komponen `Hero` menerima props nama ruang baca, slogan, dan lokasi/jam buka.
   - Statistik koleksi buku dihitung dinamis dari satu sumber data (`dataBuku.js`): Total Koleksi (9), Buku Tersedia (6), dan Sedang Dipinjam (3).
   - **Buku Favorit Tersimpan**: Menampilkan buku-buku yang telah ditandai favorit oleh pengunjung dari katalog (tersimpan persisten via `localStorage`).
   - **Daftar Buku yang Diusulkan**: Menampilkan seluruh rekomendasi judul buku yang telah dikirimkan oleh pengunjung beserta nama pengusul dan alasannya.
   - Tombol navigasi langsung menuju halaman Katalog dan Usulan Buku.
3. **Halaman Katalog Buku (F3 - `/katalog`)**
   - Daftar koleksi buku ditampilkan melalui komponen `BukuCard` dengan unique `key={buku.id}`.
   - Filter kategori interaktif (`Semua`, `Teknologi`, `Fiksi`, `Pengembangan Diri`) menggunakan `useState`.
   - Status badge ketersediaan (`Tersedia` / `Sedang Dipinjam`).
   - Tombol *Favorit/Suka* mandiri per kartu dengan sinkronisasi reaktif ke `localStorage`.
   - Tautan detail dinamis `<Link href={`/katalog/${id}`}>Lihat Detail</Link>`.
4. **Halaman Detail Buku Dinamis (F4 - `/katalog/[id]`)**
   - Menggunakan fitur App Router dynamic route `[id]`.
   - Membaca parameter `id` via `await params`.
   - Menampilkan detail lengkap buku dan sinopsis dari `dataBuku.js`.
   - Menangani kasus id tidak ditemukan (misal: `/katalog/99`) dengan pesan pemberitahuan ramah dan tombol kembali ke katalog.
5. **Halaman Usulan Buku (F5 - `/usulan`)**
   - Formulir interaktif (controlled component dengan `useState`) dengan validasi input (setelah di-`trim()`).
   - Mencegah reload dengan `e.preventDefault()`.
   - Pesan konfirmasi keberhasilan/peringatan kesalahan langsung di layar.
   - Menyimpan seluruh riwayat usulan buku secara persisten (`localStorage`) dan menampilkannya di halaman usulan serta di beranda.

## Struktur Berkas

```text
pustaka-senja/
├── public/
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── data/
    │   └── dataBuku.js             # Satu sumber data (9 objek buku)
    ├── components/
    │   ├── Navbar.jsx              # Navigasi (<Link> & usePathname - "use client")
    │   ├── Hero.jsx                # Banner halaman beranda (Server Component)
    │   ├── BukuCard.jsx            # Kartu buku + tombol favorit ("use client")
    │   ├── BerandaAktivitas.jsx    # Favorit tersimpan & buku usulan ("use client")
    │   └── Footer.jsx              # Footer bersama (Server Component)
    └── app/
        ├── globals.css             # Konfigurasi Tailwind CSS
        ├── layout.jsx              # Root Layout (Navbar + {children} + Footer)
        ├── page.jsx                # Route "/" (Beranda + statistik koleksi + aktivitas)
        ├── katalog/
        │   ├── page.jsx            # Route "/katalog" (Filter kategori + daftar buku)
        │   └── [id]/
        │       └── page.jsx        # Route "/katalog/[id]" (Detail buku dinamis)
        └── usulan/
            └── page.jsx            # Route "/usulan" (Form usulan buku persisten)
```

## Menjalankan Proyek

```bash
npm run dev
```

Buka peramban di [http://localhost:3000](http://localhost:3000).
