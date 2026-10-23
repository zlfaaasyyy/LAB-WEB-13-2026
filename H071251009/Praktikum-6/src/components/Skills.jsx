const skills = [
  'HTML & CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'npm run dev',
]

function Skills() {
  return (
    <section id="keahlian" className="bg-panel py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Keahlian</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Alat dan bahasa yang kupake untuk bikin proyek.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="rounded-full border border-mint/40 px-6 py-3 text-lg font-medium text-mint transition-colors hover:bg-mint hover:text-ink"
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
