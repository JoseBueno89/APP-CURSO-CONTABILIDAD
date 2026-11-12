import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { eur } from '../../lib/rich'

type Side = 'debe' | 'haber'
interface Line { cuenta: string; importe: number; side: Side }
interface Scenario { title: string; enunciado: string; lines: Line[]; explicacion: string }

const scenarios: Scenario[] = [
  {
    title: 'Compra de un ordenador',
    enunciado: 'La sociedad compra un ordenador por 1.000 € + 21 % de IVA y lo paga por transferencia bancaria.',
    lines: [
      { cuenta: '217 Equipos para procesos de información', importe: 1000, side: 'debe' },
      { cuenta: '472 H.P. IVA soportado', importe: 210, side: 'debe' },
      { cuenta: '572 Bancos', importe: 1210, side: 'haber' },
    ],
    explicacion: 'El ordenador y el derecho a deducir el IVA "entran" (Debe). El dinero "sale" del banco (Haber).',
  },
  {
    title: 'Préstamo de un socio',
    enunciado: 'Un socio transfiere 50.000 € a la cuenta de la sociedad como préstamo, sin contrato firmado.',
    lines: [
      { cuenta: '572 Bancos', importe: 50000, side: 'debe' },
      { cuenta: '551 C/c con socios y administradores', importe: 50000, side: 'haber' },
    ],
    explicacion: 'El dinero entra en el banco (Debe) y nace una deuda con el socio (Haber). Pregunta clave del investigador: ¿de dónde sacó el socio esos 50.000 €?',
  },
  {
    title: 'Venta cobrada en efectivo',
    enunciado: 'La sociedad vende mercancía por 2.000 € + 21 % de IVA a otra empresa y la cobra en billetes.',
    lines: [
      { cuenta: '570 Caja, euros', importe: 2420, side: 'debe' },
      { cuenta: '700 Ventas de mercaderías', importe: 2000, side: 'haber' },
      { cuenta: '477 H.P. IVA repercutido', importe: 420, side: 'haber' },
    ],
    explicacion: 'El efectivo entra en caja (Debe). El origen es la venta y el IVA cobrado, que se debe a Hacienda (Haber). Ojo: entre empresas, el pago en efectivo está limitado a 1.000 €, así que esta operación ya sería irregular.',
  },
]

export default function AsientoSimulator() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Side>>({})
  const [checked, setChecked] = useState(false)
  const sc = scenarios[idx]

  const assign = (i: number, s: Side) => {
    setChecked(false)
    setAnswers((a) => ({ ...a, [i]: s }))
  }
  const reset = (n = idx) => {
    setIdx(n)
    setAnswers({})
    setChecked(false)
  }
  const complete = sc.lines.every((_, i) => answers[i])
  const allOk = sc.lines.every((l, i) => answers[i] === l.side)
  const total = (s: Side) => sc.lines.reduce((sum, l, i) => (answers[i] === s ? sum + l.importe : sum), 0)

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-line bg-surface-2 px-4 py-3">
        {scenarios.map((s, i) => (
          <button
            key={s.title}
            onClick={() => reset(i)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i === idx ? 'bg-primary text-surface dark:text-[#0a1220]' : 'bg-surface text-muted hover:text-ink'}`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
      <div className="p-5">
        <p className="mb-4 rounded-lg bg-primary-soft p-3 text-sm text-ink"><strong>Operación:</strong> {sc.enunciado}</p>
        <p className="mb-3 text-sm text-muted">Coloca cada cuenta en el <strong className="text-ink">Debe</strong> (a dónde va) o en el <strong className="text-ink">Haber</strong> (de dónde viene):</p>
        <ul className="space-y-2">
          {sc.lines.map((l, i) => {
            const a = answers[i]
            const ok = checked && a === l.side
            const ko = checked && a && a !== l.side
            return (
              <li key={l.cuenta} className={`flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center ${ok ? 'border-ok bg-ok-soft' : ko ? 'border-danger bg-danger-soft' : 'border-line'}`}>
                <div className="flex-1 text-sm">
                  <span className="font-medium text-ink">{l.cuenta}</span>
                  <span className="ml-2 font-mono text-muted">{eur(l.importe)} €</span>
                </div>
                <div className="flex gap-2">
                  {(['debe', 'haber'] as Side[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => assign(i, s)}
                      aria-pressed={a === s}
                      className={`w-20 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                        a === s ? (s === 'debe' ? 'border-primary bg-primary text-surface dark:text-[#0a1220]' : 'border-teal bg-teal text-white dark:text-[#0a1220]') : 'border-line text-muted hover:border-primary/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm">
          <div className="rounded-lg bg-surface-2 p-3"><span className="text-muted">Σ Debe</span><div className="text-lg font-semibold text-ink">{eur(total('debe'))} €</div></div>
          <div className="rounded-lg bg-surface-2 p-3"><span className="text-muted">Σ Haber</span><div className="text-lg font-semibold text-ink">{eur(total('haber'))} €</div></div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            disabled={!complete}
            onClick={() => setChecked(true)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#0b2545] shadow disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comprobar asiento
          </button>
          <button onClick={() => reset()} className="flex items-center gap-1 text-sm text-muted hover:text-ink">
            <RotateCcw className="h-4 w-4" /> Reiniciar
          </button>
        </div>

        {checked && (
          <div className={`mt-4 flex gap-3 rounded-lg p-4 text-sm animate-fade-up ${allOk ? 'bg-ok-soft' : 'bg-warn-soft'}`}>
            {allOk ? <CheckCircle2 className="h-5 w-5 shrink-0 text-ok" /> : <XCircle className="h-5 w-5 shrink-0 text-warn" />}
            <div className="text-ink">
              <strong>{allOk ? '¡Asiento correcto! Debe y Haber cuadran.' : 'Casi. Revisa las líneas en rojo.'}</strong>
              {allOk && <p className="mt-1">{sc.explicacion}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
