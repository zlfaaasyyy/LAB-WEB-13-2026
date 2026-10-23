import foto1 from "../assets/gallery/foto1.jpeg";
import foto2 from "../assets/gallery/foto2.jpeg";
import foto3 from "../assets/gallery/foto3.jpeg";
import foto4 from "../assets/gallery/foto4.jpeg";

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: "Kegiatan Kampus" },
    { id: 2, src: foto2, judul: "Liburan" },
    { id: 3, src: foto3, judul: "Kerja Kelompok" },
    { id: 4, src: foto4, judul: "Momen Favorit" },
  ];

  return (
    <section id="gallery" className="scroll-mt-20 bg-slate-900 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          Galeri
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition hover:border-indigo-500"
            >
              {/* Pembungkus gambar */}
              <div className="overflow-hidden">
                <img
                  src={foto.src}
                  alt={foto.judul}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <figcaption className="p-3 text-center text-sm font-medium text-slate-300 transition group-hover:text-indigo-300">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
