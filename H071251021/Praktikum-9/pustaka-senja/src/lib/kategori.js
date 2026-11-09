// Warna sampul diturunkan dari kategori. Kategori baru otomatis mendapat
// hue dari hash teksnya, jadi tidak perlu daftar tetap.
const HUE_TETAP = { teknologi: 205, fiksi: 8, "pengembangan diri": 42 };

export function hueKategori(kategori = "") {
  const k = String(kategori).trim().toLowerCase();
  if (k in HUE_TETAP) return HUE_TETAP[k];
  let h = 0;
  for (const c of k) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}
