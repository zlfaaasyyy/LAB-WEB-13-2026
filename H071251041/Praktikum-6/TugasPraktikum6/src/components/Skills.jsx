
const skills = [
  "Algorithm",
  "OOP",
  "Java"
];

function Skills() {
  return (
    <section id="Skills" className="py-20 px-12 md:px-24 flex flex-col items-center gap-10 bg-(--putih) scroll-mt-14">

      <div className="flex flex-col items-center gap-3">
        <h2 className="text-4xl md:text-5xl font-bold text-(--maroon)">
          My <span className="text-(--merah)">Skills</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
        {skills.map((skill) => (
          <div
            key={skill}
            className="group flex items-center justify-center min-h-24 px-4 py-6 bg-(--pink--muda) border border-(--pink) rounded-2xl shadow-sm hover:bg-(--pink) hover:border-(--merah) hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-sm md:text-base font-semibold text-(--maroon) text-center group-hover:text-(--coklat) transition-colors duration-300">
              {skill}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
