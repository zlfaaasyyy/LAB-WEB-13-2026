function Skills() {
  const skills = [
    'Python',
    'Java',
    'JavaFX',
    'Dasar OOP',
    'Algoritma & Struktur Data',
    'Dasar SQL',
    'Git & GitHub'
  ]

  return (
    <section id="Skills" className="border-y border-line bg-cream2 py-20 md:py-28">
      <div className="mx-auto w-full max-w-295 px-5 md:px-6">
        <p className="mb-3.5 font-mono text-[.72rem] uppercase tracking-[.12em] text-ember">
          • Skills
        </p>
        <h2 className="mb-10 font-head text-[clamp(2rem,4vw,3rem)] leading-[1.15]">
          What I'm Exploring
        </h2>
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="cursor-default rounded-full border-[1.5px] border-ink bg-card px-5 py-2.5 font-mono text-[.8rem] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-sun hover:bg-sun hover:text-night"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills
