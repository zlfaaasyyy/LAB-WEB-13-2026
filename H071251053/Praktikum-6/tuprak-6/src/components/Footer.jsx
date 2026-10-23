const socialList = [
  { id: 1, name: 'GitHub', href: 'https://github.com/firahnuraisyah', icon: '/github.svg' },
  { id: 2, name: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=nuraisyahfirah@gmail.com', icon: '/gmail.svg' },
  { id: 3, name: 'Instagram', href: 'https://www.instagram.com/aisyhfiraalfkar_', icon: '/instagram.svg' },
]

function Footer() {
  return (
    <footer className="bg-cream2 px-5 py-10 text-center text-ink">
      <div className="mb-6 flex items-center justify-center gap-6">
        {socialList.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-pistachio/40 bg-brand-pistachio-light shadow-sm transition hover:scale-110 hover:bg-brand-pistachio-light/60"
          >
            <img src={social.icon} alt="" className="h-5 w-5" />
          </a>
        ))}
      </div>

      <p className="font-mono text-[.75rem] tracking-[.04em] text-ink">
        &copy; 2026 Firah Nuraisyah. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer;
