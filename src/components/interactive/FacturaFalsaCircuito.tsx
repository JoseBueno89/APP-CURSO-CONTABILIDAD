import { useState } from 'react'
import { ArrowRight, Banknote, Building, FileText, Landmark, User } from 'lucide-react'
import { Rich } from '../../lib/rich'

const steps = [
  { icon: FileText, title: 'La factura', text: 'El "facturero" (un autónomo en módulos o una sociedad instrumental) emite a la **Empresa X** una factura de "trabajos de reforma" por **50.000 € + 10.500 € de IVA**. La obra nunca se hizo.' },
  { icon: Landmark, title: 'El pago con rastro "limpio"', text: 'La Empresa X paga **60.500 € por transferencia**. En el banco todo parece una operación comercial normal, con su factura de soporte.' },
  { icon: Banknote, title: 'El retorno en efectivo', text: 'Al día siguiente, el facturero **retira el dinero en efectivo** y devuelve **57.000 €** a la Empresa X (o a su administrador). Se queda **3.500 €** de comisión (≈ 6 %).' },
  { icon: Building, title: 'El resultado', text: 'La Empresa X se ha **deducido 10.500 € de IVA** falso y ha reducido su beneficio en 50.000 € (≈ 12.500 € menos de Impuesto sobre Sociedades). Además, dispone de **57.000 € en efectivo opaco** para pagos en negro, sobornos o retirada por los socios. El facturero, en módulos, **no paga más IVA** por haber facturado.' },
]

export default function FacturaFalsaCircuito() {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const Icon = s.icon
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1"><User className="h-4 w-4 text-danger" /> Facturero</span>
          <ArrowRight className="h-3 w-3" />
          <span className="flex items-center gap-1"><Building className="h-4 w-4 text-primary" /> Empresa X</span>
        </div>
        <div className="flex gap-1" role="tablist">
          {steps.map((x, i) => (
            <button key={x.title} role="tab" aria-selected={i === step} onClick={() => setStep(i)}
              className={`h-8 w-8 rounded-full text-xs font-bold ${i === step ? 'bg-accent text-[#0b2545]' : i < step ? 'bg-primary-soft text-primary' : 'bg-surface text-muted'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div key={step} className="flex gap-3 p-4 animate-fade-up sm:gap-4 sm:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:h-12 sm:w-12"><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></div>
        <div className="min-w-0">
          <h4 className="font-bold text-ink">{step + 1}. {s.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-ink/90"><Rich text={s.text} /></p>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-lg px-3 py-1.5 text-sm text-muted hover:text-ink disabled:opacity-30">Anterior</button>
        <button disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="rounded-lg bg-accent px-3 py-1.5 text-sm font-bold text-[#0b2545] disabled:opacity-40">Siguiente</button>
      </div>
    </div>
  )
}
