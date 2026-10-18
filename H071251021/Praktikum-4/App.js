const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

let namaAsisten = prompt("Masukkan nama Asisten Lab yang bertugas hari ini:");
if (!namaAsisten) {
    namaAsisten = "Anonymous";
}

let hasilEvaluasi = [];

for (let i = 0; i < dataPraktikan.length; i++) {
    let praktikan = dataPraktikan[i];
    
    let totalNilai = 0;
    for (let j = 0; j < praktikan.nilaiTugas.length; j++) {
        totalNilai += praktikan.nilaiTugas[j];
    }
    
    let rataRata = totalNilai / praktikan.nilaiTugas.length;
    
    let status = "TIDAK LULUS";
    if (rataRata >= 75) {
        status = "LULUS";
    }
    
    hasilEvaluasi.push({
        nama: praktikan.nama,
        rataRata: rataRata,
        status: status
    });
}

document.write(`<script src="https://cdn.tailwindcss.com"></script>`);

// Halaman utama 
document.write(`<div class="bg-gray-600 m-screen h-screen font-sans p-8">`);

// Judul
document.write(`
    <div class="max-w-4xl mx-auto text-center mb-10">
        <h2 class="text-3xl font-extrabold text-gray-200 mb-2">Sistem Laporan Praktikum</h2>
        <p class="text-lg text-gray-200">Asisten Lab Bertugas: <span class="font-bold text-gray-200">${namaAsisten}</span></p>
    </div>
`);
// Container Kartu
document.write(`<div class="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">`);

for (let k = 0; k < hasilEvaluasi.length; k++) {
    let cetakKartu = hasilEvaluasi[k];
    
    let warnaStatus = "";

    if (cetakKartu.status == "LULUS") {
        warnaStatus = "bg-green-500";
    } else {
        warnaStatus = "bg-red-500";
    }
    
    document.write(`
        <div class="bg-white rounded-xl shadow-xl p-6 w-56 text-center border border-gray-200 hover:scale-110 transition-transform duration-300">
            <div class="text-2xl font-bold text-gray-800 mb-1">${cetakKartu.nama}</div>
            <div class="text-gray-500 font-medium mb-4">Rata-rata: ${cetakKartu.rataRata}</div>
            
            <div class="${warnaStatus} text-white py-1.5 px-4 rounded-full font-bold text-sm inline-block">
                ${cetakKartu.status}
            </div>
        </div>
    `);
}

document.write(`</div>`);
document.write(`</div>`);

console.log("=== Data Evaluasi Praktikan ===");
console.log(hasilEvaluasi);