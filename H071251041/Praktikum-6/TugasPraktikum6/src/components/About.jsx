
const personalData = [
  { id: 1, label: "Full Name", value: "Mawaddah Fajri Lahamuddin" },
  { id: 2, label: "University", value: "Universitas Hasanuddin" },
  { id: 3, label: "Major", value: "Information Systems" },
];

function About() {
  return (
    <section id="About" className="bg-white py-20 px-12 md:px-24 scroll-mt-15">

      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center">

        <div className="w-full md:w-2/5 flex flex-col justify-center gap-5 text-center md:text-left">

          <h2 className="text-4xl md:text-5xl font-bold text-(--maroon)">
            About <span className="text-(--merah)">Me</span>
          </h2>

          <p className="text-sm md:text-base leading-7 text-(--coklat)">
            I’m always open to new experiences and opportunities to learn. I enjoy exploring new ideas, trying different things, and growing through every experience along the way.
          </p>

          <div className="mt-2 p-4 bg-(--pink--muda) border-l-4 border-(--merah) rounded-r-lg">
            <p className="text-sm font-semibold text-(--maroon)">
              Information Systems Student
            </p>
            <p className="text-sm text-(--coklat) mt-1">
              Universitas Hasanuddin
            </p>
          </div>

        </div>

        {/* Data Diri */}
        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <div className="bg-(--pink--muda) p-8 md:p-10 rounded-2xl border border-(--pink) shadow-sm">
            <ul className="flex flex-col gap-6">
              {personalData.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-start border-b border-white/60 pb-4 last:border-0 last:pb-0"
                >
                  <span className="w-full sm:w-2/5 text-sm font-semibold text-(--merah) mb-1 sm:mb-0 uppercase tracking-wider">
                    {item.label}
                  </span>

                  <span className="w-full sm:w-3/5 text-base md:text-lg font-bold text-(--maroon)">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
