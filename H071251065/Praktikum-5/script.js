const API = "https://jsonplaceholder.typicode.com";

const statusAnggota = document.getElementById("statusAnggota");
const daftarAnggota = document.getElementById("daftarAnggota");
const placeholder = document.getElementById("placeholder");
const panelTugas = document.getElementById("panelTugas");
const judulTugas = document.getElementById("judulTugas");
const ringkasan = document.getElementById("ringkasan");
const progressBar = document.getElementById("progressBar");
const cari = document.getElementById("cari");
const formTambah = document.getElementById("formTambah");
const inputJudul = document.getElementById("inputJudul");
const tombolSimpan = document.getElementById("tombolSimpan");
const pesanForm = document.getElementById("pesanForm");
const notifikasi = document.getElementById("notifikasi");
const statusTugas = document.getElementById("statusTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanKosong = document.getElementById("pesanKosong");

let anggotaTerpilih = null;
let tombolTerpilih = null;
let nomorPermintaan = 0; 
let timerNotifikasi = null;

// Kelas penanda anggota terpilih
const KELAS_TOMBOL_PILIH = ["bg-blue-50", "text-blue-700", "font-semibold"];
const KELAS_TOMBOL_BIASA = ["text-gray-700", "hover:bg-gray-50"];
const KELAS_BADGE_PILIH = ["bg-blue-600", "text-white"];
const KELAS_BADGE_BIASA = ["bg-gray-100", "text-gray-500"];

//Daftar anggota 
async function muatAnggota() {
  statusAnggota.className = "mt-2 text-sm text-gray-500";
  statusAnggota.textContent = "Memuat anggota...";
  try {
    const respons = await fetch(API + "/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    const anggota = await respons.json();

    daftarAnggota.innerHTML = "";
    anggota.forEach((orang, indeks) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className =
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm " + KELAS_TOMBOL_BIASA.join(" ");

      const badge = document.createElement("span");
      badge.className =
        "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold " +
        KELAS_BADGE_BIASA.join(" ");
      badge.textContent = String(indeks + 1).padStart(2, "0");

      const nama = document.createElement("span");
      nama.className = "truncate";
      nama.textContent = orang.name;

      tombol.appendChild(badge);
      tombol.appendChild(nama);
      tombol.addEventListener("click", () => pilihAnggota(orang, tombol));
      daftarAnggota.appendChild(tombol);
    });
    statusAnggota.textContent = "";
  } catch (error) {
    statusAnggota.className = "mt-2 text-sm text-red-600";
    statusAnggota.textContent = "Gagal memuat anggota: " + error.message;
  }
}

function aturPenanda(tombol, aktif) {
  const badge = tombol.querySelector("span");
  if (aktif) {
    tombol.classList.remove(...KELAS_TOMBOL_BIASA);
    tombol.classList.add(...KELAS_TOMBOL_PILIH);
    badge.classList.remove(...KELAS_BADGE_BIASA);
    badge.classList.add(...KELAS_BADGE_PILIH);
  } else {
    tombol.classList.remove(...KELAS_TOMBOL_PILIH);
    tombol.classList.add(...KELAS_TOMBOL_BIASA);
    badge.classList.remove(...KELAS_BADGE_PILIH);
    badge.classList.add(...KELAS_BADGE_BIASA);
  }
}

//Tugas anggota
function aturFormAktif(aktif) {
  inputJudul.disabled = !aktif;
  tombolSimpan.disabled = !aktif;
  cari.disabled = !aktif;
}

async function pilihAnggota(orang, tombol) {
  if (tombolTerpilih) {
    aturPenanda(tombolTerpilih, false);
  }
  aturPenanda(tombol, true);
  tombolTerpilih = tombol;
  anggotaTerpilih = orang;

  const nomor = ++nomorPermintaan;

  placeholder.classList.add("hidden");
  panelTugas.classList.remove("hidden");
  judulTugas.textContent = "Tugas " + orang.name;
  ringkasan.textContent = "";
  progressBar.style.width = "0%";
  daftarTugas.innerHTML = "";
  cari.value = "";
  inputJudul.value = "";
  sembunyikanPesanForm();
  pesanKosong.classList.add("hidden");
  aturFormAktif(false);

  statusTugas.className = "mt-4 text-sm text-gray-500";
  statusTugas.textContent = "Memuat tugas...";

  try {
    const respons = await fetch(API + "/todos?userId=" + orang.id);
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    const tugas = await respons.json();
    if (nomor !== nomorPermintaan) return; // pengguna sudah pindah anggota

    tugas.forEach((item) => {
      daftarTugas.appendChild(buatItemTugas(item.title, item.completed));
    });
    statusTugas.textContent = "";
    aturFormAktif(true);
    perbaruiRingkasan();
    terapkanFilter();
  } catch (error) {
    if (nomor !== nomorPermintaan) return;
    statusTugas.className = "mt-4 text-sm text-red-600";
    statusTugas.textContent = "Gagal memuat tugas: " + error.message;
  }
}

function tandaiSelesaiTampilan(li) {
  li.dataset.selesai = "true";
  const lingkaran = li.querySelector("[data-peran='lingkaran']");
  const judul = li.querySelector("[data-peran='judul']");
  lingkaran.classList.remove("border-gray-300");
  lingkaran.classList.add("border-green-600", "bg-green-600");
  lingkaran.textContent = "✓";
  judul.classList.add("line-through", "text-gray-400");
}

function batalkanSelesaiTampilan(li) {
  li.dataset.selesai = "false";
  const lingkaran = li.querySelector("[data-peran='lingkaran']");
  const judul = li.querySelector("[data-peran='judul']");
  lingkaran.classList.remove("border-green-600", "bg-green-600");
  lingkaran.classList.add("border-gray-300");
  lingkaran.textContent = "";
  judul.classList.remove("line-through", "text-gray-400");
}

function buatItemTugas(judul, selesai) {
  const li = document.createElement("li");
  li.className = "flex items-center gap-3 border-b border-gray-200 px-2 py-3";
  li.dataset.selesai = "false";
  li.dataset.judul = judul;

  const lingkaran = document.createElement("span");
  lingkaran.dataset.peran = "lingkaran";
  lingkaran.className =
    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 text-[10px] leading-none text-white";

  const teks = document.createElement("span");
  teks.dataset.peran = "judul";
  teks.className = "min-w-0 flex-1 text-sm";
  teks.textContent = judul;

  li.appendChild(lingkaran);
  li.appendChild(teks);

  const tombolSelesai = document.createElement("button");
  tombolSelesai.type = "button";
  tombolSelesai.className = "text-xs text-gray-500 hover:text-green-700";
  tombolSelesai.textContent = "Tandai selesai";
  
  const tombolBatal = document.createElement("button");
  tombolBatal.type = "button";
  tombolBatal.className = "text-xs text-gray-500 hover:text-amber-600";
  tombolBatal.textContent = "Batalkan selesai";
  tombolBatal.addEventListener("click", () => {
    batalkanSelesaiTampilan(li);
    tombolBatal.remove();
    li.insertBefore(tombolSelesai, tombolHapus); 
    perbaruiRingkasan();
  });

  tombolSelesai.addEventListener("click", () => {
    tandaiSelesaiTampilan(li);
    tombolSelesai.remove();
    li.insertBefore(tombolBatal, tombolHapus); 
    perbaruiRingkasan();
  });

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = "text-xs text-gray-500 hover:text-red-600";
  tombolHapus.textContent = "Hapus";
  tombolHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanFilter();
  });

  if (selesai) {
    tandaiSelesaiTampilan(li);
    li.appendChild(tombolBatal);
  } else {
    li.appendChild(tombolSelesai);
  }
  li.appendChild(tombolHapus);
  return li;
}

function perbaruiRingkasan() {
  const semua = daftarTugas.children.length;
  let selesai = 0;
  Array.from(daftarTugas.children).forEach((li) => {
    if (li.dataset.selesai === "true") selesai++;
  });
  ringkasan.textContent = selesai + " dari " + semua + " tugas selesai";
  const persen = semua === 0 ? 0 : Math.round((selesai / semua) * 100);
  progressBar.style.width = persen + "%";
}

// Pencarian
function terapkanFilter() {
  const kata = cari.value.trim().toLowerCase();
  const semua = Array.from(daftarTugas.children);
  let tampil = 0;

  semua.forEach((li) => {
    const cocok = li.dataset.judul.toLowerCase().includes(kata);
    if (cocok) {
      li.classList.remove("hidden");
      tampil++;
    } else {
      li.classList.add("hidden");
    }
  });

  const sedangMemuat = statusTugas.textContent !== "";
  if (semua.length > 0 && tampil === 0) {
    pesanKosong.textContent = "Tidak ada tugas yang cocok.";
    pesanKosong.classList.remove("hidden");
  } else if (semua.length === 0 && !sedangMemuat) {
    pesanKosong.textContent = "Belum ada tugas.";
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
  }
}

cari.addEventListener("input", terapkanFilter);

//Tambah tugas
function tampilkanPesanForm(teks) {
  pesanForm.textContent = teks;
  pesanForm.classList.remove("hidden");
}

function sembunyikanPesanForm() {
  pesanForm.textContent = "";
  pesanForm.classList.add("hidden");
}

function tampilkanNotifikasi(teks) {
  clearTimeout(timerNotifikasi);
  notifikasi.textContent = teks;
  notifikasi.classList.remove("hidden");
  timerNotifikasi = setTimeout(() => {
    notifikasi.textContent = "";
    notifikasi.classList.add("hidden");
  }, 3000);
}

function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = Array.from(daftarTugas.children).some(
        (li) => li.dataset.judul.trim().toLowerCase() === judul.toLowerCase()
      );
      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

formTambah.addEventListener("submit", async (event) => {
  event.preventDefault();
  sembunyikanPesanForm();

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    tampilkanPesanForm("Judul tugas minimal 5 karakter (tidak termasuk spasi di awal dan akhir).");
    return;
  }

  const idSaatSimpan = anggotaTerpilih.id;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);
    if (!anggotaTerpilih || anggotaTerpilih.id !== idSaatSimpan) return; // anggota sudah berganti

    daftarTugas.prepend(buatItemTugas(tugasBaru.title, tugasBaru.completed));
    inputJudul.value = "";
    perbaruiRingkasan();
    terapkanFilter();
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    tampilkanPesanForm(error.message);
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = inputJudul.disabled;
  }
});

muatAnggota();