import foto1 from '../assets/gallery/foto-1.jpg'
import foto2 from '../assets/gallery/foto-2.jpg'
import foto3 from '../assets/gallery/foto-3.jpg'
import foto4 from '../assets/gallery/foto-4.jpg'

const photos = [
  { id: 1, src: foto1, alt: 'Kegiatan kampus (LK)', caption: 'Kegiatan kampus (LK)', wide: true },
  { id: 2, src: foto2, alt: 'Proyek kelompok', caption: 'Proyek kelompok', wide: false },
  { id: 3, src: foto3, alt: 'Lomba KTI', caption: 'Lomba KTI', wide: false },
  { id: 4, src: foto4, alt: 'Liburan akhir semester', caption: 'Liburan akhir semester', wide: true },
]

function Gallery() {
  return (
    <section
      id="galeri"
      className="mx-auto max-w-6xl px-5 py-20 pb-32 md:px-8 md:pb-20"
    >
      <h2 className="font-display text-3xl font-bold md:text-4xl">Galeri</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {photos.map((foto) => (
          <figure
            key={foto.id}
            className={`overflow-hidden rounded-2xl border border-line bg-panel ${
              foto.wide ? 'sm:col-span-2' : ''
            }`}
          >
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover hover:scale-105 transition duration-500"
            />
            <figcaption className="px-5 py-3 text-muted">{foto.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery
