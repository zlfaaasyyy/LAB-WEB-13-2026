let daftarAnggota = document.getElementById("daftarAnggota");
let statusAnggota = document.getElementById("statusAnggota");

let namaProgres = document.getElementById("namaProgres");
let persenProgres = document.getElementById("persenProgres");
let barProgres = document.getElementById("barProgres");

let judulTugas = document.getElementById("judulTugas");
let ringkasan = document.getElementById("ringkasan");
let statusTugas = document.getElementById("statusTugas");
let daftarTugas = document.getElementById("daftarTugas");
let pesanKosong = document.getElementById("pesanKosong");

let inputCari = document.getElementById("inputCari");
let formTambah = document.getElementById("formTambah");
let inputJudul = document.getElementById("inputJudul");
let tombolSimpan = document.getElementById("tombolSimpan");
let errorForm = document.getElementById("errorForm");
let notifikasi = document.getElementById("notifikasi");

let anggotaDipilih = null;

// 1. tampilkan daftar anggota
async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";

  try {
    let respons = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let anggota = await respons.json();

    anggota.forEach((orang, nomor) => {
      let tombol = document.createElement("button");
      tombol.className = "flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#f2f7f4]";

      let kotakNomor = document.createElement("span");
      kotakNomor.className = "rounded-md bg-[#e1ece5] px-2 py-1 font-mono text-xs";
      kotakNomor.textContent = String(nomor + 1).padStart(2, "0");

      let nama = document.createElement("span");
      nama.textContent = orang.name;

      tombol.appendChild(kotakNomor);
      tombol.appendChild(nama);

      tombol.addEventListener("click", () => {
        tandaiAnggota(tombol);
        muatTugas(orang.id, orang.name);
      });

      daftarAnggota.appendChild(tombol);
    });

    statusAnggota.textContent = ""; 
  } catch (error) {
    statusAnggota.textContent = "Gagal memuat anggota: " + error.message;
  }
}

// 2. sorot anggota yang dipilih
function tandaiAnggota(tombolTerpilih) {
  let semuaTombol = daftarAnggota.querySelectorAll("button");

  semuaTombol.forEach((tombol) => {
    let kotak = tombol.querySelector("span");
    tombol.classList.remove("bg-[#e1ece5]", "text-[#1e4632]", "font-bold");
    kotak.classList.remove("bg-[#25573f]", "text-white");
    kotak.classList.add("bg-[#e1ece5]");
  });

  let kotakTerpilih = tombolTerpilih.querySelector("span");
  tombolTerpilih.classList.add("bg-[#e1ece5]", "text-[#1e4632]", "font-bold");
  kotakTerpilih.classList.remove("bg-[#e1ece5]");
  kotakTerpilih.classList.add("bg-[#25573f]", "text-white");
}

// 3. tampilkan tugas anggota
async function muatTugas(idAnggota, namaAnggota) {
  anggotaDipilih = idAnggota;

  judulTugas.textContent = "Tugas " + namaAnggota;
  namaProgres.textContent = "Progres " + namaAnggota;
  daftarTugas.innerHTML = "";
  ringkasan.textContent = "";
  persenProgres.textContent = "0%";
  barProgres.style.width = "0%";
  inputCari.value = "";
  errorForm.textContent = "";
  pesanKosong.classList.add("hidden");
  statusTugas.textContent = "Memuat tugas...";

  try {
    let respons = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + idAnggota);
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let tugas = await respons.json();

    if (anggotaDipilih !== idAnggota) {
      return;
    }

    tugas.forEach((item) => {
      tambahkanKeDaftar(item.title, item.completed);
    });

    statusTugas.textContent = "";
    perbaruiRingkasan();
  } catch (error) {
    if (anggotaDipilih === idAnggota) {
      statusTugas.textContent = "Gagal memuat tugas: " + error.message;
    }
  }
}

// 4. membuat baris tugas
const kelasTombolKecil = "rounded-md border border-[#c3d9ca] px-3 py-1 text-sm hover:bg-[#f2f7f4]";

function tambahkanKeDaftar(judul, sudahSelesai) {
  let baris = document.createElement("li");
  baris.className = "flex items-center gap-3 border-b border-[#e1ece5] px-6 py-4";

  let lingkaran = document.createElement("span");
  lingkaran.className = "h-6 w-6 shrink-0 rounded-full border-2 border-[#c3d9ca]";

  let teksJudul = document.createElement("span");
  teksJudul.className = "flex-1 judul-tugas";
  teksJudul.textContent = judul;

  let tombolSelesai = document.createElement("button");
  tombolSelesai.className = kelasTombolKecil;
  tombolSelesai.textContent = "Tandai selesai";

  let tombolHapus = document.createElement("button");
  tombolHapus.className = kelasTombolKecil;
  tombolHapus.textContent = "Hapus";

  baris.appendChild(lingkaran);
  baris.appendChild(teksJudul);
  baris.appendChild(tombolSelesai);
  baris.appendChild(tombolHapus);

  if (sudahSelesai) {
    tampilanSelesai(baris, tombolSelesai, lingkaran, teksJudul);
  }

  tombolSelesai.addEventListener("click", () => {
    tampilanSelesai(baris, tombolSelesai, lingkaran, teksJudul);
    perbaruiRingkasan();
  });

  tombolHapus.addEventListener("click", () => {
    baris.remove();
    perbaruiRingkasan();
    cekPencarian();
  });

  daftarTugas.appendChild(baris);
}

function tampilanSelesai(baris, tombolSelesai, lingkaran, teksJudul) {
  baris.classList.add("selesai"); 

  lingkaran.className = "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f6b4f] text-xs text-white";
  lingkaran.textContent = "✓";
  teksJudul.classList.add("line-through", "text-gray-400");

  tombolSelesai.remove(); 
}

// 5. kotak progres
function perbaruiRingkasan() {
  let total = daftarTugas.querySelectorAll("li").length;
  let selesai = daftarTugas.querySelectorAll("li.selesai").length;

  let persen = 0;
  if (total > 0) {
    persen = Math.round((selesai / total) * 100);
  }

  ringkasan.textContent = selesai + " dari " + total + " tugas selesai";
  persenProgres.textContent = persen + "%";
  barProgres.style.width = persen + "%";
}

// 6. mencari tugas
function cekPencarian() {
  let kataKunci = inputCari.value.trim().toLowerCase();
  let semuaBaris = daftarTugas.querySelectorAll("li");
  let adaYangCocok = false;

  semuaBaris.forEach((baris) => {
    let judul = baris.querySelector(".judul-tugas").textContent.toLowerCase();

    if (judul.includes(kataKunci)) {
      baris.classList.remove("hidden");
      adaYangCocok = true;
    } else {
      baris.classList.add("hidden");
    }
  });

  if (semuaBaris.length > 0 && !adaYangCocok) {
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
  }
}

inputCari.addEventListener("input", cekPencarian);

// 7. tambah tugas baru
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let semuaBaris = daftarTugas.querySelectorAll("li");
      let sudahAda = false;

      semuaBaris.forEach((baris) => {
        let judulLama = baris.querySelector(".judul-tugas").textContent.toLowerCase();
        if (judulLama === judul.toLowerCase()) {
          sudahAda = true;
        }
      });

      if (sudahAda) {
        reject(new Error("Tugas \"" + judul + "\" sudah ada di daftar."));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

formTambah.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  let judul = inputJudul.value.trim();
  let anggotaSaatSimpan = anggotaDipilih; 
  errorForm.textContent = "";

  if (anggotaSaatSimpan === null) {
    errorForm.textContent = "Pilih anggota tim dulu sebelum menambah tugas.";
    return;
  }
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  tombolSimpan.textContent = "Menyimpan...";
  tombolSimpan.disabled = true;

  try {
    let tugasBaru = await simpanTugas(judul);

    if (anggotaSaatSimpan !== anggotaDipilih) {
      return;
    }

    tambahkanKeDaftar(tugasBaru.title, tugasBaru.completed);
    perbaruiRingkasan();
    cekPencarian();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = false;
  }
});

function tampilkanNotifikasi(pesan) {
  notifikasi.textContent = pesan;
  setTimeout(() => {
    notifikasi.textContent = "";
  }, 3000);
}

muatAnggota();
