// Zona waktu tetap agar server dan browser menampilkan jam yang sama.
export function formatWaktu(tanggal) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Makassar",
  }).format(new Date(tanggal));
}
