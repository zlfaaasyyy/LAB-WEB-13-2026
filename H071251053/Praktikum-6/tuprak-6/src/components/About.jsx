function About() {
  const dataDiri = [
    { id: 1, label: 'Nama', value: 'Firah Nuraisyah' },
    { id: 2, label: 'Kampus', value: 'Universitas Hasanuddin' },
    { id: 3, label: 'Program Studi', value: 'S1 Sistem Informasi' },
    { id: 4, label: 'Angkatan', value: '2025' },
    { id: 5, label: 'Asal Sekolah', value: 'SMAN 2 Pangkep (MIPA)' }
  ]

  return (
    <section id="About" className="py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-295 items-start gap-12 px-5 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3.5 font-mono text-[.72rem] uppercase tracking-[.12em] text-ember">
            • About Me
          </p>
          <h2 className="mb-6 font-head text-[clamp(2rem,4vw,3rem)] leading-[1.15]">
            Belajar memahami <br />
            cara kerja sebuah sistem
          </h2>
          <p className="mb-4 max-w-135 text-muted">
            Saya Firah Nuraisyah, mahasiswa Sistem Informasi di Universitas
            Hasanuddin. Saya suka memahami cara kerja sistem, menyusun informasi
            secara terstruktur, dan melihat bagaimana teknologi menyelesaikan
            masalah.
          </p>
          <p className="mb-8 max-w-135 text-muted">
            Lewat perkuliahan dan proyek akademik, saya membangun fondasi di
            pemrograman, algoritma, struktur data, pengembangan aplikasi, dan
            pengolahan data, sebagai bekal untuk terus berkembang di bidang
            teknologi informasi.
          </p>
        </div>

        <div>
          <h3 className="mb-6 font-head text-[1.6rem]">Data Diri</h3>
          <ul className="space-y-3">
            {dataDiri.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 rounded-[18px] border border-line bg-card px-6 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-ember hover:shadow-[6px_6px_0_#ff5f33] sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="font-mono text-[.7rem] uppercase tracking-[.08em] text-ember sm:w-36 sm:shrink-0">
                  {item.label}
                </span>
                <span className="break-all font-head text-lg">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  )
}

export default About
