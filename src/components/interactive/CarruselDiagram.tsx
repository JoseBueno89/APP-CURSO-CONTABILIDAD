import { useState } from 'react'
import { AlertTriangle, ArrowDown, ChevronLeft, ChevronRight, Landmark, RotateCcw } from 'lucide-react'
import { eur, Rich } from '../../lib/rich'

interface Node { id: string; name: string[]; full: string; role: string; pais: string; ue: boolean }
const nodes: Node[] = [
  { id: 'A', name: ['Proveedor', 'UE'], full: 'Proveedor UE', role: 'Conduit', pais: 'Alemania', ue: true },
  { id: 'B', name: ['Trucha'], full: 'Trucha', role: 'Missing trader', pais: 'España', ue: false },
  { id: 'C', name: ['Pantalla'], full: 'Pantalla', role: 'Buffer', pais: 'España', ue: false },
  { id: 'D', name: ['Broker'], full: 'Broker', role: 'Exportador', pais: 'España', ue: false },
  { id: 'E', name: ['Cliente', 'UE'], full: 'Cliente UE', role: 'Conduit', pais: 'Francia', ue: true },
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

/* ---------- Geometría del círculo ---------- */
const S = 400 // tamaño del lienzo (cuadrado)
const C = S / 2 // centro
const R = 135 // radio del anillo
const NR = 42 // radio de cada sociedad
const deg = (d: number) => (d * Math.PI) / 180
const angle = (i: number) => -90 + i * 72 // A arriba, sentido horario
const pt = (a: number, r = R) => ({ x: C + r * Math.cos(deg(a)), y: C + r * Math.sin(deg(a)) })
// separación angular para que la flecha empiece y acabe fuera del círculo de cada sociedad
const GAP = ((NR + 7) / R) * (180 / Math.PI)

/** Arco del anillo entre dos sociedades consecutivas (sentido horario) */
function arc(i: number, j: number) {
  const a1 = angle(i) + GAP
  let a2 = angle(j) - GAP
  if (a2 < a1) a2 += 360
  const p1 = pt(a1)
  const p2 = pt(a2)
  return { d: `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} A${R},${R} 0 0 1 ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`, mid: pt((a1 + a2) / 2) }
}
// los 5 tramos del ciclo A→B→C→D→E→A
const ring = nodes.map((_, i) => arc(i, (i + 1) % nodes.length))

function Diagram({ step }: { step: number }) {
  const done = steps.slice(0, step)
  const cur = step > 0 ? steps[step - 1] : null
  const truchaGone = step >= 3
  const saldo = (cur?.ingresado ?? 0) - (cur?.devuelto ?? 0)
  // qué tramos del anillo ya se han recorrido y cuál está activo
  const tramoDeStep = (s: Step) => (s.from === s.to ? -1 : s.from)
  const recorridos = new Set(done.map(tramoDeStep).filter((t) => t >= 0))
  const activo = cur ? tramoDeStep(cur) : -1

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="h-auto w-full" role="img" aria-label="Diagrama circular del fraude carrusel">
      <defs>
        {(['teal', 'accent', 'border'] as const).map((c) => (
          <marker key={c} id={`ring-arr-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: `var(--${c})` }} />
          </marker>
        ))}
      </defs>

      {/* Contador central */}
      <text x={C} y={C + 8} textAnchor="middle" fontSize="13" fontWeight="600" style={{ fill: 'var(--muted)' }}>Hacienda</text>
      <text x={C} y={C + 32} textAnchor="middle" fontSize="19" fontWeight="600" fontFamily="IBM Plex Mono, monospace" style={{ fill: saldo < 0 ? 'var(--danger)' : 'var(--text)' }}>
        {saldo < 0 ? '−' : ''}{eur(Math.abs(saldo))} €
      </text>

      {/* Anillo: tramos pendientes (tenues), recorridos (verde azulado) y activo (dorado, animado) */}
      {ring.map((r, i) => {
        const isActive = i === activo
        const isDone = recorridos.has(i)
        const color = isActive ? 'accent' : isDone ? 'teal' : 'border'
        return (
          <g key={i}>
            <path d={r.d} fill="none" strokeLinecap="round"
              strokeWidth={isActive ? 4 : isDone ? 3 : 2}
              strokeDasharray={isDone || isActive ? undefined : '4 6'}
              className={isActive ? 'flow-line' : ''}
              markerEnd={`url(#ring-arr-${color})`}
              style={{ stroke: `var(--${color})`, opacity: isActive ? 1 : isDone ? 0.8 : 0.9 }} />
            {isActive && (
              <circle r="6" style={{ fill: 'var(--accent)' }}>
                <animateMotion dur="1.6s" repeatCount="indefinite" path={r.d} />
              </circle>
            )}
          </g>
        )
      })}

      {/* Sociedades */}
      {nodes.map((n, i) => {
        const p = pt(angle(i))
        const gone = n.id === 'B' && truchaGone
        const involved = cur && (cur.from === i || cur.to === i)
        // nombre (1-2 líneas) + país dentro del círculo, centrados verticalmente
        const lines = n.name.length
        const top = p.y - ((lines - 1) * 13 + 13) / 2 + 4
        return (
          <g key={n.id}>
            {involved && <circle cx={p.x} cy={p.y} r={NR + 7} style={{ fill: 'var(--accent)', opacity: 0.18 }} />}
            <circle cx={p.x} cy={p.y} r={NR} strokeWidth={involved ? 3 : 1.8} strokeDasharray={gone ? '5 4' : undefined}
              style={{ fill: gone ? 'var(--surface-2)' : n.ue ? 'var(--teal-soft)' : 'var(--primary-soft)', stroke: gone ? 'var(--danger)' : involved ? 'var(--accent)' : n.ue ? 'var(--teal)' : 'var(--primary)' }} />
            {n.name.map((line, k) => (
              <text key={k} x={p.x} y={top + k * 13} textAnchor="middle" fontSize="12.5" fontWeight="700"
                style={{ fill: gone ? 'var(--muted)' : 'var(--text)', textDecoration: gone ? 'line-through' : undefined }}>{line}</text>
            ))}
            <text x={p.x} y={top + lines * 13 + 1} textAnchor="middle" fontSize={gone ? 9.5 : 10.5} fontWeight={gone ? 700 : 500}
              style={{ fill: gone ? 'var(--danger)' : 'var(--muted)' }}>{gone ? 'DESAPARECIDA' : n.pais}</text>
          </g>
        )
      })}

      {/* Número de paso sobre cada tramo (el paso 3 se marca junto a la trucha) */}
      {done.map((s, k) => {
        const isActive = k === step - 1
        const at = s.from === s.to ? pt(angle(s.from), R + NR + 14) : ring[s.from].mid
        return (
          <g key={`b${k}`}>
            <circle cx={at.x} cy={at.y} r="11" strokeWidth="2" style={{ fill: isActive ? 'var(--accent)' : 'var(--surface)', stroke: isActive ? 'var(--accent)' : s.from === s.to ? 'var(--danger)' : 'var(--teal)' }} />
            <text x={at.x} y={at.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" style={{ fill: isActive ? '#0b2545' : 'var(--text)' }}>{k + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* Secuencia de pasos (solo móvil, debajo del círculo) */
function MobileFlow({ step }: { step: number }) {
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
                  {s.from === s.to ? <>{from.full} <span className="text-danger">desaparece</span></> : <>{from.full} → {to.full}</>}
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

      <div>
        {/* Círculo de sociedades (todas las pantallas) */}
        <div className="border-b border-line p-3">
          <div className="mx-auto max-w-[520px]"><Diagram step={step} /></div>
          <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 pb-1 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border border-primary bg-primary-soft" /> Sociedad española</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border border-teal bg-teal-soft" /> Sociedad de otro Estado UE</span>
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-accent" /> Operación en curso</span>
          </div>
          {/* En móvil, además, la secuencia paso a paso con importes */}
          {step > 0 && <div className="mt-3 sm:hidden"><MobileFlow step={step} /></div>}
        </div>

        <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" aria-live="polite">
          {!cur ? (
            <div className="text-sm text-ink/90">
              <p>Vas a seguir el recorrido de un lote de <strong>1.000 procesadores</strong> por cinco sociedades que forman un <strong>círculo</strong>. Fíjate en dos cosas:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>dónde se cobra el IVA y dónde <strong>no se ingresa</strong>;</li>
                <li>el contador de <strong>Hacienda</strong> en el centro del círculo.</li>
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
                  {cur.from === cur.to ? nodes[cur.from].full : `${nodes[cur.from].full} → ${nodes[cur.to].full}`}
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
