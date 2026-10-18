const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

let namaAsisten = prompt("Masukkan Nama Asisten Lab:").toLowerCase();

const aslabTerdaftar = "fira";

if (namaAsisten === aslabTerdaftar) {

    function hitungRataRata(nilai) {
        let total = 0;
        for (let i = 0; i < nilai.length; i++) {
            total += nilai[i];
        }
        return total / nilai.length; 
    }

    const hasilAkhir = [];

    for (let i = 0; i < dataPraktikan.length; i++) {
        let item = dataPraktikan[i];
        let rataRata = hitungRataRata(item.nilaiTugas);

        let status = "";
        if (rataRata >= 75 && rataRata <= 100) {
            status = "LULUS";
        } else {
            status = "TIDAK LULUS";
        }

        hasilAkhir[i] = {
            nama: item.nama,
            nilaiTugas: item.nilaiTugas,
            rataRata: rataRata,
            status: status
        };
    }

    document.write(`
        <nav class="bg-green-900 text-white px-8 py-5 shadow-lg flex justify-between items-center mb-10">
            <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold">Sistem Laporan Praktikum</h1>
            </div>
            <div class="flex items-center gap-2 bg-green-800 px-4 py-2 rounded-full border border-green-700">
                <span class="text-sm font-medium text-white">Nama Asisten Lab: ${aslabTerdaftar}</span>
            </div>
        </nav>

        <main class="max-w-6xl mx-auto px-6 mb-12">
            <div class="mb-8 text-center sm:text-center">
                <h2 class="text-2xl font-bold text-black">Dashboard Evaluasi Praktikan</h2>
                <p class="text-gray-500 text-sm mt-1">Rekapitulasi perhitungan nilai rata-rata dan verifikasi status kelulusan.</p>
            </div>
            <div class="flex flex-col items-center gap-6">
    `);

    for (let j = 0; j < hasilAkhir.length; j++) {
        let data = hasilAkhir[j];
        
        let statusLulus = "";

        if (data.status === "LULUS") {
            statusLulus = "bg-green-50 text-green-700 border-green-200";
        } else {
            statusLulus = "bg-red-50 text-red-700 border-red-200";
        }

        let teksNilai = data.nilaiTugas[0] + ", " + data.nilaiTugas[1] + ", " + data.nilaiTugas[2];

        document.write(`
                <div class="w-full max-w-lg bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-200 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-bold text-slate-800">${data.nama}</h3>
                    </div>
                        <div class="space-y-2 mb-6">
                            <div class="flex justify-between text-sm">
                                <span class="text-slate-500">Rincian Nilai:</span>
                                <span class="font-medium text-slate-700">${teksNilai}</span>
                            </div>
                            <div class="flex justify-between text-sm pt-2 border-t border-slate-100">
                                <span class="text-slate-500">Rata-rata:</span>
                                <span class="font-bold text-slate-900 text-base">${data.rataRata}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pt-2">
                        <span class="inline-block w-full text-center py-2 px-4 rounded-xl text-xs font-bold tracking-wider border ${statusLulus}">${data.status}</span>
                    </div>
                </div>
            `);
    }

    document.write(`
            </div>
        </main>
    `);

    console.log(hasilAkhir);

} else {
    document.write(`
        <div class="font-sans">
            <div class="bg-white flex flex-col gap-6 justify-center items-center p-12 shadow-md text-black">
                <h1 class="text-xl font-bold">Maaf, nama asisten lab tidak terdaftar!</h1>
            </div>
        </div>
    `);
}