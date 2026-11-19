# Pustaka Senja — Tugas Praktikum 8 (Next.js Intro)

Aplikasi multi-halaman ruang baca Pustaka Senja menggunakan Next.js (App Router) dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Halaman

| URL | Berkas | Keterangan |
| --- | --- | --- |
| `/` | `src/app/page.jsx` | Hero + ringkasan koleksi |
| `/katalog` | `src/app/katalog/page.jsx` | Filter kategori + daftar buku |
| `/katalog/[id]` | `src/app/katalog/[id]/page.jsx` | Detail buku dinamis |
| `/usulan` | `src/app/usulan/page.jsx` | Form usulan buku |

Gambar sampul ada di `public/buku/[id].svg`, ilustrasi banner di `public/hero.svg`.
