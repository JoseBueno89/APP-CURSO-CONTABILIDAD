import { useState } from 'react'
import { ArrowRight, Factory, Hammer, Store, User } from 'lucide-react'
import { eur } from '../../lib/rich'

const steps = [
  { who: 'Aserradero', icon: Factory, vende: 100, soportado: 0, desc: 'Vende la madera a la carpintería por 100 € + 21 € de IVA.' },
  { who: 'Carpintería', icon: Hammer, vende: 300, soportado: 21, desc: 'Fabrica la mesa y la vende a la tienda por 300 € + 63 € de IVA. Había pagado 21 € de IVA por la madera.' },
  { who: 'Tienda', icon: Store, vende: 500, soportado: 63, desc: 'Vende la mesa al cliente por 500 € + 105 € de IVA. Había pagado 63 € de IVA a la carpintería.' },
]

export default function IvaChain() {
  const [step, setStep] = useState(0)
  const done = step >= steps.length
  const ingresado = steps.slice(0, step).reduce((s, x) => s + (x.vende * 0.21 - x.soportado), 0)

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-3 sm:px-5">
        <span className="text-sm font-semibold text-ink">La cadena del IVA · paso {Math.min(step + 1, steps.length + 1)} de {steps.length + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => setStep(0)} className="rounded-lg px-3 py-1 text-xs text-muted hover:text-ink">Reiniciar</button>
          <button
            onClick={() => setStep((s) => Math.min(s + 1, steps.length))}
            disabled={done}
            className="rounded-lg bg-accent px-3 py-1 text-xs font-bold text-[#0b2545] disabled:opacity-40"
          >
            Siguiente paso
          </button>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-3 p-4 sm:p-5 md:flex-row md:items-center">
        {steps.map((s, i) => {
          const Icon = s.icon
          const active = i < step
          const rep = s.vende * 0.21
          return (
            <div key={s.who} className="flex flex-1 flex-col items-center gap-3 md:flex-row">
              <div className={`w-full rounded-xl border p-4 transition-all duration-500 ${active ? 'border-teal bg-teal-soft opacity-100' : 'border-line opacity-40'}`}>
                <div className="flex items-center gap-2 font-semibold text-ink"><Icon className="h-5 w-5 text-teal" /> {s.who}</div>
                <dl className="mt-2 space-y-0.5 font-mono text-xs">
                  <div className="flex justify-between"><dt className="text-muted">Repercute</dt><dd className="text-ink">{eur(rep)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Soporta</dt><dd className="text-ink">−{eur(s.soportado)}</dd></div>
                  <div className="flex justify-between border-t border-line pt-1 font-semibold"><dt className="text-ink">Ingresa</dt><dd className="text-teal">{eur(rep - s.soportado)}</dd></div>
                </dl>
              </div>
              <ArrowRight className={`h-5 w-5 shrink-0 rotate-90 md:rotate-0 ${active ? 'text-teal' : 'text-line'}`} />
            </div>
          )
        })}
        <div className={`rounded-xl border p-4 transition-all duration-500 md:w-40 ${done ? 'border-accent bg-accent-soft' : 'border-line opacity-40'}`}>
          <div className="flex items-center gap-2 font-semibold text-ink"><User className="h-5 w-5 text-accent" /> Consumidor</div>
          <p className="mt-2 font-mono text-xs text-ink">Paga 605 €<br />de los que <strong>105 €</strong> son IVA</p>
        </div>
      </div>

      <div className="border-t border-line px-5 py-4 text-sm" aria-live="polite">
        {step === 0 && <p className="text-muted">Pulsa <strong className="text-ink">Siguiente paso</strong> para seguir el recorrido de una mesa de madera.</p>}
        {step > 0 && !done && <p className="text-ink">{steps[step - 1].desc}</p>}
        {done && <p className="text-ink">{steps[2].desc} <strong>Hacienda ha recibido 21 + 42 + 42 = 105 €</strong>, justo el IVA que paga el consumidor.</p>}
        <div className="mt-2 font-mono text-xs text-muted">Ingresado en Hacienda hasta ahora: <strong className="text-teal">{eur(ingresado)} €</strong></div>
      </div>
    </div>
  )
}
