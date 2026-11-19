"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { hueKategori } from "@/lib/kategori";
import Sampul from "@/components/Sampul";

function kurangiGerak() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function RakBuku({ buku = [] }) {
  const [aktifMentah, setAktif] = useState(-1);
  const aktif = Math.min(aktifMentah, buku.length - 1);
  const scrollRef = useRef(null);
  const slotRef = useRef([]);
  const drag = useRef({ geser: false });
  const bingkai = useRef(0);
  const programatik = useRef(false);
  const timerProg = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setAktif(0), kurangiGerak() ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const selesai = () => { programatik.current = false; };
    el.addEventListener("scrollend", selesai);
    return () => el.removeEventListener("scrollend", selesai);
  }, []);

  function tandaiProgramatik() {
    programatik.current = true;
    clearTimeout(timerProg.current);
    timerProg.current = setTimeout(() => { programatik.current = false; }, 900);
  }

  function ketengah(i) {
    const el = scrollRef.current;
    const slot = slotRef.current[i];
    if (!el || !slot) return;
    el.scrollTo({
      left: slot.offsetLeft + slot.offsetWidth / 2 - el.clientWidth / 2,
      behavior: kurangiGerak() ? "auto" : "smooth",
    });
  }

  function pilih(i, tengah) {
    setAktif(i);
    if (tengah) {
      tandaiProgramatik();
      ketengah(i);
    }
  }

  function pindah(arah) {
    const berikut = Math.min(buku.length - 1, Math.max(0, (aktif < 0 ? 0 : aktif) + arah));
    pilih(berikut, true);
    slotRef.current[berikut]?.querySelector("a")?.focus({ preventScroll: true });
  }

  // Buku yang paling dekat dengan tengah rak menjadi buku aktif saat digeser.
  function saatScroll() {
    if (programatik.current) return; // jangan ubah buku aktif di tengah animasi gulir
    cancelAnimationFrame(bingkai.current);
    bingkai.current = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      const tengah = el.scrollLeft + el.clientWidth / 2;
      let terdekat = 0;
      let jarak = Infinity;
      slotRef.current.forEach((s, i) => {
        if (!s) return;
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - tengah);
        if (d < jarak) { jarak = d; terdekat = i; }
      });
      setAktif((a) => (a === -1 ? a : terdekat));
    });
  }

  // Buku di bawah kursor ditentukan dari posisi slot di rak, bukan dari sampul 3D
  // yang melebar dan menutupi tetangganya. Dengan begitu tidak ada buku yang terlewat.
  function saatPointerMove(e) {
    if (e.pointerType !== "mouse" || drag.current.geser || programatik.current) return;
    const el = scrollRef.current;
    const x = e.clientX - el.getBoundingClientRect().left + el.scrollLeft;
    const i = slotRef.current.findIndex((s) => s && x >= s.offsetLeft && x < s.offsetLeft + s.offsetWidth);
    if (i >= 0) setAktif(i);
  }

  function saatPointerDown(e) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollRef.current;
    const mulai = { x: e.clientX, kiri: el.scrollLeft };
    drag.current.geser = false;

    function gerak(ev) {
      const dx = ev.clientX - mulai.x;
      if (!drag.current.geser && Math.abs(dx) > 5) {
        drag.current.geser = true;
        el.classList.add("sedang-drag");
      }
      if (drag.current.geser) el.scrollLeft = mulai.kiri - dx;
    }
    function lepas() {
      window.removeEventListener("pointermove", gerak);
      window.removeEventListener("pointerup", lepas);
      window.removeEventListener("pointercancel", lepas);
      el.classList.remove("sedang-drag");
      setTimeout(() => { drag.current.geser = false; }, 0); // setelah event click lewat
    }
    window.addEventListener("pointermove", gerak);
    window.addEventListener("pointerup", lepas);
    window.addEventListener("pointercancel", lepas);
  }

  function saatKlik(e, i) {
    if (drag.current.geser) return e.preventDefault(); // akhir drag bukan klik
    if (i !== aktif) {
      e.preventDefault(); // ketukan pertama (layar sentuh) hanya memilih buku
      pilih(i, true);
    }
  }

  function saatKey(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); pindah(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pindah(-1); }
  }

  if (buku.length === 0) {
    return (
      <div className="wrap">
        <div className="kosong">
          <p className="judul-seksi">Rak masih kosong</p>
          <p className="t-kabut" style={{ marginBlock: "0.5rem 1.25rem" }}>
            Belum ada buku di database. Tambahkan buku pertama untuk mengisi rak ini.
          </p>
          <Link href="/katalog/baru" className="btn btn-utama">Tambah Buku</Link>
        </div>
      </div>
    );
  }

  const terpilih = buku[aktif < 0 ? 0 : aktif];

  return (
    <section className="rak" aria-label="Rak buku">
      <div className="rak-panggung">
      <div
        ref={scrollRef}
        className="rak-scroll"
        role="group"
        aria-label="Rak buku. Geser ke samping atau gunakan tombol panah kiri dan kanan."
        onScroll={saatScroll}
        onPointerDown={saatPointerDown}
        onPointerMove={saatPointerMove}
        onKeyDown={saatKey}
      >
        {buku.map((b, i) => (
          <div
            key={b.id}
            ref={(el) => { slotRef.current[i] = el; }}
            className="slot"
            style={{ "--i": i, "--h": hueKategori(b.kategori) }}
            data-sisi={aktif < 0 ? undefined : i < aktif ? "kiri" : i > aktif ? "kanan" : "aktif"}
          >
            <Link
              href={`/katalog/${b.id}`}
              className="slot-link"
              draggable={false}
              aria-label={`${b.judul}, oleh ${b.penulis}`}
              aria-current={i === aktif ? "true" : undefined}
              onClick={(e) => saatKlik(e, i)}
              onFocus={() => { if (!programatik.current) pilih(i, true); }}
            >
              <span className="slot-inner">
                <span className="buku">
                  <span className="muka muka-depan"><Sampul buku={b} /></span>
                  <span className="muka muka-belakang" />
                  <span className="muka muka-punggung">
                    <span className="punggung">
                      <span className="punggung-judul">{b.judul}</span>
                      <span className="punggung-tahun">{b.tahun}</span>
                    </span>
                  </span>
                  <span className="muka muka-halaman" />
                </span>
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="rak-papan" aria-hidden="true" />
      </div>

      <div className="rak-info wrap" aria-live="polite">
        <div key={terpilih.id} className="rak-info-isi">
          <div className="entri-meta">
            <span className="chip chip-kat">{terpilih.kategori}</span>
            <span className={`chip ${terpilih.tersedia ? "chip-ok" : "chip-pinjam"}`}>
              {terpilih.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>
          <p className="rak-info-judul">{terpilih.judul}</p>
          <p className="t-kabut">{terpilih.penulis}, terbit {terpilih.tahun}</p>
        </div>
        <div className="rak-kontrol">
          <button type="button" className="btn btn-garis bulat" onClick={() => pindah(-1)} aria-label="Buku sebelumnya" disabled={aktif <= 0}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="btn btn-garis bulat" onClick={() => pindah(1)} aria-label="Buku berikutnya" disabled={aktif >= buku.length - 1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <Link href={`/katalog/${terpilih.id}`} className="btn btn-utama">Lihat Detail</Link>
        </div>
      </div>
    </section>
  );
}
