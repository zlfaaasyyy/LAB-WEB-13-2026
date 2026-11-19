# Pustaka Senja (Praktikum 9: Next.js + PostgreSQL, raw SQL)

## Persiapan
1. Buat database: `CREATE DATABASE pustaka_senja;` (pgAdmin, terhubung ke database `postgres`).
2. Buka Query Tool pada database `pustaka_senja`, jalankan seluruh isi `database/pustaka_senja.sql`.
3. Pastikan `.env.local` di root berisi `DATABASE_URL` (jangan diunggah ke repositori).
4. `npm install` lalu `npm install pg`.
5. `npm run dev`, buka http://localhost:3000

## Route
| URL | Fungsi |
|---|---|
| `/` | Beranda + statistik dari database |
| `/katalog` | Daftar buku (SELECT), filter `?kategori=` |
| `/katalog/tambah` | Form tambah buku (INSERT, Server Action) |
| `/katalog/[id]` | Detail buku (SELECT ... WHERE id = $1) |
| `/katalog/[id]/edit` | Form edit (UPDATE ... WHERE id = $7, Server Action) |
| `/usulan` | Form usulan (tetap state lokal, seperti Praktikum 8) |

Hapus (DELETE ... WHERE id = $1) tersedia di kartu buku dan halaman detail, dengan konfirmasi.
