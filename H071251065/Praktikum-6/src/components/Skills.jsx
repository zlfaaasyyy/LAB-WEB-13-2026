const skills = ['Illustration', 'Graphic Design', 'Visual Branding', 'UI/UX Design', 'Web Development']

function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl">
        Keahlian <span className="text-accent">Saya</span>
      </h2>
      <div className="mt-2 h-1 w-16 rounded-full bg-accent" />

      <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/15 to-brand/40 px-4 py-8 text-center text-sm font-semibold backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_30px_rgba(215,220,73,0.3)]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
