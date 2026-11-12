import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const grupos = [
  { n: 1, name: 'Financiación básica', estado: 'Balance', analogia: 'De dónde salió el dinero "de fondo" para montar el negocio: lo que pusieron los socios y los préstamos largos.', cuentas: ['100 Capital social', '118 Aportaciones de socios', '129 Resultado del ejercicio', '170 Deudas a l/p con entidades de crédito', '171 Deudas a largo plazo'], flag: 'Aportaciones de socios (118) y préstamos (170/171) sin justificar el origen de los fondos son la vía clásica para introducir dinero en una sociedad.' },
  { n: 2, name: 'Activo no corriente', estado: 'Balance', analogia: 'Los "muebles de la casa": lo que la empresa compra para usar durante años.', cuentas: ['210 Terrenos', '211 Construcciones', '218 Elementos de transporte', '240 Participaciones en empresas del grupo'], flag: 'Inmuebles y vehículos de lujo a nombre de la sociedad pero usados por el administrador; participaciones en sociedades extranjeras opacas.' },
  { n: 3, name: 'Existencias', estado: 'Balance', analogia: 'La despensa: mercancía pendiente de vender.', cuentas: ['300 Mercaderías', '310 Materias primas', '350 Productos terminados'], flag: 'Existencias que no varían en años o que no son coherentes con las compras: posible inventario ficticio.' },
  { n: 4, name: 'Acreedores y deudores', estado: 'Balance', analogia: 'Las cuentas pendientes del día a día: quién nos debe y a quién debemos.', cuentas: ['400 Proveedores', '430 Clientes', '472 H.P. IVA soportado', '477 H.P. IVA repercutido', '475 H.P. acreedora'], flag: 'Clientes que nunca pagan (430 que crece sin parar) o proveedores vinculados con saldos enormes.' },
  { n: 5, name: 'Cuentas financieras', estado: 'Balance', analogia: 'La cartera y el banco, más los préstamos de corto plazo y las cuentas con socios.', cuentas: ['551 C/c con socios y administradores', '553 C/c con socios por fusiones', '570 Caja, euros', '572 Bancos'], flag: 'La 551 y la 570 son las dos cuentas más vigiladas: efectivo desproporcionado y trasvases constantes con socios.' },
  { n: 6, name: 'Compras y gastos', estado: 'Pérdidas y Ganancias', analogia: 'Todo lo que la empresa gasta para funcionar.', cuentas: ['600 Compras de mercaderías', '621 Arrendamientos', '623 Servicios de profesionales', '640 Sueldos y salarios'], flag: 'Servicios de profesionales (623) o "consultoría" por importes altos a sociedades vinculadas: posibles facturas falsas.' },
  { n: 7, name: 'Ventas e ingresos', estado: 'Pérdidas y Ganancias', analogia: 'Todo lo que la empresa gana con su actividad.', cuentas: ['700 Ventas de mercaderías', '705 Prestaciones de servicios', '769 Otros ingresos financieros', '778 Ingresos excepcionales'], flag: 'Ventas sin coste asociado, ingresos "excepcionales" recurrentes o ventas en efectivo inusuales.' },
  { n: 8, name: 'Gastos imputados al PN', estado: 'Patrimonio neto', analogia: 'Gastos que no pasan por la cuenta de resultados sino directamente por el patrimonio.', cuentas: ['800 Pérdidas en activos financieros', '830 Impuesto sobre beneficios'], flag: 'Poco frecuente en pymes; su uso inusual merece una explicación.' },
  { n: 9, name: 'Ingresos imputados al PN', estado: 'Patrimonio neto', analogia: 'Ingresos que van directos al patrimonio, como algunas subvenciones.', cuentas: ['940 Ingresos de subvenciones oficiales de capital', '900 Beneficios en activos financieros'], flag: 'Subvenciones recibidas por sociedades sin actividad real.' },
]

export default function PgcExplorer() {
  const [sel, setSel] = useState(4)
  const g = grupos[sel]
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="border-b border-line bg-surface-2 px-5 py-3 text-sm font-semibold text-ink">Mapa interactivo del PGC · pulsa un grupo</div>
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="grid grid-cols-3 gap-2 p-4">
          {grupos.map((x, i) => (
            <button
              key={x.n}
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                sel === i ? 'border-accent bg-accent-soft shadow' : 'border-line bg-surface hover:border-primary/40'
              }`}
            >
              <span className={`font-mono text-2xl font-semibold ${x.estado === 'Balance' ? 'text-primary' : x.estado.startsWith('Pérdidas') ? 'text-teal' : 'text-muted'}`}>{x.n}</span>
              <span className="mt-1 text-[11px] font-medium leading-tight text-ink">{x.name}</span>
            </button>
          ))}
        </div>
        <div key={g.n} className="animate-fade-up border-t border-line p-5 md:border-l md:border-t-0">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-4xl font-semibold text-accent">{g.n}</span>
            <div>
              <h4 className="text-lg font-bold text-ink">{g.name}</h4>
              <p className="text-xs uppercase tracking-wider text-muted">Va a: {g.estado}</p>
            </div>
          </div>
          <p className="mt-3 text-sm italic text-ink/80">{g.analogia}</p>
          <ul className="mt-4 space-y-1.5">
            {g.cuentas.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm">
                <span className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">{c.split(' ')[0]}</span>
                <span className="text-ink">{c.split(' ').slice(1).join(' ')}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2 rounded-lg bg-danger-soft p-3 text-sm text-ink">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
            <span>{g.flag}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
