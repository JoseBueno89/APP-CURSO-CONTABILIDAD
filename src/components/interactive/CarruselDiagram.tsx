import { useState } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight, Landmark, RotateCcw } from 'lucide-react'
import { eur, Rich } from '../../lib/rich'

interface Node { id: string; name: string; role: string; pais: string; ue: boolean }
const nodes: Node[] = [
  { id: 'A', name: 'Proveedor UE', role: 'Conduit', pais: 'Alemania', ue: true },
  { id: 'B', name: 'Trucha', role: 'Missing trader', pais: 'España', ue: false },
  { id: 'C', name: 'Pantalla', role: 'Buffer', pais: 'España', ue: false },
  { id: 'D', name: 'Broker', role: 'Exportador', pais: 'España', ue: false },
  { id: 'E', name: 'Cliente UE', role: 'Conduit', pais: 'Francia', ue: true },
]

interface Step {
  from: number
  to: number
  label: string
  title: string
  text: string
  flag?: string
  ingresado: number
  devuelto: number
  noIngresado: number
}

const steps: Step[] = [
  { from: 0, to: 1, label: '1.000.000 € sin IVA', title: '1. Compra intracomunitaria sin IVA', text: 'El proveedor alemán vende 1.000 procesadores a la **trucha** española por 1.000.000 €. Como es una entrega intracomunitaria, va **sin IVA**. La trucha se autorrepercute y se deduce el IVA en su 303 (casillas 10/11 y 36/37): efecto neutro.', flag: 'La trucha es una sociedad de pocos meses, con un administrador sin perfil empresarial y alta reciente en el ROI.', ingresado: 0, devuelto: 0, noIngresado: 0 },
  { from: 1, to: 2, label: '990.000 € + 207.900 € IVA', title: '2. La trucha vende con IVA… y por debajo de coste', text: 'La trucha vende la mercancía a la **pantalla** por **990.000 €** (¡menos de lo que le costó!) más **207.900 €** de IVA. Cobra en total 1.197.900 €. Puede permitirse perder 10.000 € porque va a quedarse con el IVA.', flag: 'Precio de venta inferior al de compra: firma característica de la trucha.', ingresado: 0, devuelto: 0, noIngresado: 0 },
  { from: 1, to: 1, label: '', title: '3. La trucha desaparece', text: 'La trucha **no ingresa** los 207.900 € de IVA (o presenta el 303 sin ingreso) y **desaparece**: cierra cuentas, el administrador testaferro no localizable, domicilio inexistente. El dinero ya ha salido, normalmente al extranjero.', flag: 'Vida corta, 303 sin ingreso, cuentas bancarias vaciadas en días.', ingresado: 0, devuelto: 0, noIngresado: 207900 },
  { from: 2, to: 3, label: '995.000 € + 208.950 € IVA', title: '4. La pantalla revende con margen mínimo', text: 'La **pantalla** vende al **broker** por 995.000 € + 208.950 € de IVA. Repercute 208.950 €, se deduce 207.900 € e **ingresa solo 1.050 €**. Cumple con sus obligaciones y sirve de "cortafuegos" entre la trucha y el broker.', flag: 'Margen ínfimo para un intermediario que no aporta nada (ni almacén, ni transporte).', ingresado: 1050, devuelto: 0, noIngresado: 207900 },
  { from: 3, to: 4, label: '1.000.000 € sin IVA', title: '5. El broker exporta y pide la devolución', text: 'El **broker** vende la mercancía a un cliente de **Francia** por 1.000.000 € **sin IVA** (entrega intracomunitaria, casilla 59 del 303). Como soportó 208.950 € de IVA y no repercute nada, **solicita a Hacienda la devolución** de 208.950 €.', flag: 'Solicitudes de devolución elevadas y recurrentes cuyo proveedor es una sociedad joven.', ingresado: 1050, devuelto: 208950, noIngresado: 207900 },
  { from: 4, to: 0, label: 'La mercancía vuelve', title: '6. El carrusel vuelve a girar', text: 'El cliente francés (controlado por la organización) devuelve la mercancía al proveedor alemán, y **el ciclo empieza de nuevo** con otra trucha. Los mismos 1.000 procesadores pueden dar decenas de vueltas. **Cada vuelta, Hacienda pierde 207.900 €.**', flag: 'La misma mercancía (mismos números de serie) aparece en operaciones sucesivas: circularidad.', ingresado: 1050, devuelto: 208950, noIngresado: 207900 },
]

const W = 640
const H = 420
const cx = W / 2
const cy = H / 2 + 6
const pos = nodes.map((_, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180)
  return { x: cx + 230 * Math.cos(a), y: cy + 150 * Math.sin(a) }
})

function curve(i: number, j: number) {
  const p1 = pos[i]
  const p2 = pos[j]
  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2
  const dx = mx - cx
  const dy = my - cy
  const len = Math.hypot(dx, dy) || 1
  const c = { x: mx + (dx / len) * 45, y: my + (dy / len) * 45 }
  const q = (t: number) => ({
    x: (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * c.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * c.y + t ** 2 * p2.y,
  })
  const s = q(0.2)
  const e = q(0.8)
  const m = q(0.5)
  return { d: `M${s.x},${s.y} Q${c.x},${c.y} ${e.x},${e.y}`, mid: m }
}

export default function CarruselDiagram() {
  const [step, setStep] = useState(0) // 0 = intro, 1..6 = pasos
  const cur = step > 0 ? steps[step - 1] : null
  const done = steps.slice(0, step)
  const truchaGone = step >= 3
  const saldo = (cur?.ingresado ?? 0) - (cur?.devuelto ?? 0)

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0b2545] px-5 py-3 text-white">
        <span className="text-sm font-semibold">Fraude carrusel · paso {step} de {steps.length}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setStep(0)} className="rounded-lg p-1.5 text-[#b9c8de] hover:bg-white/10" aria-label="Reiniciar"><RotateCcw className="h-4 w-4" /></button>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-lg p-1.5 hover:bg-white/10 disabled:opacity-30" aria-label="Paso anterior"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step === steps.length} className="flex items-center gap-1 rounded-lg bg-[#c9a227] px-3 py-1.5 text-xs font-bold text-[#0b2545] disabled:opacity-40">
            {step === 0 ? 'Empezar' : 'Siguiente'} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="border-b border-line p-3 lg:border-b-0 lg:border-r">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Diagrama del fraude carrusel">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--teal)" />
              </marker>
              <marker id="arr-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
              </marker>
            </defs>
            {/* zona España */}
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="13" fill="var(--muted)" fontWeight="600">Hacienda española</text>
            <text x={cx} y={cy + 30} textAnchor="middle" fontSize="20" fontFamily="IBM Plex Mono, monospace" fontWeight="600" fill={saldo < 0 ? 'var(--danger)' : 'var(--text)'}>
              {saldo < 0 ? '−' : ''}{eur(Math.abs(saldo))} €
            </text>

            {done.map((s, k) => {
              if (s.from === s.to) return null
              const { d, mid } = curve(s.from, s.to)
              const active = k === step - 1
              return (
                <g key={k}>
                  <path d={d} fill="none" stroke={active ? 'var(--accent)' : 'var(--teal)'} strokeWidth={active ? 3 : 2} className={active ? 'flow-line' : ''} markerEnd={`url(#${active ? 'arr-on' : 'arr'})`} opacity={active ? 1 : 0.6} />
                  <rect x={mid.x - 78} y={mid.y - 11} width="156" height="22" rx="11" fill="var(--surface)" stroke={active ? 'var(--accent)' : 'var(--border)'} />
                  <text x={mid.x} y={mid.y + 4} textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="var(--text)">{s.label}</text>
                </g>
              )
            })}

            {nodes.map((n, i) => {
              const p = pos[i]
              const gone = n.id === 'B' && truchaGone
              const involved = cur && (cur.from === i || cur.to === i)
              return (
                <g key={n.id} opacity={gone ? 0.45 : 1}>
                  <rect x={p.x - 70} y={p.y - 30} width="140" height="60" rx="12"
                    fill={n.ue ? 'var(--teal-soft)' : 'var(--primary-soft)'}
                    stroke={involved ? 'var(--accent)' : n.ue ? 'var(--teal)' : 'var(--primary)'}
                    strokeWidth={involved ? 3 : 1.5} strokeDasharray={gone ? '5 4' : undefined} />
                  <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">{n.name}</text>
                  <text x={p.x} y={p.y + 9} textAnchor="middle" fontSize="11" fill="var(--muted)">{n.role} · {n.pais}</text>
                  {gone && <text x={p.x} y={p.y + 24} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--danger)">DESAPARECIDA</text>}
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap justify-center gap-4 pb-1 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-primary bg-primary-soft" /> Sociedad española</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-teal bg-teal-soft" /> Sociedad de otro Estado UE</span>
          </div>
        </div>

        <div className="flex flex-col p-5" aria-live="polite">
          {!cur ? (
            <div className="text-sm text-ink/90">
              <p>Vas a seguir el recorrido de un lote de <strong>1.000 procesadores</strong> por cinco sociedades. Fíjate en dos cosas:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>dónde se cobra el IVA y dónde <strong>no se ingresa</strong>;</li>
                <li>el contador de <strong>Hacienda</strong> en el centro del diagrama.</li>
              </ul>
              <p className="mt-3 text-muted">Pulsa <strong className="text-ink">Empezar</strong>.</p>
            </div>
          ) : (
            <div key={step} className="animate-fade-up">
              <h4 className="font-bold text-ink">{cur.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/90"><Rich text={cur.text} /></p>
              {cur.flag && (
                <div className="mt-3 flex gap-2 rounded-lg bg-danger-soft p-3 text-sm text-ink">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" /> <span><strong>Red flag:</strong> {cur.flag}</span>
                </div>
              )}
            </div>
          )}
          <div className="mt-auto pt-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"><Landmark className="h-4 w-4" /> Cuenta de Hacienda (esta vuelta)</div>
            <dl className="space-y-1 font-mono text-sm">
              <div className="flex justify-between"><dt className="text-muted">IVA ingresado</dt><dd className="text-ok">+{eur(cur?.ingresado ?? 0)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">IVA devuelto</dt><dd className="text-danger">−{eur(cur?.devuelto ?? 0)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">IVA cobrado y no ingresado</dt><dd className="text-warn">{eur(cur?.noIngresado ?? 0)}</dd></div>
              <div className="flex justify-between border-t border-line pt-1 font-semibold"><dt className="text-ink">Saldo para Hacienda</dt><dd className={saldo < 0 ? 'text-danger' : 'text-ink'}>{eur(saldo)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
