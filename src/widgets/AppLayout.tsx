import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

type AppLayoutProps = { children: ReactNode }

export function AppLayout({ children }: AppLayoutProps) {
  const [open, setOpen] = useState(false)
  const linkBase = 'rounded px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/70'
  const linkActive = 'text-slate-900 bg-white/90'

  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-50 via-sky-50 to-fuchsia-100 flex flex-col">
      <header className="sticky top-0 z-10 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <Link to="/" className="text-base font-extrabold tracking-tight text-slate-900">
              CoreCode
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
                Dashboard
              </NavLink>
              <NavLink to="/form" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
                Formulario
              </NavLink>
            <NavLink to="/simpsons" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
              Simpsons
            </NavLink>
            </div>
            <button aria-label="Abrir menú" className="sm:hidden rounded p-2 text-slate-700 hover:bg-white/70" onClick={() => setOpen((v) => !v)}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
          {open ? (
            <div className="sm:hidden pb-3">
              <nav className="flex flex-col gap-1">
                <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`} onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/form" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`} onClick={() => setOpen(false)}>
                  Formulario
                </NavLink>
              <NavLink to="/simpsons" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`} onClick={() => setOpen(false)}>
                Simpsons
              </NavLink>
              </nav>
            </div>
          ) : null}
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="mt-12 border-t border-white/60 bg-white/80">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">CoreCode</div>
            <p className="mt-1 text-xs text-slate-600">Ejemplos y ejercicios frontend. Hecho con ❤️ por un fanático de la programación.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Enlaces</div>
            <ul className="mt-1 space-y-1 text-xs text-slate-600">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/form">Formulario</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Legal</div>
            <ul className="mt-1 space-y-1 text-xs text-slate-600">
              <li>Privacidad</li>
              <li>Términos</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/60">
          <div className="mx-auto max-w-6xl px-4 py-4 text-center text-[11px] text-slate-500">
            © {new Date().getFullYear()} CoreCode. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}


