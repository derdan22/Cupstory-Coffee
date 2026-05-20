import { AnimatePresence, motion } from 'framer-motion'
import { Coffee, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { uk } from '../../lib/uk'

const links = [
  { hash: '#promo', label: uk.nav.promo },
  { hash: '#catalog', label: uk.nav.catalog },
  { hash: '#how-it-works', label: uk.nav.howItWorks },
]

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''
  const [menuOpen, setMenuOpen] = useState(false)

  const navHref = (hash: string) => (isHome ? hash : `/${hash}`)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="safe-top fixed left-0 right-0 top-0 z-50 px-3 pt-2 md:px-8 md:pt-3">
      <nav className="relative mx-auto flex max-w-7xl items-center gap-2">
        <Link to="/" className="flex min-h-11 items-center gap-2 text-cream" onClick={closeMenu}>
          <Coffee className="h-7 w-7 shrink-0 text-emerald-bright" />
          <span className="font-display text-base font-bold md:text-xl">
            Cup<span className="text-gradient-emerald">Story</span>
          </span>
        </Link>

        <ul className="glass-strong absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full px-1.5 py-1.5 md:flex">
          {links.map((link) => (
            <li key={link.hash}>
              <a
                href={navHref(link.hash)}
                className="rounded-full px-3.5 py-2 text-sm text-cream/75 transition hover:bg-forest-900 hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="glass-strong tap-target ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:hidden"
          aria-label={uk.nav.menu}
          aria-expanded={menuOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/40 md:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="glass-strong safe-top fixed left-3 right-3 top-[3.25rem] z-50 rounded-2xl p-4 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.hash}>
                    <a
                      href={navHref(link.hash)}
                      onClick={closeMenu}
                      className="tap-target flex rounded-xl px-4 py-3 text-lg font-medium text-cream active:bg-forest-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
