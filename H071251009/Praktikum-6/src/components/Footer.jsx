function Footer() {
  const tahun = new Date().getFullYear()
  const nama = 'Muh Naufal Alim'

  return (
    <footer className="border-t border-line px-5 py-8 pb-24 text-center text-muted md:pb-8">
      <p>
        &copy; {tahun} {nama}. Dibuat dengan React, Vite, dan Tailwind CSS.
      </p>
    </footer>
  )
}

export default Footer
