import { useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import { eur } from '../../lib/rich'

interface Partida { id: string; label: string; cuenta: string; importe: number; explica: string; flag?: string }
interface Bloque { title: string; partidas: Partida[] }

const activo: Bloque[] = [
  {
    title: 'Activo no corriente',
    partidas: [
      { id: 'inm', label: 'Inmovilizado material', cuenta: '21x', importe: 1250000, explica: 'Bienes duraderos: aquí, una villa en la costa y dos vehículos de alta gama.', flag: 'La sociedad no tiene empleados ni actividad que justifique una villa. ¿La usa el administrador como vivienda? Patrón típico de ocultación patrimonial.' },
      { id: 'grupo', label: 'Inversiones en empresas del grupo', cuenta: '240', importe: 300000, explica: 'Participaciones en otras sociedades. Aquí, el 100 % de una sociedad constituida en una jurisdicción de baja tributación.', flag: 'Estructura en cadena con sociedad extranjera opaca: dificulta identificar al titular real.' },
    ],
  },
  {
    title: 'Activo corriente',
    partidas: [
      { id: 'cli', label: 'Clientes', cuenta: '430', importe: 45000, explica: 'Facturas emitidas pendientes de cobro.' },
      { id: 'soc', label: 'Créditos a socios y administradores', cuenta: '551', importe: 180000, explica: 'Dinero que la sociedad ha "prestado" a sus socios o que estos han retirado.', flag: 'Retiradas de fondos a favor de socios sin contrato ni devolución: posible distribución encubierta de fondos.' },
      { id: 'caja', label: 'Caja (efectivo)', cuenta: '570', importe: 420000, explica: 'Billetes que, según la contabilidad, la empresa tiene físicamente.', flag: '¡420.000 € en efectivo con unas ventas anuales de 62.000 €! O el dinero no existe (saldo ficticio para cuadrar) o procede de una fuente no declarada.' },
      { id: 'banco', label: 'Bancos', cuenta: '572', importe: 35000, explica: 'Saldo en cuentas bancarias. Contrástalo con los extractos.' },
    ],
  },
]

const pasivo: Bloque[] = [
  {
    title: 'Patrimonio neto',
    partidas: [
      { id: 'cap', label: 'Capital social', cuenta: '100', importe: 3000, explica: 'Lo que pusieron los socios al constituir la sociedad. 3.000 € es el mínimo habitual de una S.L.' },
      { id: 'aport', label: 'Aportaciones de socios', cuenta: '118', importe: 600000, explica: 'Dinero que los socios han metido después, sin ampliar capital.', flag: 'Aportación de 600.000 € a una sociedad con capital mínimo: ¿de dónde salió ese dinero? Hay que rastrear el origen en la persona del socio.' },
      { id: 'rea', label: 'Resultados de ejercicios anteriores', cuenta: '120/121', importe: -85000, explica: 'Pérdidas acumuladas de años anteriores.' },
      { id: 'res', label: 'Resultado del ejercicio', cuenta: '129', importe: -40000, explica: 'Pérdida de este año.', flag: 'Pierde dinero año tras año y sigue comprando activos de lujo: alguien la está financiando desde fuera.' },
    ],
  },
  {
    title: 'Pasivo no corriente',
    partidas: [
      { id: 'dgr', label: 'Deudas a l/p con empresas del grupo', cuenta: '163', importe: 900000, explica: 'Préstamo recibido de una sociedad vinculada extranjera.', flag: 'Los "préstamos" de sociedades del grupo en el extranjero, sin intereses ni calendario, son un mecanismo clásico para introducir fondos ilícitos como deuda (loan-back).' },
      { id: 'hip', label: 'Deudas con entidades de crédito', cuenta: '170', importe: 600000, explica: 'Hipoteca bancaria sobre el inmueble.' },
    ],
  },
  {
    title: 'Pasivo corriente',
    partidas: [
      { id: 'prov', label: 'Proveedores', cuenta: '400', importe: 12000, explica: 'Facturas de compras pendientes de pago.' },
      { id: 'hp', label: 'Hacienda Pública acreedora', cuenta: '475', importe: 4000, explica: 'Impuestos pendientes de pagar.' },
      { id: 'ant', label: 'Anticipos de clientes', cuenta: '438', importe: 236000, explica: 'Dinero cobrado de clientes por adelantado por algo que aún no se ha entregado.', flag: 'Anticipos elevados que nunca se convierten en ventas: posible entrada de fondos de terceros disfrazada de operación comercial.' },
    ],
  },
]

const sum = (bs: Bloque[]) => bs.reduce((s, b) => s + b.partidas.reduce((x, p) => x + p.importe, 0), 0)
const all = [...activo, ...pasivo].flatMap((b) => b.partidas)

function Column({ title, bloques, sel, setSel }: { title: string; bloques: Bloque[]; sel: string; setSel: (id: string) => void }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">{title}</h4>
      {bloques.map((b) => (
        <div key={b.title} className="mb-3">
          <div className="mb-1 flex justify-between border-b border-line pb-1 text-sm font-semibold text-ink">
            <span>{b.title}</span>
            <span className="font-mono">{eur(b.partidas.reduce((s, p) => s + p.importe, 0))}</span>
          </div>
          {b.partidas.map((p) => (
            <button
              key={p.id}
              onMouseEnter={() => setSel(p.id)}
              onFocus={() => setSel(p.id)}
              onClick={() => setSel(p.id)}
              className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm transition ${
                sel === p.id ? 'bg-accent-soft ring-1 ring-accent' : 'hover:bg-surface-2'
              }`}
            >
              <span className="flex items-center gap-2 text-ink">
                {p.flag ? <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-danger" /> : <span className="w-3.5" />}
                <span className="font-mono text-[11px] text-muted">{p.cuenta}</span>
                {p.label}
              </span>
              <span className={`font-mono ${p.importe < 0 ? 'text-danger' : 'text-ink'}`}>{eur(p.importe)}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function BalanceViewer() {
  const [sel, setSel] = useState('caja')
  const p = all.find((x) => x.id === sel)!
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0b2545] px-5 py-4 text-white">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-[#9fb4d4]">Balance a 31/12/2025 · importes en €</div>
          <div className="text-lg font-bold">Inversiones Levante Global, S.L. <span className="text-xs font-normal text-[#9fb4d4]">(ficticia)</span></div>
        </div>
        <div className="flex gap-4 text-xs text-[#b9c8de]">
          <span>Ventas: <strong className="text-white">62.000 €</strong></span>
          <span>Empleados: <strong className="text-white">0</strong></span>
        </div>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <Column title="Activo · lo que tiene" bloques={activo} sel={sel} setSel={setSel} />
        <Column title="Patrimonio neto y pasivo · cómo lo financia" bloques={pasivo} sel={sel} setSel={setSel} />
      </div>
      <div className="grid grid-cols-2 border-t border-line bg-surface-2 font-mono text-sm">
        <div className="flex justify-between px-5 py-2.5"><span className="text-muted">Total activo</span><strong className="text-ink">{eur(sum(activo))}</strong></div>
        <div className="flex justify-between border-l border-line px-5 py-2.5"><span className="text-muted">Total PN + pasivo</span><strong className="text-ink">{eur(sum(pasivo))}</strong></div>
      </div>
      <div key={p.id} className="animate-fade-up border-t border-line p-5" aria-live="polite">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
          <Info className="h-4 w-4 text-primary" /> {p.label} <span className="font-mono text-xs text-muted">(cuenta {p.cuenta})</span>
        </div>
        <p className="text-sm text-ink/90">{p.explica}</p>
        {p.flag && (
          <div className="mt-3 flex gap-2 rounded-lg bg-danger-soft p-3 text-sm text-ink">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
            <span><strong>Red flag:</strong> {p.flag}</span>
          </div>
        )}
      </div>
    </div>
  )
}
