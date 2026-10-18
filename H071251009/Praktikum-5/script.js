// ini inisiasi awal
const API = "https://jsonplaceholder.typicode.com";

const daftarAnggota = document.getElementById("daftar-anggota");
const statusAnggota = document.getElementById("status-anggota");
const judulTugas = document.getElementById("judul-tugas");
const ringkasan = document.getElementById("ringkasan");
const barProgres = document.getElementById("bar-progres");
const inputCari = document.getElementById("cari");
const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("judul-baru");
const tombolSimpan = document.getElementById("tombol-simpan");
const pesanForm = document.getElementById("pesan-form");
const statusTugas = document.getElementById("status-tugas");
const tombolCobaLagi = document.getElementById("tombol-coba-lagi");
const daftarTugas = document.getElementById("daftar-tugas");
const kosongCari = document.getElementById("kosong-cari");
const notifikasi = document.getElementById("notifikasi");

// ini untuk desain yang dipilih pada setiap bagian
const KELAS_AKTIF = ["bg-indigo-50", "text-indigo-700", "font-semibold"];
const KELAS_NONAKTIF = ["text-gray-700", "hover:bg-gray-50"];
const BADGE_AKTIF = ["bg-indigo-600", "text-white", "border-indigo-600"];
const BADGE_NONAKTIF = ["bg-gray-50", "text-gray-500", "border-gray-200"];
const KELAS_SELESAI = ["line-through", "text-gray-400"];

// ini untuk statusnya nanti
let idAktif = null;      
let tombolAktif = null;  
let tokenMuat = 0;       
let tugasSiap = false;   
let timerNotif = null;

// fungsi untuk tampilan antarmuka
function tampilkanPesan(el, teks, galat) {
  el.textContent = teks;
  el.classList.toggle("text-red-600", galat);
  el.classList.toggle("text-gray-500", !galat);
}

function setFormAktif(aktif) {
  inputCari.disabled = !aktif;
  inputJudul.disabled = !aktif;
  tombolSimpan.disabled = !aktif;
}

function semuaBaris() {
  return Array.from(daftarTugas.children);
}

function perbaruiRingkasan() {
  const baris = semuaBaris();
  const total = baris.length;
  const selesai = baris.filter((li) => li.dataset.selesai === "true").length;
  ringkasan.textContent = selesai + " dari " + total + " tugas selesai";
  ringkasan.classList.remove("text-red-600");
  ringkasan.classList.add("text-gray-500");
  barProgres.style.width = (total === 0 ? 0 : (selesai / total) * 100) + "%";
}

// untuk menampilkan bagian pencarian pada daftar tugas
function terapkanFilter() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  const baris = semuaBaris();
  let tampil = 0;

  baris.forEach((li) => {
    const cocok = li.dataset.judul.toLowerCase().includes(kataKunci);
    if (cocok) {
      li.classList.remove("hidden");
      tampil++;
    } else {
      li.classList.add("hidden");
    }
  });

  if (!tugasSiap) {
    kosongCari.classList.add("hidden");
    return;
  }

  if (baris.length === 0) {
    kosongCari.textContent = "Belum ada tugas.";
    kosongCari.classList.remove("hidden");
  } else if (tampil === 0) {
    kosongCari.textContent = "Tidak ada tugas yang cocok";
    kosongCari.classList.remove("hidden");
  } else {
    kosongCari.classList.add("hidden");
  }
}

function tampilkanNotifikasi(teks) {
  notifikasi.textContent = teks;
  notifikasi.classList.remove("hidden");
  clearTimeout(timerNotif);
  timerNotif = setTimeout(() => {
    notifikasi.classList.add("hidden");
  }, 3000);
}

// tampilan tugasnya
function buatBaris(tugas) {
  const li = document.createElement("li");
  li.className =
    "group flex items-center gap-4 border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50 md:px-8";
  li.dataset.judul = tugas.title;
  li.dataset.selesai = "false";

  const lingkaran = document.createElement("span");
  lingkaran.className =
    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-xs font-bold text-white transition-colors";

  const judul = document.createElement("span");
  judul.className = "min-w-0 flex-1 break-words text-lg";
  judul.textContent = tugas.title;

  const aksi = document.createElement("div");
  aksi.className = "flex shrink-0 items-center gap-2";

  const kelasTombol =
    "rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm font-medium text-gray-400 shadow-sm transition-colors group-hover:text-gray-900";

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = kelasTombol + " hover:bg-red-50 hover:!text-red-600";
  tombolHapus.textContent = "Hapus";

  let tombolSelesai = null;

  function tandaiSelesai() {
    li.dataset.selesai = "true";
    judul.classList.add(...KELAS_SELESAI);
    lingkaran.classList.remove("border-gray-300");
    lingkaran.classList.add("border-green-600", "bg-green-600");
    lingkaran.textContent = "✓";
    if (tombolSelesai) {
      tombolSelesai.remove();
      tombolSelesai = null;
    }
  }

  if (!tugas.completed) {
    tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.className = kelasTombol + " hover:bg-green-600";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.addEventListener("click", () => {
      tandaiSelesai();
      perbaruiRingkasan();
    });
    aksi.appendChild(tombolSelesai);
  } else {
    tandaiSelesai();
  }

  tombolHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanFilter();
  });
  aksi.appendChild(tombolHapus);

  li.appendChild(lingkaran);
  li.appendChild(judul);
  li.appendChild(aksi);
  return li;
}

// untuk mengambil data anggota dari API
async function muatAnggota() {
  tampilkanPesan(statusAnggota, "Memuat anggota...", false);
  try {
    const response = await fetch(API + "/users");
    if (!response.ok) {
      throw new Error("Server mengembalikan status " + response.status);
    }
    const anggota = await response.json();

    statusAnggota.textContent = "";
    anggota.forEach((orang, indeks) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className =
        "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg transition-colors " +
        KELAS_NONAKTIF.join(" ");

      const badge = document.createElement("span");
      badge.className =
        "font-mono-badge flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold " +
        BADGE_NONAKTIF.join(" ");
      badge.textContent = String(indeks + 1).padStart(2, "0");

      const nama = document.createElement("span");
      nama.className = "truncate";
      nama.textContent = orang.name;

      tombol.appendChild(badge);
      tombol.appendChild(nama);
      tombol.addEventListener("click", () => pilihAnggota(orang, tombol, badge));
      daftarAnggota.appendChild(tombol);
    });
  } catch (error) {
    tampilkanPesan(
      statusAnggota,
      "Gagal memuat anggota: " + error.message + ". Silakan muat ulang halaman.",
      true
    );
  }
}

// untuk menampilkan data ketika kita memilih anggota tim
async function pilihAnggota(orang, tombol, badge) {
  
  if (tombolAktif) {
    tombolAktif.classList.remove(...KELAS_AKTIF);
    tombolAktif.classList.add(...KELAS_NONAKTIF);
    const badgeLama = tombolAktif.firstElementChild;
    badgeLama.classList.remove(...BADGE_AKTIF);
    badgeLama.classList.add(...BADGE_NONAKTIF);
  }
  tombol.classList.remove(...KELAS_NONAKTIF);
  tombol.classList.add(...KELAS_AKTIF);
  badge.classList.remove(...BADGE_NONAKTIF);
  badge.classList.add(...BADGE_AKTIF);
  tombolAktif = tombol;
  idAktif = orang.id;

  const token = ++tokenMuat;

  judulTugas.textContent = "Tugas " + orang.name;
  daftarTugas.innerHTML = ""; 
  kosongCari.classList.add("hidden");
  inputCari.value = "";
  pesanForm.textContent = "";
  tugasSiap = false;
  setFormAktif(false);
  ringkasan.textContent = "";
  barProgres.style.width = "0%";
  tampilkanPesan(statusTugas, "Memuat tugas...", false);
  tombolCobaLagi.classList.add("hidden");

  try {
    const response = await fetch(API + "/todos?userId=" + orang.id);
    if (!response.ok) {
      throw new Error("Server mengembalikan status " + response.status);
    }
    const tugas = await response.json();

    if (token !== tokenMuat) return; 

    statusTugas.textContent = "";
    tugas.forEach((t) => daftarTugas.appendChild(buatBaris(t)));
    tugasSiap = true;
    perbaruiRingkasan();
    terapkanFilter();
    setFormAktif(true);
  } catch (error) {
    if (token !== tokenMuat) return;
    ringkasan.textContent = "";
    const pesanError = error instanceof TypeError
      ? "Gagal memuat tugas untuk " + orang.name + ". Koneksi ke server terputus."
      : "Gagal memuat tugas untuk " + orang.name + ": " + error.message;
    tampilkanPesan(
      statusTugas,
      pesanError,
      true
    );
    tombolCobaLagi.classList.remove("hidden");
  }
}

tombolCobaLagi.addEventListener("click", () => {
  if (tombolAktif) {
    tombolAktif.click();
  }
});

inputCari.addEventListener("input", terapkanFilter);

// menambah tugas baru
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = semuaBaris().some(
        (li) => li.dataset.judul.toLowerCase() === judul.toLowerCase()
      );
      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

inputJudul.addEventListener("input", () => {
  pesanForm.textContent = "";
});

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (idAktif === null || !tugasSiap) {
    tampilkanPesan(pesanForm, "Pilih anggota dan tunggu tugasnya selesai dimuat.", true);
    return;
  }

  const judul = inputJudul.value.trim();
  if (judul === "") {
    tampilkanPesan(pesanForm, "Judul tugas tidak boleh kosong.", true);
    return;
  }

  if (judul.length < 5) {
    tampilkanPesan(pesanForm, "Judul tugas minimal 5 karakter (tidak termasuk spasi di awal/akhir).", true);
    return;
  }
  
  const idSaatSimpan = idAktif;
  pesanForm.textContent = "";
  tombolSimpan.textContent = "Menyimpan...";
  tombolSimpan.disabled = true;

  try {
    const tugasBaru = await simpanTugas(judul);

    if (idSaatSimpan === idAktif) {
      daftarTugas.prepend(buatBaris(tugasBaru));
      perbaruiRingkasan();
      terapkanFilter();
      inputJudul.value = "";
      tampilkanNotifikasi("Tugas berhasil ditambahkan.");
    }
  } catch (error) {
    tampilkanPesan(pesanForm, error.message, true);
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = !tugasSiap;
  }
});

// fuction call
muatAnggota();