function Footer() {
  const kontak = [
    {
      id: 1,
      nama: "GitHub",
      link: "https://github.com/arenjiee",
      warna: "hover:border-white hover:bg-white hover:text-slate-900",
    },
    {
      id: 2,
      nama: "WhatsApp",
      link: "https://wa.me/6283892122629",
      warna: "hover:border-green-500 hover:bg-green-500 hover:text-white",
    },
    {
      id: 3,
      nama: "Instagram",
      link: "https://instagram.com/aren_jiee",
      warna: "hover:border-pink-500 hover:bg-pink-500 hover:text-white",
    },
  ];

  return (
    <footer id="contact" className="scroll-mt-20 bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="mb-3 text-3xl font-bold text-white">Hubungi Saya</h2>
        <p className="mb-8 text-slate-400">
          Mau berdiskusi atau kenalan? Hubungi saya lewat salah satu link ini.
        </p>

        <ul className="mb-12 flex flex-wrap justify-center gap-4">
          {kontak.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={`inline-block rounded-full border border-slate-700 px-6 py-2.5 font-medium text-slate-300 transition hover:-translate-y-1 ${item.warna}`}
              >
                {item.nama}
              </a>
            </li>
          ))}
        </ul>

        <p className="border-t border-slate-800 pt-6 text-sm text-slate-500">
          &copy; 2026 Aren. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
