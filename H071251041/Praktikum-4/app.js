const data = [
    {nama: "Harry", nilai: [80, 85, 90]},
    {nama: "Marcus", nilai: [60, 60, 60]},
    {nama: "Damitree", nilai: [90, 90, 90]},
    {nama: "Stephen", nilai: [75, 75, 75]},
    {nama: "Collin", nilai: [45, 45, 45]}
];


const asisten = ["hanni", "minji", "danielle", "haerin", "hyein"];

let inputNama = prompt("Masukkan Nama Anda (Asisten Lab):");


let checkNama = false;
let ketError = "";
let namaBenar = "";

if (inputNama === null || inputNama === "" || inputNama === " ") {
    ketError = "Anda tidak memasukkan nama Asisten Lab";

} else {
    let namaKecil = inputNama.toLowerCase();

    for (let i = 0; i < asisten.length; i++) {
        if (namaKecil === asisten[i]) {
            checkNama = true;
            namaBenar = inputNama;
            break;
        }
    }

    if (checkNama === false) {
        ketError = `Nama Asisten lab "${inputNama}" tidak terdaftar`;
    }
}

if (checkNama === false) {
    document.write(`
        <div class="max-w-3xl mx-auto mt-13 bg-white p-8 rounded-xl shadow-md border border-gray-200 ">
            <h1 class="text-center text-3xl font-extrabold text-black mb-3"> Sistem Laporan Praktikum</h1>
            <p class="text-center text-black text-base mb-6"> Evaluasi kelulusan berbasis JavaScript murni. </p>

            <hr class="border-gray-400 mb-6">

            <div class="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg">
                <p class="text-red-700 font-bold text-lg">AKSES DITOLAK.</p>
                <p class="text-red-700 text-base">${ketError} </p>
            </div>
        </div>
    `);
} else {
    let hasil = [];
    let kotak = "";

    for (let i = 0; i < data.length; i++) {
        let mhs = data[i];

        let total = mhs.nilai.reduce((function(a, b) {
            return a + b }), 0);

        let rata = total/mhs.nilai.length;

        let status = "";
        let warnaKotak = "";

        if (rata >= 75) {
            status = "Lulus";
            warnaKotak = "border-l-4 border-green-600 hover:shadow-xl hover:shadow-green-200";
        } else {
            status = "Tidak Lulus";
            warnaKotak = "border-l-4 border-red-600 hover:shadow-xl hover:shadow-red-200";
        }

        hasil.push ({
            nama: mhs.nama,
            rata: rata,
            status: status
        });

        kotak = kotak + `
            <div class="bg-white p-5 rounded-lg shadow-md ${warnaKotak} transition duration-200 hover:-translate-y-2 hover:scale-105 ">
                <h3 class="text-xl font-bold text-black mb-2"> ${mhs.nama} </h3>
                <p class="text-black mb-2"> Rata-rata: <strong> ${rata} </strong> </p>
                <p class="text-black mb-2"> Status: <strong> ${status} </strong> </p>
            </div>
        `;
    } 


    document.write(`
        <div class="max-w-3xl mx-auto my-13 bg-white p-8 rounded-xl shadow-md border border-gray-200 ">
            <h1 class="text-center text-3xl font-extrabold text-black mb-3"> Sistem Laporan Praktikum</h1>
            <p class="text-center text-black text-base mb-6"> Evaluasi kelulusan berbasis JavaScript murni </p>

            <hr class="border-gray-400 mb-6">

            <div class="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                <p class="text-blue-700 font-bold text-lg">Selamat Datang <span class="uppercase"> ${inputNama}</span>!</p>
                <p class="text-blue-700 text-base">Berikut adalah laporan hasil praktikum </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6"> ${kotak} </div>
        </div>
    `);

    console.log("Hasil Evaluasi:");
    console.log(hasil);

}