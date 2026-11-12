/** Datos y reglas de la herramienta de cruce entre modelos */

export const casillas303 = [
  { n: '07', label: 'Base ventas 21 %' },
  { n: '27', label: 'Total IVA devengado' },
  { n: '28', label: 'Base compras interiores' },
  { n: '29', label: 'Cuota compras interiores' },
  { n: '45', label: 'Total a deducir' },
  { n: '10', label: 'Base adq. intracomunitarias' },
  { n: '59', label: 'Entregas intracomunitarias' },
] as const

export const otrosCampos = [
  { k: '390.05', modelo: '390', label: 'Base ventas 21 % (casilla 05)' },
  { k: '390.47', modelo: '390', label: 'Total IVA devengado (casilla 47)' },
  { k: '390.64', modelo: '390', label: 'Suma de deducciones (casilla 64)' },
  { k: '390.21', modelo: '390', label: 'Adq. intracomunitarias de bienes (casilla 21)' },
  { k: '390.103', modelo: '390', label: 'Entregas intracomunitarias (casilla 103)' },
  { k: '349.E', modelo: '349', label: 'Total clave E (entregas)' },
  { k: '349.A', modelo: '349', label: 'Total clave A (adquisiciones)' },
  { k: '347.B', modelo: '347', label: 'Total clave B (ventas, IVA incl.)' },
  { k: '347.A', modelo: '347', label: 'Total clave A (compras, IVA incl.)' },
] as const

export type CruceData = { t: Record<string, number[]>; o: Record<string, number> }

const q = (a: number, b = a, c = a, d = a) => [a, b, c, d]

export const escenarios: { id: string; name: string; desc: string; data: CruceData }[] = [
  {
    id: 'coherente',
    name: 'Empresa coherente',
    desc: 'Una distribuidora que declara correctamente: todos los cruces deberían cuadrar.',
    data: {
      t: { '07': q(60000), '27': q(16800), '28': q(30000), '29': q(6300), '45': q(10500), '10': q(20000), '59': q(35000) },
      o: { '390.05': 240000, '390.47': 67200, '390.64': 42000, '390.21': 80000, '390.103': 140000, '349.E': 140000, '349.A': 80000, '347.B': 250000, '347.A': 130000 },
    },
  },
  {
    id: 'broker',
    name: 'Broker de un carrusel',
    desc: 'Compra con IVA en España, vende sin IVA a la UE y pide devoluciones. Algo no cuadra con su 349.',
    data: {
      t: { '07': q(0), '27': q(0), '28': q(1000000), '29': q(210000), '45': q(210000), '10': q(0), '59': q(1000000) },
      o: { '390.05': 0, '390.47': 0, '390.64': 840000, '390.21': 0, '390.103': 4000000, '349.E': 2600000, '349.A': 0, '347.B': 0, '347.A': 4840000 },
    },
  },
  {
    id: 'facturas',
    name: 'Facturas falsas en el 4T',
    desc: 'Una empresa que "engorda" su IVA deducible a final de año y luego no lo refleja igual en el resumen anual.',
    data: {
      t: { '07': q(60000), '27': q(12600), '28': q(30000, 30000, 30000, 125000), '29': q(6300, 6300, 6300, 26300), '45': q(6300, 6300, 6300, 26300), '10': q(0), '59': q(0) },
      o: { '390.05': 240000, '390.47': 50400, '390.64': 25200, '390.21': 0, '390.103': 0, '349.E': 0, '349.A': 0, '347.B': 260000, '347.A': 130000 },
    },
  },
]

export type Nivel = 'ok' | 'warn' | 'alert'
export interface ResultadoCruce {
  titulo: string
  modelos: string[]
  izquierda: { label: string; valor: number }
  derecha: { label: string; valor: number }
  nivel: Nivel
  explicacion: string
}

const sum = (a?: number[]) => (a ?? []).reduce((s, x) => s + (x || 0), 0)

export function evaluar(d: CruceData): ResultadoCruce[] {
  const T = (n: string) => sum(d.t[n])
  const O = (k: string) => d.o[k] ?? 0
  const igual = (a: number, b: number) => Math.abs(a - b) <= 1
  const r: ResultadoCruce[] = []

  const eq = (titulo: string, modelos: string[], l: [string, number], rr: [string, number], siDistinto: string, siIgual = 'Cuadra.') => {
    const ok = igual(l[1], rr[1])
    r.push({ titulo, modelos, izquierda: { label: l[0], valor: l[1] }, derecha: { label: rr[0], valor: rr[1] }, nivel: ok ? 'ok' : 'alert', explicacion: ok ? siIgual : siDistinto })
  }

  eq('IVA devengado: trimestres vs. resumen anual', ['303', '390'], ['Σ 303 casilla 27', T('27')], ['390 casilla 47', O('390.47')],
    'El resumen anual no coincide con la suma de los trimestres. Puede haber complementarias no presentadas, errores o un intento de "suavizar" el año. Pide todas las autoliquidaciones y complementarias.',
    'La suma de los cuatro 303 coincide con el 390.')
  eq('IVA deducible: trimestres vs. resumen anual', ['303', '390'], ['Σ 303 casilla 45', T('45')], ['390 casilla 64', O('390.64')],
    'El IVA deducido en los trimestres no coincide con el resumen anual. Si los 303 deducen más que el 390, la empresa pudo haber inflado el deducible en algún trimestre (facturas falsas) y no mantenerlo en el resumen.')
  eq('Ventas al 21 %: trimestres vs. resumen anual', ['303', '390'], ['Σ 303 casilla 07', T('07')], ['390 casilla 05', O('390.05')],
    'Las bases de ventas anuales no coinciden con las trimestrales.')
  eq('Entregas intracomunitarias: 303 vs. 390', ['303', '390'], ['Σ 303 casilla 59', T('59')], ['390 casilla 103', O('390.103')],
    'Las ventas a la UE del resumen anual no coinciden con los trimestres.')
  eq('Entregas intracomunitarias: 303 vs. 349 (clave E)', ['303', '349'], ['Σ 303 casilla 59', T('59')], ['349 clave E', O('349.E')],
    'Hay ventas "a la UE" sin IVA que no se han declarado en el 349 (o al revés). Sin 349 no se cumple un requisito de la exención y los otros países no pueden cruzar los datos: típico de **entregas intracomunitarias ficticias** (mercancía que no sale de España) en fraudes carrusel.')
  eq('Adquisiciones intracomunitarias: 303 vs. 349 (clave A)', ['303', '349'], ['Σ 303 casilla 10', T('10')], ['349 clave A', O('349.A')],
    'Las compras a la UE declaradas en el 303 no coinciden con el 349. Puede haber proveedores comunitarios ocultos o compras no declaradas.')

  // 347 ventas: no puede declarar a clientes más de lo que declara como ventas
  const ventasConIva = T('07') * 1.21
  const b = O('347.B')
  r.push({
    titulo: 'Ventas a clientes (347) vs. ventas declaradas en IVA',
    modelos: ['347', '303'],
    izquierda: { label: '347 clave B', valor: b },
    derecha: { label: 'Σ 303 casilla 07 × 1,21', valor: Math.round(ventasConIva) },
    nivel: b > ventasConIva + 1 ? 'alert' : 'ok',
    explicacion: b > ventasConIva + 1
      ? 'Declara en el 347 más ventas de las que declara en el IVA: está ocultando ventas en el 303 (IVA cobrado y no declarado).'
      : 'Coherente: el 347 recoge solo los clientes que superan 3.005,06 €, así que puede ser menor que las ventas totales.',
  })

  // 347 compras
  const comprasConIva = T('28') + T('29')
  const a = O('347.A')
  const nivelA: Nivel = a > comprasConIva + 1 ? 'alert' : comprasConIva > 0 && a < comprasConIva * 0.6 ? 'warn' : 'ok'
  r.push({
    titulo: 'Compras a proveedores (347) vs. compras con IVA deducido',
    modelos: ['347', '303'],
    izquierda: { label: '347 clave A', valor: a },
    derecha: { label: 'Σ 303 casillas 28 + 29', valor: comprasConIva },
    nivel: nivelA,
    explicacion:
      nivelA === 'alert'
        ? 'Declara en el 347 más compras de las que deduce en el IVA: incoherente, revisa el libro de facturas recibidas.'
        : nivelA === 'warn'
          ? 'Gran parte de las compras con IVA deducido **no aparecen** en el 347. O son muchos proveedores pequeños, o hay facturas de proveedores que la empresa prefiere no identificar. Pide el libro de facturas recibidas.'
          : 'Coherente.',
  })

  // Patrón de devoluciones
  const trimDevolucion = [0, 1, 2, 3].filter((i) => (d.t['45']?.[i] ?? 0) > (d.t['27']?.[i] ?? 0)).length
  r.push({
    titulo: 'Patrón de devoluciones',
    modelos: ['303'],
    izquierda: { label: 'Trimestres con deducible > devengado', valor: trimDevolucion },
    derecha: { label: 'de 4', valor: 4 },
    nivel: trimDevolucion >= 3 ? 'warn' : 'ok',
    explicacion: trimDevolucion >= 3
      ? 'La empresa soporta más IVA del que repercute casi todo el año. Es normal en exportadores reales, pero también es el perfil del **broker** de un fraude carrusel: comprueba quiénes son sus proveedores y si existen.'
      : 'Sin patrón de devolución recurrente.',
  })

  // Pico en el 4T
  const d45 = d.t['45'] ?? []
  const media3 = (sum(d45.slice(0, 3)) / 3) || 0
  const pico = media3 > 0 && (d45[3] ?? 0) > media3 * 2
  r.push({
    titulo: 'Concentración del deducible en el 4.º trimestre',
    modelos: ['303'],
    izquierda: { label: '303 4T casilla 45', valor: d45[3] ?? 0 },
    derecha: { label: 'Media 1T-3T', valor: Math.round(media3) },
    nivel: pico ? 'warn' : 'ok',
    explicacion: pico
      ? 'El IVA deducible del último trimestre más que duplica la media del año. Puede ser una inversión real, pero también el momento en que se "ajustan" resultados con facturas de última hora.'
      : 'Sin concentración anómala.',
  })

  return r
}
