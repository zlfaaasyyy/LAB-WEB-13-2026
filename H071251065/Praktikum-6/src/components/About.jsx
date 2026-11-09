const dataDiri = [
  { id: 1, label: 'Nama', value: 'Zahwa Dwi Putri' },
  { id: 2, label: 'Program Studi', value: 'Information System' },
  { id: 3, label: 'Semester', value: '3' },
  { id: 4, label: 'Hobi', value: 'Design' },
  { id: 5, label: 'Email', value: 'zahwaputry279@gmail.com' },
]

function About() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <div className="rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-xl shadow-brand/40 backdrop-blur-xl sm:p-10">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Tentang <span className="text-accent">Saya</span>
        </h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-accent" />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
           I'm an Information Systems student with a growing passion for visual storytelling, illustration, and digital design.
           I enjoy exploring how visuals can communicate ideas, evoke emotions, and make information easier to understand. 
           From creating illustrations and graphic materials to exploring UI/UX design, I'm always curious about how creativity and technology can work together.
           My curiosity extends beyond visual design. 
           I'm also learning how code and technology work behind digital experiences, allowing me to explore ideas from both creative and technical perspectives.
          </p>

          <ul className="space-y-3">
            {dataDiri.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 rounded-2xl border border-brand-light/50 bg-brand/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-accent">{item.label}</span>
                <span className="text-sm font-semibold text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
