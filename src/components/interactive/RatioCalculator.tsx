import { useState } from 'react'
import { eur } from '../../lib/rich'

type Field = 'ac' | 'pc' | 'pasivo' | 'activo' | 'tes' | 'ventas' | 'rexp' | 'clientes'
const labels: Record<Field, string> = {
  ac: 'Activo corriente',
  pc: 'Pasivo corriente',
  pasivo: 'Pasivo total',
  activo: 'Activo total',
  tes: 'Caja y bancos',
  ventas: 'Cifra de negocios',
  rexp: 'Resultado de explotación',
  clientes: 'Clientes',
}

const presets: { name: string; v: Record<Field, number> }[] = [
  { name: 'Inversiones Levante Global (sospechosa)', v: { ac: 680000, pc: 252000, pasivo: 1752000, activo: 2230000, tes: 455000, ventas: 62000, rexp: -30000, clientes: 45000 } },
  { name: 'Distribuidora sana', v: { ac: 350000, pc: 200000, pasivo: 380000, activo: 600000, tes: 40000, ventas: 850000, rexp: 50000, clientes: 110000 } },
]

type Level = 'ok' | 'warn' | 'alert'
interface Ratio { name: string; value: string; level: Level; comment: string }

function compute(v: Record<Field, number>): Ratio[] {
  const div = (a: number, b: number) => (b ? a / b : NaN)
  const pct = (x: number) => (Number.isFinite(x) ? `${(x * 100).toLocaleString('es-ES', { maximumFractionDigits: 1 })} %` : '—')
  const num = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString('es-ES', { maximumFractionDigits: d }) : '—')

  const liq = div(v.ac, v.pc)
  const end = div(v.pasivo, v.activo)
  const efv = div(v.tes, v.ventas)
  const rot = div(v.ventas, v.activo)
  const roa = div(v.rexp, v.activo)
  const mar = div(v.rexp, v.ventas)
  const pmc = div(v.clientes, v.ventas) * 365

  return [
    { name: 'Liquidez', value: num(liq), level: liq < 1 ? 'warn' : 'ok', comment: liq < 1 ? 'No cubre sus deudas a corto con activos corrientes.' : 'Cubre sus deudas a corto. Revisa de qué está compuesto el activo corriente.' },
    { name: 'Endeudamiento', value: pct(end), level: end > 0.85 ? 'alert' : end > 0.7 ? 'warn' : 'ok', comment: end > 0.7 ? 'Muy financiada con dinero ajeno: ¿quiénes son los acreedores?' : 'Nivel de deuda moderado.' },
    { name: 'Efectivo / ventas', value: pct(efv), level: efv > 1 ? 'alert' : efv > 0.3 ? 'warn' : 'ok', comment: efv > 1 ? 'Tiene más efectivo que ventas anuales: origen del efectivo no explicado por la actividad.' : efv > 0.3 ? 'Efectivo elevado para su actividad.' : 'Efectivo proporcionado.' },
    { name: 'Rotación del activo', value: num(rot), level: rot < 0.1 ? 'alert' : rot < 0.5 ? 'warn' : 'ok', comment: rot < 0.1 ? 'Acumula activos que no generan ventas: patrimonio "aparcado".' : 'Uso razonable de los activos.' },
    { name: 'Rentabilidad (ROA)', value: pct(roa), level: roa < 0 ? 'warn' : 'ok', comment: roa < 0 ? 'Los activos no generan beneficio: ¿cómo se mantiene la sociedad?' : 'Los activos generan resultado.' },
    { name: 'Margen de explotación', value: pct(mar), level: mar > 0.5 || mar < -0.3 ? 'alert' : mar < 0 ? 'warn' : 'ok', comment: mar > 0.5 ? 'Margen extraordinario: ¿ventas reales?' : mar < -0.3 ? 'Pérdidas muy grandes respecto a las ventas.' : 'Margen dentro de lo habitual.' },
    { name: 'Periodo medio de cobro', value: Number.isFinite(pmc) ? `${num(pmc, 0)} días` : '—', level: pmc > 180 ? 'alert' : pmc > 90 ? 'warn' : 'ok', comment: pmc > 180 ? 'Ventas que no se cobran: posibles ventas ficticias o clientes vinculados.' : 'Plazo de cobro razonable.' },
  ]
}

const levelStyle: Record<Level, string> = {
  ok: 'border-ok/40 bg-ok-soft text-ok',
  warn: 'border-warn/40 bg-warn-soft text-warn',
  alert: 'border-danger/40 bg-danger-soft text-danger',
}
const levelLabel: Record<Level, string> = { ok: 'Normal', warn: 'Atención', alert: 'Alerta' }

export default function RatioCalculator() {
  const [v, setV] = useState<Record<Field, number>>(presets[0].v)
  const ratios = compute(v)
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-line bg-surface-2 px-4 py-3">
        {presets.map((p) => (
          <button key={p.name} onClick={() => setV(p.v)} className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted hover:text-ink">{p.name}</button>
        ))}
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="grid grid-cols-2 gap-3 border-b border-line p-4 lg:border-b-0 lg:border-r">
          {(Object.keys(labels) as Field[]).map((f) => (
            <label key={f} className="text-xs text-muted">
              {labels[f]}
              <input
                type="number"
                value={v[f]}
                onChange={(e) => setV((s) => ({ ...s, [f]: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-right font-mono text-sm text-ink focus:border-accent focus:outline-none"
              />
              <span className="sr-only">{eur(v[f])} €</span>
            </label>
          ))}
        </div>
        <ul className="divide-y divide-line">
          {ratios.map((r) => (
            <li key={r.name} className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">{r.name}</span>
                  <span className="font-mono text-sm font-semibold text-ink">{r.value}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted">{r.comment}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-bold ${levelStyle[r.level]}`}>{levelLabel[r.level]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
