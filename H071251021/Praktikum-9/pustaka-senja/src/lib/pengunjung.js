import "server-only";
import { cookies } from "next/headers";

// Tanpa sistem login, pengunjung dikenali lewat cookie anonim berisi UUID acak.
// Favorit disimpan di database dengan UUID ini sebagai kuncinya.
const NAMA_COOKIE = "pustaka_pengunjung";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Hanya membaca (aman dipanggil dari Server Component).
export async function idPengunjung() {
  const nilai = (await cookies()).get(NAMA_COOKIE)?.value;
  return nilai && UUID.test(nilai) ? nilai : null;
}

// Membaca, atau membuat dan menyimpan cookie baru. Hanya boleh dari Server Action.
export async function pastikanIdPengunjung() {
  const ada = await idPengunjung();
  if (ada) return ada;
  const baru = crypto.randomUUID();
  (await cookies()).set(NAMA_COOKIE, baru, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return baru;
}
