function Skills() {
  const keahlian = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git"];

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-white">
        Keahlian
      </h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {keahlian.map((skill, index) => (
          <li
            key={index}
            className="cursor-default rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 font-medium text-indigo-300 transition hover:-translate-y-1 hover:bg-indigo-500 hover:text-white"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
