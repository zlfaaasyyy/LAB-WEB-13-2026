
import pict1 from '../assets/gallery/pict1.jpeg';
import pict2 from '../assets/gallery/pict2.jpeg';
import pict3 from '../assets/gallery/pict3.jpeg';
import pict4 from '../assets/gallery/pict4.jpeg';
import pict5 from '../assets/gallery/pict5.jpeg';
import pict6 from '../assets/gallery/pict6.jpeg';
import pict7 from '../assets/gallery/pict7.jpeg';

const photos = [
  { id: 1, src: pict3, alt: "Kegiatan 1" },
  { id: 7, src: pict7, alt: "Kegiatan 2" },
  { id: 5, src: pict5, alt: "Kegiatan 3" },
  { id: 6, src: pict6, alt: "Kegiatan 4" },
  { id: 2, src: pict2, alt: "Kegiatan 5" },
  { id: 3, src: pict1, alt: "Kegiatan 6" },
  { id: 4, src: pict4, alt: "Kegiatan 7" }
];

function Gallery() {
  return (
    <section id="Gallery" className="bg-white py-16 px-6 md:px-24 flex flex-col gap-8 scroll-mt-14">
      <div className="flex flex-col items-center gap-3">

        <h2 className="text-4xl md:text-5xl font-bold text-(--maroon)">
          My <span className="text-(--merah)">Gallery.</span>
        </h2>

        </div>

      <div className="flex flex-row gap-6 overflow-x-auto w-full py-4 px-1">
        {photos.map((foto) => (
          <div
            key={foto.id}
            className="w-64 md:w-80 shrink-0 rounded-2xl border-2 border-(--pink--muda) p-2 transition-all duration-300 hover:border-(--pink) hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={foto.src}
              alt={foto.alt}
              className="w-full h-52 md:h-64 object-cover rounded-xl transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
