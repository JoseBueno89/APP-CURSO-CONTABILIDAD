import { ArrowRight, Award, BookMarked, Clock, FileStack, GitCompareArrows, Lock, RefreshCw, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { curso3Meta } from '../data/curso2-iva'
import { modelos } from '../data/modelos'
import { useProgress } from '../lib/progress'
import { CourseIcon, ProgressBar } from '../components/ui'

export default function Home() {
  const { courseProgress, completed, modelosVistos } = useProgress()
  const totalLessons = courses.reduce((s, c) => s + c.modules.reduce((x, m) => x + m.lessons.length, 0), 0)
  const done = Object.keys(completed).length
  const disponibles = modelos.filter((m) => m.disponible)
  const pctModelos = disponibles.length ? Math.round((modelosVistos.filter((id) => disponibles.some((m) => m.id === id)).length / disponibles.length) * 100) : 0

  const badges = [
    ...courses.map((c) => ({ name: c.badge, earned: courseProgress(c.id).pct === 100, tone: c.color })),
    { name: curso3Meta.badge, earned: pctModelos === 100, tone: 'accent' as const },
  ]

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0b2545] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a227]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-[#0f8b8d]/25 blur-3xl" />
        <svg className="pointer-events-none absolute right-6 top-6 hidden h-40 w-72 opacity-25 md:block" viewBox="0 0 280 160" fill="none" aria-hidden>
          <path d="M10 140 L60 100 L100 115 L150 60 L200 75 L270 20" stroke="#c9a227" strokeWidth="2.5" className="flow-line" />
          {[[60, 100], [100, 115], [150, 60], [200, 75], [270, 20]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#c9a227" />)}
          <path d="M10 150 H270" stroke="#9fb4d4" strokeWidth="1" />
        </svg>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Programa de formación</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Sigue el rastro del dinero en la contabilidad y los impuestos
        </h1>
        <p className="mt-4 max-w-2xl text-[#c3d1e6]">
          Formación práctica en contabilidad de sociedades, IVA y modelos tributarios para equipos de investigación de blanqueo de capitales. Sin jerga y con casos reales.
        </p>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          <Stat label="Lecciones completadas" value={`${done}/${totalLessons}`} />
          <Stat label="Modelos explorados" value={`${modelosVistos.length}`} />
          <Stat label="Insignias" value={`${badges.filter((b) => b.earned).length}/${badges.length}`} />
        </div>
      </section>

      {/* Cursos */}
      <h2 className="mb-4 mt-12 text-lg font-bold text-ink">Tus cursos</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {courses.map((c) => {
          const p = courseProgress(c.id)
          const accent = c.color === 'teal' ? 'text-teal bg-teal-soft' : 'text-primary bg-primary-soft'
          return (
            <Link key={c.id} to={`/curso/${c.id}`} className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}><CourseIcon icon={c.icon} /></div>
                <span className="font-mono text-xs font-semibold text-muted">{c.code}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{c.tagline}</p>
              <div className="mt-5">
                <div className="mb-1.5 flex justify-between text-xs text-muted"><span>{c.modules.length} módulos</span><span>{p.pct}%</span></div>
                <ProgressBar value={p.pct} tone={c.color === 'teal' ? 'teal' : 'accent'} />
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {p.done ? 'Continuar' : 'Empezar'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          )
        })}
        <Link to="/modelos" className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"><FileStack className="h-6 w-6" /></div>
            <span className="font-mono text-xs font-semibold text-muted">{curso3Meta.code}</span>
          </div>
          <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{curso3Meta.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{curso3Meta.tagline}</p>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs text-muted"><span>{modelos.length} modelos</span><span>{pctModelos}%</span></div>
            <ProgressBar value={pctModelos} />
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Abrir biblioteca <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link>
      </div>

      {/* Accesos y logros */}
      <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-ink">Acceso rápido</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Quick to="/modelos/303" icon={<FileStack className="h-5 w-5" />} title="Modelo 303 interactivo" sub="Todas las casillas explicadas" />
            <Quick to="/red-flags" icon={<ShieldAlert className="h-5 w-5" />} title="Catálogo de red flags" sub="Indicadores de riesgo por área" />
            <Quick to="/glosario" icon={<BookMarked className="h-5 w-5" />} title="Glosario" sub="Términos explicados con ejemplos" />
            <Quick to="/curso/contabilidad/c1-m4-l1" icon={<Clock className="h-5 w-5" />} title="Leer un balance en 5 min" sub="Lección destacada" />
            <Quick to="/curso/iva/c2-m8-l1" icon={<RefreshCw className="h-5 w-5" />} title="El fraude carrusel" sub="Diagrama interactivo paso a paso" />
            <Quick to="/cruce" icon={<GitCompareArrows className="h-5 w-5" />} title="Cruce de modelos" sub="303 · 390 · 349 · 347" />
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-ink">Insignias</h2>
          <ul className="space-y-3">
            {badges.map((b) => (
              <li key={b.name} className={`flex items-center gap-3 rounded-xl border p-3 ${b.earned ? 'border-accent bg-accent-soft' : 'border-line'}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${b.earned ? 'bg-accent text-[#0b2545]' : 'bg-surface-2 text-muted'}`}>
                  {b.earned ? <Award className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{b.name}</div>
                  <div className="text-xs text-muted">{b.earned ? 'Conseguida' : 'Completa el curso para desbloquearla'}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="font-mono text-xl font-semibold text-white">{value}</div>
      <div className="mt-0.5 text-[11px] leading-tight text-[#9fb4d4]">{label}</div>
    </div>
  )
}

function Quick({ to, icon, title, sub }: { to: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-primary/40 hover:bg-surface-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-ink">{title}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
    </Link>
  )
}
