import { useState } from 'react'
import { AlertTriangle, ArrowDown, ChevronLeft, ChevronRight, Landmark, RotateCcw } from 'lucide-react'
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
  { from: 0, to: 1, label: '1.000.000 € sin IVA', title: 'Compra intracomunitaria sin IVA', text: 'El proveedor alemán vende 1.000 procesadores a la **trucha** española por 1.000.000 €. Como es una entrega intracomunitaria, va **sin IVA**. La trucha se autorrepercute y se deduce el IVA en su 303 (casillas 10/11 y 36/37): efecto neutro.', flag: 'La trucha es una sociedad de pocos meses, con un administrador sin perfil empresarial y alta reciente en el ROI.', ingresado: 0, devuelto: 0, noIngresado: 0 },
  { from: 1, to: 2, label: '990.000 € + 207.900 € IVA', title: 'La trucha vende con IVA… y por debajo de coste', text: 'La trucha vende la mercancía a la **pantalla** por **990.000 €** (¡menos de lo que le costó!) más **207.900 €** de IVA. Cobra en total 1.197.900 €. Puede permitirse perder 10.000 € porque va a quedarse con el IVA.', flag: 'Precio de venta inferior al de compra: firma característica de la trucha.', ingresado: 0, devuelto: 0, noIngresado: 0 },
  { from: 1, to: 1, label: '207.900 € de IVA sin ingresar', title: 'La trucha desaparece', text: 'La trucha **no ingresa** los 207.900 € de IVA (o presenta el 303 sin ingreso) y **desaparece**: cierra cuentas, el administrador testaferro no es localizable, el domicilio no existe. El dinero ya ha salido, normalmente al extranjero.', flag: 'Vida corta, 303 sin ingreso, cuentas bancarias vaciadas en días.', ingresado: 0, devuelto: 0, noIngresado: 207900 },
  { from: 2, to: 3, label: '995.000 € + 208.950 € IVA', title: 'La pantalla revende con margen mínimo', text: 'La **pantalla** vende al **broker** por 995.000 € + 208.950 € de IVA. Repercute 208.950 €, se deduce 207.900 € e **ingresa solo 1.050 €**. Cumple con sus obligaciones y sirve de "cortafuegos" entre la trucha y el broker.', flag: 'Margen ínfimo para un intermediario que no aporta nada (ni almacén, ni transporte).', ingresado: 1050, devuelto: 0, noIngresado: 207900 },
  { from: 3, to: 4, label: '1.000.000 € sin IVA', title: 'El broker exporta y pide la devolución', text: 'El **broker** vende la mercancía a un cliente de **Francia** por 1.000.000 € **sin IVA** (entrega intracomunitaria, casilla 59 del 303). Como soportó 208.950 € de IVA y no repercute nada, **solicita a Hacienda la devolución** de 208.950 €.', flag: 'Solicitudes de devolución elevadas y recurrentes cuyo proveedor es una sociedad joven.', ingresado: 1050, devuelto: 208950, noIngresado: 207900 },
  { from: 4, to: 0, label: 'La mercancía vuelve al origen', title: 'El carrusel vuelve a girar', text: 'El cliente francés (controlado por la organización) devuelve la mercancía al proveedor alemán y **el ciclo empieza de nuevo** con otra trucha. Los mismos 1.000 procesadores pueden dar decenas de vueltas. **Cada vuelta, Hacienda pierde 207.900 €.**', flag: 'La misma mercancía (mismos números de serie) aparece en operaciones sucesivas: circularidad.', ingresado: 1050, devuelto: 208950, noIngresado: 207900 },
]

/* ---------- Geometría del diagrama (escritorio) ---------- */
const W = 760
const H = 500
const cx = W / 2
const cy = 250
const BW = 150
const BH = 60
const pos = nodes.map((_, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180)
  return { x: cx + 265 * Math.cos(a), y: cy + 175 * Math.sin(a) }
})

const inBox = (p: { x: number; y: number }, i: number, pad = 8) =>
  Math.abs(p.x - pos[i].x) <= BW / 2 + pad && Math.abs(p.y - pos[i].y) <= BH / 2 + pad

/** Curva entre dos nodos, recortada para empezar y acabar en el borde de cada caja */
function edge(i: number, j: number) {
  const p1 = pos[i]
  const p2 = pos[j]
  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2
  const dx = mx - cx
  const dy = my - cy
  const len = Math.hypot(dx, dy) || 1
  const c = { x: mx + (dx / len) * 50, y: my + (dy / len) * 50 }
  const q = (t: number) => ({
    x: (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * c.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * c.y + t ** 2 * p2.y,
  })
  let t0 = 0
  while (t0 < 0.5 && inBox(q(t0), i)) t0 += 0.01
  let t1 = 1
  while (t1 > 0.5 && inBox(q(t1), j, 12)) t1 -= 0.01
  // sub-curva [t0, t1] de una Bézier cuadrática
  const s = q(t0)
  const e = q(t1)
  const ctrl = {
    x: (1 - t0) * (1 - t1) * p1.x + ((1 - t0) * t1 + t0 * (1 - t1)) * c.x + t0 * t1 * p2.x,
    y: (1 - t0) * (1 - t1) * p1.y + ((1 - t0) * t1 + t0 * (1 - t1)) * c.y + t0 * t1 * p2.y,
  }
  return { d: `M${s.x.toFixed(1)},${s.y.toFixed(1)} Q${ctrl.x.toFixed(1)},${ctrl.y.toFixed(1)} ${e.x.toFixed(1)},${e.y.toFixed(1)}`, mid: q(0.5) }
}

function Diagram({ step }: { step: number }) {
  const done = steps.slice(0, step)
  const cur = step > 0 ? steps[step - 1] : null
  const truchaGone = step >= 3
  const saldo = (cur?.ingresado ?? 0) - (cur?.devuelto ?? 0)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Diagrama del fraude carrusel">
      <defs>
        <marker id="car-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--teal)' }} />
        </marker>
        <marker id="car-arr-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--accent)' }} />
        </marker>
      </defs>

      {/* Contador central */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="14" fontWeight="600" style={{ fill: 'var(--muted)' }}>Hacienda española</text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize="24" fontWeight="600" fontFamily="IBM Plex Mono, monospace" style={{ fill: saldo < 0 ? 'var(--danger)' : 'var(--text)' }}>
        {saldo < 0 ? '−' : ''}{eur(Math.abs(saldo))} €
      </text>

      {/* Flechas */}
      {done.map((s, k) => {
        if (s.from === s.to) return null
        const { d } = edge(s.from, s.to)
        const active = k === step - 1
        return (
          <path key={k} d={d} fill="none" strokeWidth={active ? 3.5 : 2.2} className={active ? 'flow-line' : ''}
            markerEnd={`url(#${active ? 'car-arr-on' : 'car-arr'})`}
            style={{ stroke: active ? 'var(--accent)' : 'var(--teal)', opacity: active ? 1 : 0.55 }} />
        )
      })}

      {/* Nodos */}
      {nodes.map((n, i) => {
        const p = pos[i]
        const gone = n.id === 'B' && truchaGone
        const involved = cur && (cur.from === i || cur.to === i)
        return (
          <g key={n.id} style={{ opacity: gone ? 0.75 : 1 }}>
            <rect x={p.x - BW / 2} y={p.y - BH / 2} width={BW} height={BH} rx="12"
              strokeWidth={involved ? 3 : 1.5} strokeDasharray={gone ? '6 4' : undefined}
              style={{ fill: n.ue ? 'var(--teal-soft)' : 'var(--primary-soft)', stroke: involved ? 'var(--accent)' : n.ue ? 'var(--teal)' : 'var(--primary)' }} />
            <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="16" fontWeight="700" style={{ fill: 'var(--text)' }}>{n.name}</text>
            {gone ? (
              <text x={p.x} y={p.y + 15} textAnchor="middle" fontSize="12" fontWeight="700" style={{ fill: 'var(--danger)' }}>DESAPARECIDA</text>
            ) : (
              <text x={p.x} y={p.y + 15} textAnchor="middle" fontSize="12" style={{ fill: 'var(--muted)' }}>{n.role} · {n.pais}</text>
            )}
          </g>
        )
      })}

      {/* Número de paso sobre cada flecha (o junto a la trucha en el paso 3) */}
      {done.map((s, k) => {
        const active = k === step - 1
        const at = s.from === s.to ? { x: pos[s.from].x + BW / 2 - 2, y: pos[s.from].y - BH / 2 + 2 } : edge(s.from, s.to).mid
        return (
          <g key={`b${k}`}>
            <circle cx={at.x} cy={at.y} r="14" strokeWidth="2" style={{ fill: active ? 'var(--accent)' : 'var(--surface)', stroke: active ? 'var(--accent)' : 'var(--teal)' }} />
            <text x={at.x} y={at.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: active ? '#0b2545' : 'var(--text)' }}>{k + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* Versión móvil: secuencia vertical legible en pantallas estrechas */
function MobileFlow({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {nodes.map((n) => (
          <div key={n.id} className={`rounded-xl border p-2.5 ${n.ue ? 'border-teal bg-teal-soft' : 'border-primary/50 bg-primary-soft'}`}>
            <div className="text-sm font-bold text-ink">{n.name}</div>
            <div className="text-[11px] text-muted">{n.role} · {n.pais}</div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <ol className="space-y-1">
      {steps.slice(0, step).map((s, k) => {
        const active = k === step - 1
        const from = nodes[s.from]
        const to = nodes[s.to]
        return (
          <li key={k}>
            <div className={`flex items-start gap-3 rounded-xl border p-3 ${active ? 'border-accent bg-accent-soft' : 'border-line opacity-70'}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-accent text-[#0b2545]' : 'bg-surface-2 text-ink'}`}>{k + 1}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">
                  {s.from === s.to ? <>{from.name} <span className="text-danger">desaparece</span></> : <>{from.name} → {to.name}</>}
                </div>
                <div className="font-mono text-xs text-muted">{s.label}</div>
              </div>
            </div>
            {k < step - 1 && <ArrowDown className="mx-auto my-0.5 h-4 w-4 text-teal" aria-hidden />}
          </li>
        )
      })}
    </ol>
  )
}

export default function CarruselDiagram() {
  const [step, setStep] = useState(0) // 0 = introducción, 1..6 = pasos
  const cur = step > 0 ? steps[step - 1] : null
  const saldo = (cur?.ingresado ?? 0) - (cur?.devuelto ?? 0)

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0b2545] px-4 py-3 text-white sm:px-5">
        <span className="text-sm font-semibold">Fraude carrusel · paso {step} de {steps.length}</span>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setStep(0)} className="rounded-lg p-2 text-[#b9c8de] hover:bg-white/10" aria-label="Reiniciar"><RotateCcw className="h-4 w-4" /></button>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-30" aria-label="Paso anterior"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step === steps.length} className="flex items-center gap-1 rounded-lg bg-[#c9a227] px-3 py-2 text-xs font-bold text-[#0b2545] disabled:opacity-40">
            {step === 0 ? 'Empezar' : 'Siguiente'} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Diagrama a ancho completo; explicación y cuenta de Hacienda debajo */}
      <div>
        <div className="border-b border-line p-3">
          <div className="hidden sm:block"><Diagram step={step} /></div>
          <div className="sm:hidden"><MobileFlow step={step} /></div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 pb-1 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-primary bg-primary-soft" /> Sociedad española</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-teal bg-teal-soft" /> Sociedad de otro Estado UE</span>
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" aria-live="polite">
          {!cur ? (
            <div className="text-sm text-ink/90">
              <p>Vas a seguir el recorrido de un lote de <strong>1.000 procesadores</strong> por cinco sociedades. Fíjate en dos cosas:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>dónde se cobra el IVA y dónde <strong>no se ingresa</strong>;</li>
                <li>la <strong>cuenta de Hacienda</strong>, que se va actualizando en cada paso.</li>
              </ul>
              <p className="mt-3 text-muted">Pulsa <strong className="text-ink">Empezar</strong>.</p>
            </div>
          ) : (
            <div key={step} className="animate-fade-up">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-[#0b2545]">{step}</span>
                <h4 className="font-bold text-ink">{cur.title}</h4>
              </div>
              <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {cur.from === cur.to ? nodes[cur.from].name : `${nodes[cur.from].name} → ${nodes[cur.to].name}`}
                </div>
                <div className="font-mono text-base font-semibold text-ink">{cur.label}</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/90"><Rich text={cur.text} /></p>
              {cur.flag && (
                <div className="mt-3 flex gap-2 rounded-lg bg-danger-soft p-3 text-sm text-ink">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" /> <span><strong>Red flag:</strong> {cur.flag}</span>
                </div>
              )}
            </div>
          )}
          <div className="self-start rounded-xl border border-line bg-surface-2/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"><Landmark className="h-4 w-4 shrink-0" /> Cuenta de Hacienda (esta vuelta)</div>
            <dl className="space-y-1 font-mono text-sm">
              <div className="flex justify-between gap-3"><dt className="text-muted">IVA ingresado</dt><dd className="text-ok">+{eur(cur?.ingresado ?? 0)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">IVA devuelto</dt><dd className="text-danger">−{eur(cur?.devuelto ?? 0)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">IVA no ingresado</dt><dd className="text-warn">{eur(cur?.noIngresado ?? 0)}</dd></div>
              <div className="flex justify-between gap-3 border-t border-line pt-1 font-semibold"><dt className="text-ink">Saldo para Hacienda</dt><dd className={saldo < 0 ? 'text-danger' : 'text-ink'}>{eur(saldo)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
