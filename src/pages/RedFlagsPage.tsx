import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { redFlags } from '../data/redflags'
import type { RedFlag } from '../types'
import { PageHeader, Pill } from '../components/ui'
import { Rich } from '../lib/rich'

const areas: RedFlag['area'][] = ['Contabilidad', 'IVA', 'Modelos']

export default function RedFlagsPage() {
  const [area, setArea] = useState<RedFlag['area'] | null>(null)
  const list = redFlags.filter((r) => !area || r.area === area)
  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Recursos" title="Catálogo de red flags">
        Indicadores de riesgo contables y fiscales recogidos en los cursos y en los modelos. Por sí solos no prueban nada, pero te dicen dónde mirar.
      </PageHeader>
      <div className="mb-6 flex flex-wrap gap-2">
        {[null, ...areas].map((a) => (
          <button key={a ?? 'all'} onClick={() => setArea(a)} aria-pressed={area === a}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${area === a ? 'bg-danger text-white dark:text-[#0a1220]' : 'bg-surface-2 text-muted hover:text-ink'}`}>
            {a ?? 'Todas'} <span className="opacity-70">({a ? redFlags.filter((r) => r.area === a).length : redFlags.length})</span>
          </button>
        ))}
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {list.map((r, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.severity === 'alta' ? 'bg-danger-soft text-danger' : 'bg-warn-soft text-warn'}`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-ink">{r.title}</h2>
                <Pill tone={r.severity === 'alta' ? 'danger' : 'warn'}>{r.severity === 'alta' ? 'Riesgo alto' : 'Riesgo medio'}</Pill>
              </div>
              <p className="mt-1.5 text-sm text-ink/85"><Rich text={r.detail} /></p>
              {r.source && <p className="mt-2 text-xs text-muted">{r.area} · {r.source}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
