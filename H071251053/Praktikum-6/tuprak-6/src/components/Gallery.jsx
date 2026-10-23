import foto1 from '../assets/gallery/section1.jpeg'
import foto2 from '../assets/gallery/section3.jpeg'
import foto3 from '../assets/gallery/hero1.jpeg'
import foto4 from '../assets/gallery/hero2.jpeg'
import foto5 from '../assets/gallery/section2.jpeg'
import foto6 from '../assets/gallery/section4.jpeg'

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: 'You Can Be Anything You Want' },
    { id: 2, src: foto2, judul: 'Believe In Yourself' },
    { id: 3, src: foto3, judul: 'Take It Easy' },
    { id: 4, src: foto4, judul: 'See Good in All Things' },
    { id: 5, src: foto5, judul: 'Stop Thinking, Start Doing' },
    { id: 6, src: foto6, judul: 'Life Is Short, Make It Sweet' },
  ]

  return (
    <section id="Gallery" className="bg-forest py-20 text-cream md:py-28">
      <div className="mx-auto w-full max-w-295 px-5 md:px-6">
        <p className="mb-3.5 font-mono text-[.72rem] uppercase tracking-[.12em] text-sun">
          • Gallery
        </p>
        <h2 className="mb-10 font-head text-[clamp(2rem,4vw,3rem)] leading-[1.15]">
          Moments &amp; Inspirations
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="group m-0 overflow-hidden rounded-[18px] bg-cream p-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="h-72 overflow-hidden rounded-[18px]">
                <img
                  src={foto.src}
                  alt={foto.judul}
                  className="h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
