import { AlertTriangle, CheckCircle2, CircleAlert, GitCompareArrows } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { casillas303, escenarios, evaluar, otrosCampos, type CruceData, type Nivel } from '../data/cruces'
import { eur, Rich } from '../lib/rich'
import { PageHeader, Pill } from '../components/ui'

const nivelUi: Record<Nivel, { icon: React.ReactNode; box: string; label: string }> = {
  ok: { icon: <CheckCircle2 className="h-5 w-5 text-ok" />, box: 'border-ok/40', label: 'Cuadra' },
  warn: { icon: <CircleAlert className="h-5 w-5 text-warn" />, box: 'border-warn/50 bg-warn-soft/40', label: 'Atención' },
  alert: { icon: <AlertTriangle className="h-5 w-5 text-danger" />, box: 'border-danger/50 bg-danger-soft/40', label: 'Discrepancia' },
}

const clone = (d: CruceData): CruceData => ({ t: Object.fromEntries(Object.entries(d.t).map(([k, v]) => [k, [...v]])), o: { ...d.o } })

export default function CrucePage() {
  const [esc, setEsc] = useState(escenarios[0].id)
  const [data, setData] = useState<CruceData>(() => clone(escenarios[0].data))
  const results = useMemo(() => evaluar(data), [data])
  const counts = results.reduce((c, r) => ({ ...c, [r.nivel]: (c[r.nivel] ?? 0) + 1 }), {} as Record<Nivel, number>)

  const load = (id: string) => {
    const e = escenarios.find((x) => x.id === id)!
    setEsc(id)
    setData(clone(e.data))
  }
  const setT = (n: string, i: number, v: number) => setData((d) => ({ ...d, t: { ...d.t, [n]: (d.t[n] ?? [0, 0, 0, 0]).map((x, k) => (k === i ? v : x)) } }))
  const setO = (k: string, v: number) => setData((d) => ({ ...d, o: { ...d.o, [k]: v } }))
  const numInput = 'w-full rounded-md border border-line bg-surface px-2 py-1 text-right font-mono text-xs text-ink focus:border-accent focus:outline-none'

  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Curso 3 · Herramienta" title="Cruce de modelos">
        Las autoliquidaciones y declaraciones informativas de una misma empresa <strong className="text-ink">deben contar la misma historia</strong>. Introduce (o carga) los datos de los modelos 303, 390, 349 y 347 y la herramienta comprobará qué casillas deberían cuadrar y qué puede significar que no lo hagan.
      </PageHeader>

      <div className="mb-6 flex flex-wrap gap-2">
        {escenarios.map((e) => (
          <button key={e.id} onClick={() => load(e.id)} aria-pressed={esc === e.id}
            className={`rounded-xl border px-4 py-2 text-left text-sm transition ${esc === e.id ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-primary/40'}`}>
            <div className="font-semibold text-ink">{e.name}</div>
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm text-muted">{escenarios.find((e) => e.id === esc)?.desc}</p>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Entradas */}
        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <div className="flex items-center justify-between border-b border-line bg-primary-soft px-4 py-2.5">
              <h2 className="text-sm font-bold text-ink">Modelo 303 · trimestres</h2>
              <Link to="/modelos/303" className="text-xs font-semibold text-primary">Ver modelo</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-xs">
                <thead>
                  <tr className="text-muted">
                    <th className="px-3 py-2 text-left font-semibold">Casilla</th>
                    {['1T', '2T', '3T', '4T'].map((t) => <th key={t} className="px-2 py-2 text-right font-semibold">{t}</th>)}
                    <th className="px-3 py-2 text-right font-semibold">Σ Año</th>
                  </tr>
                </thead>
                <tbody>
                  {casillas303.map((c) => (
                    <tr key={c.n} className="border-t border-line">
                      <td className="px-3 py-1.5 text-ink"><span className="mr-1.5 rounded bg-[#0b2545] px-1 font-mono text-[10px] text-[#e0bb48]">{c.n}</span>{c.label}</td>
                      {[0, 1, 2, 3].map((i) => (
                        <td key={i} className="px-1 py-1"><input type="number" aria-label={`303 ${c.n} trimestre ${i + 1}`} value={data.t[c.n]?.[i] ?? 0} onChange={(e) => setT(c.n, i, Number(e.target.value))} className={numInput} /></td>
                      ))}
                      <td className="px-3 py-1.5 text-right font-mono font-semibold text-ink">{eur((data.t[c.n] ?? []).reduce((s, x) => s + x, 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-3">
            {(['390', '349', '347'] as const).map((m) => (
              <section key={m} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                <div className="flex items-center justify-between border-b border-line bg-primary-soft px-4 py-2.5">
                  <h2 className="text-sm font-bold text-ink">Modelo {m}</h2>
                  <Link to={`/modelos/${m}`} className="text-xs font-semibold text-primary">Ver</Link>
                </div>
                <div className="space-y-2 p-3">
                  {otrosCampos.filter((f) => f.modelo === m).map((f) => (
                    <label key={f.k} className="block text-[11px] text-muted">
                      {f.label}
                      <input type="number" value={data.o[f.k] ?? 0} onChange={(e) => setO(f.k, Number(e.target.value))} className={`${numInput} mt-0.5`} />
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <section aria-live="polite">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <GitCompareArrows className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-ink">Resultado de los cruces</h2>
            <Pill tone="ok">{counts.ok ?? 0} cuadran</Pill>
            <Pill tone="warn">{counts.warn ?? 0} atención</Pill>
            <Pill tone="danger">{counts.alert ?? 0} discrepancias</Pill>
          </div>
          <ul className="space-y-3">
            {results.map((r) => {
              const ui = nivelUi[r.nivel]
              return (
                <li key={r.titulo} className={`rounded-xl border bg-surface p-4 ${ui.box}`}>
                  <div className="flex items-start gap-3">
                    {ui.icon}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-ink">{r.titulo}</h3>
                        <span className="flex gap-1">{r.modelos.map((m) => <span key={m} className="rounded bg-[#0b2545] px-1.5 font-mono text-[10px] text-[#e0bb48]">{m}</span>)}</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                        <div className="rounded-md bg-surface-2 px-2 py-1"><div className="text-[10px] text-muted">{r.izquierda.label}</div><div className="text-ink">{eur(r.izquierda.valor)}</div></div>
                        <div className="rounded-md bg-surface-2 px-2 py-1"><div className="text-[10px] text-muted">{r.derecha.label}</div><div className="text-ink">{eur(r.derecha.valor)}</div></div>
                      </div>
                      <p className="mt-2 text-sm text-ink/85"><Rich text={r.explicacion} /></p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-xs text-muted">Herramienta didáctica: los cruces reales que realiza la AEAT son más amplios (SII, 111, 190, 200, información de terceros países…). Una discrepancia es un motivo para preguntar, no una prueba.</p>
        </section>
      </div>
    </div>
  )
}
