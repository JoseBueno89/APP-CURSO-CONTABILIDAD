import { AlertTriangle, BookOpen, Building2, FileStack, Info, Lightbulb, Receipt, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import type { CalloutVariant, Course } from '../types'
import { Rich } from '../lib/rich'

export function ProgressBar({ value, tone = 'accent' }: { value: number; tone?: 'accent' | 'teal' | 'primary' }) {
  const color = tone === 'teal' ? 'bg-teal' : tone === 'primary' ? 'bg-primary' : 'bg-accent'
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
    </div>
  )
}

export function CourseIcon({ icon, className = 'h-6 w-6' }: { icon: Course['icon']; className?: string }) {
  if (icon === 'building') return <Building2 className={className} aria-hidden />
  if (icon === 'receipt') return <Receipt className={className} aria-hidden />
  return <FileStack className={className} aria-hidden />
}

const calloutStyles: Record<CalloutVariant, { box: string; icon: ReactNode; label: string }> = {
  info: { box: 'border-primary/30 bg-primary-soft', icon: <Info className="h-5 w-5 text-primary" />, label: 'Nota' },
  analogia: { box: 'border-accent/40 bg-accent-soft', icon: <Lightbulb className="h-5 w-5 text-accent" />, label: 'Analogía' },
  investigacion: { box: 'border-teal/40 bg-teal-soft', icon: <Search className="h-5 w-5 text-teal" />, label: 'Para la investigación' },
  redflag: { box: 'border-danger/40 bg-danger-soft', icon: <AlertTriangle className="h-5 w-5 text-danger" />, label: 'Red flags' },
  ejemplo: { box: 'border-line bg-surface-2', icon: <BookOpen className="h-5 w-5 text-muted" />, label: 'Ejemplo' },
}

export function Callout({ variant, title, text }: { variant: CalloutVariant; title?: string; text: string }) {
  const s = calloutStyles[variant]
  return (
    <aside className={`my-6 rounded-xl border-l-4 border ${s.box} p-5`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
        {s.icon}
        <span>{title ?? s.label}</span>
      </div>
      <p className="leading-relaxed text-ink/90"><Rich text={text} /></p>
    </aside>
  )
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'danger' | 'warn' | 'ok' | 'accent' | 'teal' }) {
  const map = {
    neutral: 'bg-surface-2 text-muted',
    danger: 'bg-danger-soft text-danger',
    warn: 'bg-warn-soft text-warn',
    ok: 'bg-ok-soft text-ok',
    accent: 'bg-accent-soft text-accent',
    teal: 'bg-teal-soft text-teal',
  }
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}>{children}</span>
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-8">
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
      {children && <div className="mt-3 max-w-3xl text-muted">{children}</div>}
    </header>
  )
}
