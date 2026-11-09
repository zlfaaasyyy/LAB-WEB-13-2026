// Data awal praktikan (Gunakan data ini sebagai acuan). Anda bisa mengganti atau menambahkan data praktikan sesuai keinginan. 
const dataPraktikan = [ 
{ nama: "Budi", nilaiTugas: [80, 85, 90] }, 
{ nama: "Siti", nilaiTugas: [60, 60, 60] }, 
{ nama: "Andi", nilaiTugas: [90, 90, 90] }, 
{ nama: "Dewi", nilaiTugas: [75, 75, 75] }, 
{ nama: "Eko", nilaiTugas: [45, 45, 45] } 
];
/* ======================================================================= 
TULIS LOGIKA PROGRAM ANDA DI BAWAH INI 
Target Penyelesaian: 
1. Gunakan prompt() untuk memverifikasi kehadiran Asisten Lab. 
2. Buat logika fungsi untuk memproses dataPraktikan di atas (hitung rata
rata nilainya dan tentukan status lulus/tidak lulus dengan batas kelulusan 
75). 
3. Gunakan document.write() untuk merender laporan ke layar browser. Desain 
menggunakan CSS/Tailwind langsung di dalam string document.write() Anda! 
4. Gunakan console.log() untuk menampilkan data hasil akhir (array of 
objects) ke konsol browser. 
======================================================================== */
function hitung(nilai) {
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let jumlah = data.nilaiTugas.reduce(function(a, b){
            return a + b }, 0)
        let rataRata = jumlah/data.nilaiTugas.length
        nilai[i] = {
            nama: data.nama,
            nilaiTugas: data.nilaiTugas,
            rataRata: rataRata
        }
    }
    return nilai
}
function validasi(nilai){
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let status
        if (data.rataRata >= 75) {
            status = "Lulus"
        } else{
            status = "Tidak Lulus"
        }
        nilai[i] = {
            nama: data.nama,
            nilaiTugas: data.nilaiTugas,
            rataRata: data.rataRata,
            status: status
        }
    }
    return nilai
}

let akses = false
let nama = prompt("Masukkan Nama Praktikan").toLowerCase()
if (nama == "zahwa") {
    akses = true
}

if (akses) {
    hitung(dataPraktikan)
    validasi(dataPraktikan)
    document.write(`
        <div class="font-['Poppins']">
            <div class="bg-emerald-500 flex flex-col gap-2 justify-center items-center p-12 shadow text-white">
                <h1 class="text-4xl font-bold">Sistem Laporan Praktikum</h1>
                <p>Evaluasi kelulusan berbasis JavaScript murni</p>
                <div class="text-center bg-white text-emerald-500 rounded-3xl px-6 py-6 mt-4">
                <h2 class="text-2xl font-semibold">Selamat datang Asisten ${nama}!</h2>
                <p>Berikut adalah laporan hasil evaluasi nilai praktikum.</p>
                </div>
            </div>
        </div>
    `)
    document.write(`
        <div class="flex flex-col justify-center items-center bg-white mx-50 my-10 shadow rounded-2xl">
        `)
    dataPraktikan.forEach(praktikan => {
        let Nama = praktikan.nama
        let RataRata = praktikan.rataRata
        let Status = praktikan.status

        let warnaStatus
        if (Status == "Lulus") {
            warnaStatus = "bg-emerald-100 text-emerald-500"
        } else {
            warnaStatus = "bg-red-100 text-red-500"
        }
        document.write(`
            <div class="font-['Poppins'] bg-white shadow-lg rounded-2xl flex flex-row items-center justify-between hover:bg-emerald-100 m-6 w-[700px] p-6 border border-l-8 border-l-emerald-500">
                <div class="flex flex-col gap-4">
                    <div class="font-bold text-3xl text-black-500">
                        <p>${Nama}</p>
                    </div>
                    <div class="font-bold text-xl text-blue-500">
                        <p>Nilai Rata-Rata: ${RataRata}</p>
                    </div>
                </div>
                <div class="font-bold text-md ${warnaStatus} px-4 py-2 rounded-full">
                    <p>${Status}</p>
                </div>
            </div>
        `)
    })
    document.write(`
        </div>
        `)
} else {
    document.write(`
        <div class="font-['Poppins'] flex flex-col justify-center items-center bg-white mx-100 my-10">
            <h1 class="text-2xl">Akses Ditolak, kamu bukan zahwa</h1>
        </div>
    `)
}