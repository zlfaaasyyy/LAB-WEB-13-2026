const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

const BATAS_LULUS = 75;
const KODE_ASISTEN = "ALIM09";
const MAKS_PERCOBAAN = 3;


function verifikasiAsisten() {
  for (let i = 1; i <= MAKS_PERCOBAAN; i++) {
    const input = prompt(
      "Verifikasi Asisten Lab\nMasukkan kode asisten (percobaan " + i + " dari " + MAKS_PERCOBAAN + "):"
    );
    if (input === null) return false;
    if (input.trim() === KODE_ASISTEN) return true;
    alert("Kode salah. Silakan coba lagi.");
  }
  return false;
}


function hitungRataRata(nilai) {
  const total = nilai.reduce((jumlah, n) => jumlah + n, 0);
  return total / nilai.length;
}

function tentukanStatus(rataRata) {
  return rataRata >= BATAS_LULUS ? "Lulus" : "Tidak Lulus";
}

function tentukanPredikat(rataRata) {
  if (rataRata >= 85) return "A";
  if (rataRata >= 75) return "B";
  if (rataRata >= 60) return "C";
  return "D";
}

function prosesData(data) {
  return data.map(function (praktikan) {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: Number(rataRata.toFixed(2)),
      predikat: tentukanPredikat(rataRata),
      status: tentukanStatus(rataRata)
    };
  });
}

function muatTailwind() {
  document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
}

function buatKartu(p) {
  const lulus = p.status === "Lulus";

  const kelasKartu = lulus
    ? "cursor-pointer rounded-[10px] border border-[#d9e0e6] border-t-[5px] border-t-[#1f7a4d] bg-white p-5 transition duration-[250ms] ease-in-out hover:-translate-y-1.5 hover:border-x-[#b8c5d0] hover:border-b-[#b8c5d0] hover:shadow-[0_14px_28px_rgba(31,122,77,0.15)]"
    : "cursor-pointer rounded-[10px] border border-[#d9e0e6] border-t-[5px] border-t-[#b3372c] bg-white p-5 transition duration-[250ms] ease-in-out hover:-translate-y-1.5 hover:border-x-[#b8c5d0] hover:border-b-[#b8c5d0] hover:shadow-[0_14px_28px_rgba(23,50,77,0.12)]";

  const kelasBadge = lulus
    ? "rounded-full bg-[#e2f4ea] px-3 py-[3px] text-[.85rem] font-semibold text-[#1f7a4d]"
    : "rounded-full bg-[#fbe7e4] px-3 py-[3px] text-[.85rem] font-semibold text-[#b3372c]";

  const kelasBar = lulus ? "h-full bg-[#1f7a4d]" : "h-full bg-[#b3372c]";

  const daftarTugas = p.nilaiTugas
    .map(function (n, i) {
      return '<span class="rounded-md border border-[#d9e0e6] bg-[#f3f5f7] px-2.5 py-[3px] text-[.9rem]">Tugas ' + (i + 1) + ": <b>" + n + "</b></span>";
    })
    .join("");

  return `
    <article class="${kelasKartu}">
      <div class="mb-3.5 flex items-center justify-between">
        <h2 class="m-0 text-[1.25rem] font-bold">${p.nama}</h2>
        <span class="${kelasBadge}">${p.status}</span>
      </div>
      <div class="flex items-baseline gap-2.5">
        <strong class="text-[2.4rem]">${p.rataRata}</strong>
        <span class="text-[#5d6b79]">rata-rata &middot; predikat ${p.predikat}</span>
      </div>
      <div class="mb-4 mt-3 h-2 overflow-hidden rounded-full bg-[#d9e0e6]">
        <div class="${kelasBar}" style="width:${p.rataRata}%"></div>
      </div>
      <div class="flex flex-wrap gap-2">${daftarTugas}</div>
    </article>`;
}

function renderLaporan(hasil) {
  const jumlahLulus = hasil.filter(function (p) { return p.status === "Lulus"; }).length;
  const jumlahTidak = hasil.length - jumlahLulus;
  const rataKelas = hitungRataRata(hasil.map(function (p) { return p.rataRata; })).toFixed(2);

  const kelasStat = "rounded-[10px] border border-[#d9e0e6] bg-white px-[18px] py-4";
  const kelasLabel = "block text-[.85rem] text-[#5d6b79]";
  const kelasAngka = "text-[1.7rem] font-bold";

  document.write(`
    <div class="min-h-screen bg-[#f3f5f7] font-['Segoe_UI',system-ui,-apple-system,sans-serif] leading-normal text-[#1b2733]">
      <header class="bg-[#17324d] px-5 pb-16 pt-9 text-white">
        <div class="mx-auto max-w-[1040px]">
          <h1 class="mb-1.5 mt-0 text-[1.9rem] font-bold">Laporan Evaluasi Praktikum</h1>
          <p class="m-0 text-[#c3d2e0]">Batas kelulusan: rata-rata nilai tugas ${BATAS_LULUS} ke atas</p>
        </div>
      </header>
      <main class="-mt-10 px-5 pb-12">
        <div class="mx-auto max-w-[1040px]">
          <section class="mb-[26px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
            <div class="${kelasStat}"><span class="${kelasLabel}">Jumlah praktikan</span><strong class="${kelasAngka}">${hasil.length}</strong></div>
            <div class="${kelasStat}"><span class="${kelasLabel}">Lulus</span><strong class="${kelasAngka} text-[#1f7a4d]">${jumlahLulus}</strong></div>
            <div class="${kelasStat}"><span class="${kelasLabel}">Tidak lulus</span><strong class="${kelasAngka} text-[#b3372c]">${jumlahTidak}</strong></div>
            <div class="${kelasStat}"><span class="${kelasLabel}">Rata-rata kelas</span><strong class="${kelasAngka}">${rataKelas}</strong></div>
          </section>
          <section class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[18px]">
            ${hasil.map(buatKartu).join("")}
          </section>
        </div>
      </main>
      <footer class="pb-7 text-center text-[.85rem] text-[#5d6b79]">Diverifikasi oleh Asisten Lab</footer>
    </div>
  `);
}

function renderAksesDitolak() {
  document.write(`
    <div class="mx-auto my-[15vh] max-w-[420px] rounded-[10px] border border-[#d9e0e6] p-7 text-center font-['Segoe_UI',sans-serif]">
      <h2 class="mt-0 text-[1.5rem] font-bold text-[#b3372c]">Akses ditolak</h2>
      <p>Kode asisten lab tidak valid. Muat ulang halaman untuk mencoba lagi.</p>
    </div>`);
}


muatTailwind();

if (verifikasiAsisten()) {
  const hasilAkhir = prosesData(dataPraktikan);
  renderLaporan(hasilAkhir);
  console.log(hasilAkhir);
} else {
  renderAksesDitolak();
}