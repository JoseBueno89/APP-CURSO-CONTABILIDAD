import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { glosario } from '../data/glosario'
import { PageHeader } from '../components/ui'

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function GlosarioPage() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  useEffect(() => setQ(params.get('q') ?? ''), [params])
  const [tag, setTag] = useState<string | null>(null)
  const tags = useMemo(() => [...new Set(glosario.flatMap((g) => g.tags))], [])
  const list = glosario
    .filter((g) => (!tag || g.tags.includes(tag)) && (!q || norm(g.term + ' ' + g.def).includes(norm(q))))
    .sort((a, b) => a.term.localeCompare(b.term, 'es'))

  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Recursos" title="Glosario">Los términos clave, explicados sin jerga y con un ejemplo.</PageHeader>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar término…" aria-label="Buscar término"
            className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[null, ...tags].map((t) => (
            <button key={t ?? 'all'} onClick={() => setTag(t)} aria-pressed={tag === t}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${tag === t ? 'bg-primary text-surface dark:text-[#0a1220]' : 'bg-surface-2 text-muted hover:text-ink'}`}>
              {t ?? 'Todos'}
            </button>
          ))}
        </div>
      </div>
      <dl className="grid gap-4 md:grid-cols-2">
        {list.map((g) => (
          <div key={g.term} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <dt className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-ink">{g.term}</span>
              <span className="flex gap-1">{g.tags.map((t) => <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t === 'Red flag' || t === 'Blanqueo' ? 'bg-danger-soft text-danger' : 'bg-surface-2 text-muted'}`}>{t}</span>)}</span>
            </dt>
            <dd className="mt-2 text-sm text-ink/85">{g.def}</dd>
            {g.ejemplo && <dd className="mt-2 rounded-lg bg-surface-2 p-2.5 text-xs text-muted"><strong className="text-ink">Ejemplo:</strong> {g.ejemplo}</dd>}
          </div>
        ))}
        {!list.length && <p className="text-muted">No hay resultados.</p>}
      </dl>
    </div>
  )
}
