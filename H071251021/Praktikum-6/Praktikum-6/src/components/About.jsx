function About() {
  const dataDiri = [
    { id: 1, label: "Nama", isi: "Al Daffa A'Aren" },
    { id: 2, label: "Status", isi: "Mahasiswa" },
    { id: 3, label: "Jurusan", isi: "Sistem Informasi" },
    { id: 4, label: "Kota", isi: "Makassar" },
    { id: 5, label: "Hobi", isi: "Bermain Bulu Tangkis" },
  ];

  return (
    <section id="about" className="scroll-mt-20 bg-slate-900 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Tentang Saya
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-slate-400">
          Perkenalkan, saya Aren, mahasiswa yang tertarik pada pengembangan web
          dan sistem informasi. Saat ini saya sedang belajar React untuk
          membuat tampilan website yang rapi dan mudah digunakan.
        </p>

        <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {dataDiri.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:-translate-y-1 hover:border-indigo-500"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="text-lg font-semibold text-slate-100">{item.isi}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
