export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-isi">
        <p className="footer-nama">Pustaka Senja</p>
        <div className="t-redup" style={{ fontSize: "0.9rem" }}>
          <p className="t-kabut">
            Pustaka Senja &copy; 2026, ruang baca &amp; perpustakaan komunitas
          </p>
          <p>Dibangun dengan Next.js App Router, PostgreSQL, dan Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
