// perlihatkan daftar anggota
async function muatAnggota() {
  let keterangan = document.getElementById("loadingAnggota");
  let errorKeterangan = document.getElementById("errorAnggota");
  let daftar = document.getElementById("anggota");

  try {
    let hasil = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!hasil.ok) {
      throw new Error("Status " + hasil.status);
    }

    let pengguna = await hasil.json();

    keterangan.textContent = "";
    errorKeterangan.textContent = "";
    errorKeterangan.classList.add("hidden");

    daftar.innerHTML = "";

    pengguna.forEach((orang) => {
      let li = document.createElement("li");

      li.textContent = orang.name;
      li.classList.add("itemAnggota","p-3", "bg-gray-100","rounded","cursor-pointer", "mb-2"
      );

      li.addEventListener("click", () => {
        let semuaAnggota = document.querySelectorAll(".itemAnggota");

        semuaAnggota.forEach((item) => {
          item.classList.remove("bg-blue-600", "text-white");
          item.classList.add("bg-gray-100");
        });

        li.classList.remove("bg-gray-100");
        li.classList.add("bg-blue-600", "text-white");

        document.getElementById("tugasAwal").classList.add("hidden");
        document.getElementById("listTugas").classList.remove("hidden");

        muatTugasAnggota(orang.id, orang.name);
      });

      daftar.appendChild(li);
    });

  } catch (error) {
    keterangan.textContent = "";
    errorKeterangan.classList.remove("hidden");

    let pesanError = error.message;

    if (pesanError.includes("Failed to fetch")) {
      pesanError = "Tidak ada jaringan. Silakan periksa koneksi internet.";
    }

    errorKeterangan.textContent = "Gagal memuat data: " + pesanError;
  }
}


// perlihatkan tugas anggota
async function muatTugasAnggota(idAnggota, namaAnggota) {
  let judulBagian = document.getElementById("judulTugas");
  let daftarTugas = document.getElementById("daftarTugas");
  let inputCari = document.getElementById("cariTugas");
  let keterangan = document.getElementById("loadingTugas");
  let errorTugas = document.getElementById("errorTugas");

  judulBagian.textContent = "Tugas " + namaAnggota;

  daftarTugas.innerHTML = "";
  inputCari.value = "";

  document.getElementById("tugasKosong").classList.add("hidden");
  document.getElementById("SemuaTugas").textContent = "";

  keterangan.textContent = "Memuat tugas...";
  errorTugas.textContent = "";

  try {
    let hasil = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=" + idAnggota
    );

    if (!hasil.ok) {
      throw new Error("Status " + hasil.status);
    }

    let tugas = await hasil.json();

    keterangan.textContent = "";

    tugas.forEach((item) => {
      tambahElemenTugas(item.title, item.completed);
    });

    perbaruiRingkasan();

  } catch (error) {
    keterangan.textContent = "";

    let pesanError = error.message;

    if (pesanError.includes("Failed to fetch")) {
      pesanError = "Tidak ada jaringan. Silakan periksa koneksi internet.";
    }

    errorTugas.textContent = "Gagal memuat data: " + pesanError;
  }
}


// membuat elemen tugas
function tambahElemenTugas(judul, isSelesai) {
  let daftarTugas = document.getElementById("daftarTugas");

  let li = document.createElement("li");

  li.classList.add(
    "tugasItem", "p-4", "border", "rounded", "flex", "justify-between", "items-center", "gap-2", "mb-2"
  );

  li.setAttribute("dataJudul", judul.toLowerCase());

  let spanJudul = document.createElement("span");

  spanJudul.textContent = judul;
  spanJudul.classList.add("flex-1");

  if (isSelesai) {
    li.classList.add("selesai");
    spanJudul.classList.add("line-through", "text-gray-400");
  }

  li.appendChild(spanJudul);

  let wadahTombol = document.createElement("div");

  wadahTombol.classList.add("flex", "items-center", "gap-2");


  // tombol selesai n batal
  let tombolSelesai = document.createElement("button");

  function aturTombolSelesai() {
    if (li.classList.contains("selesai")) {
      tombolSelesai.textContent = "Batal selesai";
      tombolSelesai.classList.remove("text-green-600");
      tombolSelesai.classList.add("text-orange-500");
    } else {
      tombolSelesai.textContent = "Tandai selesai";
      tombolSelesai.classList.remove("text-orange-500");
      tombolSelesai.classList.add("text-green-600");
    }
  }

  aturTombolSelesai();
  tombolSelesai.classList.add("mr-4");

  tombolSelesai.addEventListener("click", () => {
    if (li.classList.contains("selesai")) {
      li.classList.remove("selesai");
      spanJudul.classList.remove("line-through", "text-gray-400");
    } else {
      li.classList.add("selesai");
      spanJudul.classList.add("line-through", "text-gray-400");
    }

    aturTombolSelesai();
    perbaruiRingkasan();
  });

  wadahTombol.appendChild(tombolSelesai);


  // tombol Hapus
  let tombolHapus = document.createElement("button");

  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add("text-red-600");

  tombolHapus.addEventListener("click", () => {
    li.remove();

    perbaruiRingkasan();
    jalankanPencarian();
  });

  wadahTombol.appendChild(tombolHapus);

  li.appendChild(wadahTombol);
  daftarTugas.appendChild(li);
}


// memperbarui Ringkasan Progres
function perbaruiRingkasan() {
  let ringkasan = document.getElementById("SemuaTugas");
  let semuaTugas = document.querySelectorAll(".tugasItem");
  let tugasSelesai = document.querySelectorAll(".tugasItem.selesai");

  ringkasan.textContent =
    tugasSelesai.length + " dari " + semuaTugas.length + " tugas selesai";
}


// cari tugas
let inputCari = document.getElementById("cariTugas");

inputCari.addEventListener("input", jalankanPencarian);

function jalankanPencarian() {
  let kataKunci = inputCari.value.toLowerCase();
  let semuaTugas = document.querySelectorAll(".tugasItem");
  let pesanTidakCocok = document.getElementById("tugasKosong");
  let adaCocok = false;

  semuaTugas.forEach((li) => {
    let judul = li.getAttribute("dataJudul");

    if (judul.includes(kataKunci)) {
      li.classList.remove("hidden");
      li.classList.add("flex");
      adaCocok = true;
    } else {
      li.classList.add("hidden");
      li.classList.remove("flex");
    }
  });

  if (!adaCocok && semuaTugas.length > 0) {
    pesanTidakCocok.classList.remove("hidden");
  } else {
    pesanTidakCocok.classList.add("hidden");
  }
}


// menambah tugas Baru
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let semuaTugas = document.querySelectorAll(".tugasItem");
      let sudahAda = false;

      semuaTugas.forEach((li) => {
        let judulLama = li.getAttribute("dataJudul");

        if (judulLama === judul.toLowerCase()) {
          sudahAda = true;
        }
      });

      if (sudahAda) {
        reject(new Error("Tugas tersebut sudah ada di daftar."));
      } else {
        resolve({
          title: judul,
          completed: false
        });
      }}, 1000);
  });
}


let form = document.getElementById("tambahTugas");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  let inputTugasBaru = document.getElementById("inputTugas");
  let judulBaru = inputTugasBaru.value.trim();
  let pesanError = document.getElementById("errorSubmit");
  let pesanSukses = document.getElementById("suksesSubmit");
  let tombolSimpan = document.getElementById("simpanTugas");

  pesanError.textContent = "";
  pesanSukses.textContent = "";

  if (judulBaru.length < 5) {
    pesanError.textContent =
      "Judul tugas minimal 5 karakter dan tidak boleh kosong/hanya spasi.";
    return;
  }

  tombolSimpan.textContent = "Menyimpan...";

  try {
    let tugasBaru = await simpanTugas(judulBaru);

    tambahElemenTugas(tugasBaru.title, tugasBaru.completed);

    perbaruiRingkasan();
    jalankanPencarian();

    inputTugasBaru.value = "";

    pesanSukses.textContent = "Tugas berhasil ditambahkan.";

    setTimeout(() => {
      pesanSukses.textContent = "";
    }, 3000);

  } catch (error) {
    pesanError.textContent = error.message;

  } finally {
    tombolSimpan.textContent = "Simpan";
  }
});


// jalankan saat halaman dibuka
muatAnggota();