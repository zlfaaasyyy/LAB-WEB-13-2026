import foto1 from '../assets/gallery/galeri1.png'
import foto2 from '../assets/gallery/galeri2.png'
import foto3 from '../assets/gallery/galeri3.png'
import foto4 from '../assets/gallery/galeri4.png'

const photoGallery = [
  { id: 1, title: 'Project 1', src: foto1 },
  { id: 2, title: 'Project 2', src: foto2 },
  { id: 3, title: 'Project 3', src: foto3 },
  { id: 4, title: 'Project 4', src: foto4 },
]

function Gallery() {
  return (
    <section id="galeri" className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl">
        Galeri <span className="text-accent">Foto</span>
      </h2>
      <div className="mt-2 h-1 w-16 rounded-full bg-accent" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {photoGallery.map((foto) => (
          <figure
            key={foto.id}
            className="group rounded-3xl border border-white/15 bg-gradient-to-b from-white/15 to-brand/50 p-3 backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_35px_rgba(123,44,214,0.6)]"
          >
            <div className="overflow-hidden rounded-2xl border border-white/30">
              <img
                src={foto.src}
                alt={foto.title}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <figcaption className="px-2 pb-2 pt-3 text-sm font-medium text-white/90">
              {foto.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery