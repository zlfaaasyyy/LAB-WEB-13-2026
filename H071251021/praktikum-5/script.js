const API = "https://jsonplaceholder.typicode.com";

// Class Tailwind
const KELAS_SELESAI = ["line-through", "text-gray-400"];
const KELAS_ANGGOTA_BIASA = "border-2 border-black bg-white px-3 py-2 text-left text-sm shadow-[3px_3px_0_0_#000] hover:translate-x-px hover:translate-y-px hover:shadow-none";

// Elemen
const loadingAnggota = document.getElementById("loading-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");

const placeholderTugas = document.getElementById("placeholder-tugas");
const panelTugas = document.getElementById("panel-tugas");
const judulTugas = document.getElementById("judul-tugas");
const loadingTugas = document.getElementById("loading-tugas");
const errorTugas = document.getElementById("error-tugas");
const kontenTugas = document.getElementById("konten-tugas");
const ringkasan = document.getElementById("ringkasan");
const inputCari = document.getElementById("input-cari");
const daftarTugasEl = document.getElementById("daftar-tugas");
const pesanTidakCocok = document.getElementById("pesan-tidak-cocok");
const pesanKosong = document.getElementById("pesan-kosong");

const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const notifikasi = document.getElementById("notifikasi");

// State
let anggotaTerpilih = null;
let tugasBerhasilDimuat = false;
let daftarTugas = []; // { title, completed, li, span }
let tokenPermintaan = 0; // mencegah respons lama menimpa respons baru
let timerNotifikasi = null;

// Helper tampil/sembunyi pesan
function tampilkanPesan(elemen, teks) {
  elemen.textContent = teks;
  elemen.classList.remove("hidden");
}

function sembunyikanPesan(elemen) {
  elemen.textContent = "";
  elemen.classList.add("hidden");
}

/* ===================== F1: Daftar anggota ===================== */

function buatTombolAnggota(user) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = KELAS_ANGGOTA_BIASA;
  tombol.textContent = user.name;
  tombol.addEventListener("click", function () {
    pilihAnggota(user, tombol);
  });
  daftarAnggota.appendChild(tombol);
}

async function muatAnggota() {
  tampilkanPesan(loadingAnggota, "Memuat anggota...");
  sembunyikanPesan(errorAnggota);

  try {
    const response = await fetch(API + "/users");
    if (!response.ok) {
      throw new Error("Server menjawab dengan status " + response.status);
    }
    const users = await response.json();
    users.forEach(buatTombolAnggota);
  } catch (err) {
    tampilkanPesan(errorAnggota, "Gagal memuat anggota. " + err.message);
  } finally {
    sembunyikanPesan(loadingAnggota);
  }
}

/* ===================== F2: Tugas anggota ===================== */

function pilihAnggota(user, tombol) {
  if (anggotaTerpilih && anggotaTerpilih.id === user.id && tugasBerhasilDimuat) {
    return;
  }

  // Hanya satu anggota yang bertanda
  for (const t of daftarAnggota.children) {
    t.classList.remove("bg-yellow-300", "font-bold");
    t.classList.add("bg-white");
  }
  tombol.classList.remove("bg-white");
  tombol.classList.add("bg-yellow-300", "font-bold");

  muatTugas(user);
}

function kosongkanTugas() {
  daftarTugas = [];
  daftarTugasEl.innerHTML = "";
  inputCari.value = "";
  inputJudul.value = "";
  sembunyikanPesan(errorForm);
}

async function muatTugas(user) {
  const token = ++tokenPermintaan;
  anggotaTerpilih = user;
  tugasBerhasilDimuat = false;

  placeholderTugas.classList.add("hidden");
  panelTugas.classList.remove("hidden");
  judulTugas.textContent = "Tugas " + user.name;

  kosongkanTugas();
  kontenTugas.classList.add("hidden");
  sembunyikanPesan(errorTugas);
  tampilkanPesan(loadingTugas, "Memuat tugas...");

  try {
    const response = await fetch(API + "/todos?userId=" + user.id);
    if (!response.ok) {
      throw new Error("Server menjawab dengan status " + response.status);
    }
    const todos = await response.json();

    if (token !== tokenPermintaan) return; // sudah ada klik anggota lain

    todos.forEach(function (todo) {
      tambahTugasKeDaftar(todo.title, todo.completed);
    });
    tugasBerhasilDimuat = true;
    kontenTugas.classList.remove("hidden");
    perbaruiTampilan();
  } catch (err) {
    if (token !== tokenPermintaan) return;
    tampilkanPesan(errorTugas, "Gagal memuat tugas. " + err.message);
  } finally {
    if (token === tokenPermintaan) {
      sembunyikanPesan(loadingTugas);
    }
  }
}

function tambahTugasKeDaftar(title, completed) {
  const li = document.createElement("li");
  li.className = "border-2 border-black bg-white p-2";

  const baris = document.createElement("div");
  baris.className = "flex items-start justify-between gap-3";

  const span = document.createElement("span");
  span.className = "flex-1 text-sm break-words";
  span.textContent = title;

  const aksi = document.createElement("div");
  aksi.className = "flex shrink-0 gap-2";

  const tugas = { title: title, completed: completed, li: li, span: span };

  if (completed) {
    span.classList.add(...KELAS_SELESAI);
  } else {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.className = "border-2 border-black bg-lime-300 px-2 py-1 text-xs font-bold";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.addEventListener("click", function () {
      tugas.completed = true;
      span.classList.add(...KELAS_SELESAI);
      tombolSelesai.remove();
      perbaruiTampilan();
    });
    aksi.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = "border-2 border-black bg-red-300 px-2 py-1 text-xs font-bold";
  tombolHapus.textContent = "Hapus";
  tombolHapus.addEventListener("click", function () {
    li.remove();
    daftarTugas = daftarTugas.filter(function (t) {
      return t !== tugas;
    });
    perbaruiTampilan();
  });
  aksi.appendChild(tombolHapus);

  baris.appendChild(span);
  baris.appendChild(aksi);
  li.appendChild(baris);
  daftarTugasEl.appendChild(li);
  daftarTugas.push(tugas);

  return tugas;
}

function perbaruiRingkasan() {
  const selesai = daftarTugas.filter(function (t) {
    return t.completed;
  }).length;
  ringkasan.textContent = selesai + " dari " + daftarTugas.length + " tugas selesai";
}

/* ===================== F3: Pencarian ===================== */

function terapkanFilter() {
  const kataKunci = inputCari.value.toLowerCase();
  let jumlahCocok = 0;

  daftarTugas.forEach(function (t) {
    if (t.title.toLowerCase().includes(kataKunci)) {
      t.li.classList.remove("hidden");
      jumlahCocok++;
    } else {
      t.li.classList.add("hidden");
    }
  });

  const adaTugas = daftarTugas.length > 0;
  pesanTidakCocok.classList.toggle("hidden", !(adaTugas && jumlahCocok === 0));
  pesanKosong.classList.toggle("hidden", adaTugas);
}

function perbaruiTampilan() {
  perbaruiRingkasan();
  terapkanFilter();
}

inputCari.addEventListener("input", terapkanFilter);

/* ===================== F4: Tambah tugas ===================== */

function simpanTugas(judul) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const sudahAda = daftarTugas.some(function (t) {
        return t.title.trim().toLowerCase() === judul.toLowerCase();
      });
      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  clearTimeout(timerNotifikasi);
  tampilkanPesan(notifikasi, pesan);
  timerNotifikasi = setTimeout(function () {
    sembunyikanPesan(notifikasi);
  }, 3000);
}

formTugas.addEventListener("submit", async function (event) {
  event.preventDefault();
  sembunyikanPesan(errorForm);

  const judul = inputJudul.value;
  if (judul.length < 5) {
    tampilkanPesan(errorForm, "Judul tugas tidak boleh kosong dan minimal 5 karakter.");
    return;
  }

  const anggotaSaatSimpan = anggotaTerpilih;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    if (anggotaTerpilih !== anggotaSaatSimpan) {
      throw new Error("Anggota berganti saat menyimpan, tugas tidak ditambahkan. Silakan coba lagi.");
    }

    tambahTugasKeDaftar(tugasBaru.title, tugasBaru.completed);
    perbaruiTampilan();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (err) {
    tampilkanPesan(errorForm, err.message);
  } finally {
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

/* ===================== Mulai ===================== */
muatAnggota();