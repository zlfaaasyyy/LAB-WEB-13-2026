const biodata = [
  { id: 1, label: 'Nama', value: 'Muhammad Naufal Alim' },
  { id: 2, label: 'Kampus', value: 'Universitas Hasanuddin' },
  { id: 3, label: 'Jurusan', value: 'Sistem Informasi' },
  { id: 4, label: 'Domisili', value: 'Makassar, Sulawesi Selatan' },
  { id: 5, label: 'Email', value: 'alimnaufal783@gmail.com' },
]

function About() {
  return (
    <section
      id="tentang"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8"
    >
      <h2 className="font-display text-3xl font-bold md:text-4xl">Tentang saya</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Saya mahasiswa S1 Sistem Informasi yang gemar membaca dan belajar, terutama
            belajar dan mencoba hal baru, dengan berbagai pengalaman tersebut saya yakin
            bisa berkembang dengan itu.
          </p>
          <p>
            Selain belajar coding, saya senang mengerjakan proyek kelompok dan
            mencoba alat baru. Hal ini berawal sejak SMA dimana saya diajak lomba KTI oleh
            teman saya dari pengalaman tersebut saya jadi termotivasi untuk belajar lebih dalam
            terkait sistem yang membangun program tersebut.
          </p>
        </div>

        <dl className="divide-y divide-line rounded-2xl border border-line bg-panel">
          {biodata.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between"
            >
              <dt className="text-muted">{item.label}</dt>
              <dd className="font-medium sm:text-right">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
