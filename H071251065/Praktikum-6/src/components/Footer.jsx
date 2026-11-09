function Footer() {
  const tahun = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-white/10 bg-brand-deep/60 py-8 text-center text-sm text-white/60 backdrop-blur-xl">
      <p>
        &copy; {tahun} <span className="font-semibold text-accent">Zahwa Dwi Putri</span>. Semua hak dilindungi.
      </p>
    </footer>
  )
}

export default Footer
