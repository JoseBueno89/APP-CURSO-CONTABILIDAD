import { AlertTriangle, Award, BookMarked, Building2, FileStack, GitCompareArrows, LayoutDashboard, Menu, Moon, Receipt, ShieldCheck, Sun, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import GlobalSearch from './GlobalSearch'

const nav: { to: string; label: string; icon: ReactNode; end?: boolean }[] = [
  { to: '/', label: 'Inicio', icon: <LayoutDashboard className="h-5 w-5" />, end: true },
  { to: '/curso/contabilidad', label: 'Contabilidad de Sociedades', icon: <Building2 className="h-5 w-5" /> },
  { to: '/curso/iva', label: 'IVA', icon: <Receipt className="h-5 w-5" /> },
  { to: '/modelos', label: 'Modelos Tributarios', icon: <FileStack className="h-5 w-5" /> },
  { to: '/cruce', label: 'Cruce de modelos', icon: <GitCompareArrows className="h-5 w-5" /> },
  { to: '/red-flags', label: 'Red Flags', icon: <AlertTriangle className="h-5 w-5" /> },
  { to: '/glosario', label: 'Glosario', icon: <BookMarked className="h-5 w-5" /> },
  { to: '/certificado', label: 'Certificados', icon: <Award className="h-5 w-5" /> },
]

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* noop */
    }
  }, [dark])
  return [dark, setDark] as const
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#c9a227] to-[#a07d12] text-[#0b2545] shadow-lg">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-extrabold tracking-tight text-white">Academia Fiscal</div>
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9fb4d4]">Investigación financiera</div>
      </div>
    </div>
  )
}

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Navegación principal">
      {nav.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10' : 'text-[#b9c8de] hover:bg-white/5 hover:text-white'
            }`
          }
        >
          {n.icon}
          {n.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Layout() {
  const [dark, setDark] = useTheme()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc.pathname])

  return (
    <div className="min-h-screen lg:pl-72 print:pl-0">
      {/* Sidebar escritorio */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-[#0b2545] px-5 py-6 lg:flex">
        <Brand />
        <div className="mt-10 flex-1">
          <SideNav />
        </div>
        <p className="text-[11px] leading-relaxed text-[#7f95b8]">
          Contenido formativo. Contrasta siempre con la normativa vigente y la Sede Electrónica de la AEAT.
        </p>
      </aside>

      {/* Drawer móvil */}
      {open && (
        <div className="no-print fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-[#0b2545] px-5 py-6 animate-fade-up">
            <div className="mb-8 flex items-center justify-between">
              <Brand />
              <button onClick={() => setOpen(false)} className="text-white" aria-label="Cerrar menú">
                <X className="h-6 w-6" />
              </button>
            </div>
            <SideNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Topbar */}
      <header className="no-print sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-surface/85 px-4 backdrop-blur sm:px-8">
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <Menu className="h-6 w-6 text-ink" />
        </button>
        <GlobalSearch />
        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink hover:bg-surface-2"
          aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10 print:max-w-none print:p-0">
        <Outlet />
      </main>
    </div>
  )
}
