import Link from "next/link";

function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="grid items-end gap-10 rounded-3xl border border-line bg-surface p-8 shadow-lg shadow-berry/10 md:grid-cols-[1.4fr_1fr] md:p-12">
      <div>
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-5xl">{nama}</h1>
        <p className="mt-4 max-w-md leading-relaxed text-mute">{slogan}</p>
        <dl className="mt-6 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-mute">Lokasi</dt>
            <dd>{lokasi}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-mute">Jam buka</dt>
            <dd>{jamBuka}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="rounded-lg bg-berry px-5 py-2.5 font-medium text-white transition hover:bg-berry-dark hover:shadow-lg hover:shadow-berry/30 motion-safe:hover:-translate-y-0.5"
          >
            Jelajahi katalog
          </Link>
          <Link
            href="/usulan"
            className="rounded-lg border border-line px-5 py-2.5 font-medium text-ink transition hover:border-berry/40 hover:bg-soft motion-safe:hover:-translate-y-0.5"
          >
            Usulkan buku
          </Link>
        </div>
      </div>

    </section>
  );
}

export default Hero;