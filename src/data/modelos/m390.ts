import type { Casilla, ModeloTributario } from '../../types'

const par = (b: string, c: string, concepto: string, queEs: string, deDonde: string, ejemplo: string, extra: Partial<Casilla> = {}, rate?: number): Casilla[] => [
  { n: b, label: 'Base imponible', kind: 'input', queEs, deDonde, ejemplo, relacionadas: [c], ...extra },
  {
    n: c,
    label: rate ? `Cuota (${rate} %)` : 'Cuota',
    kind: rate ? 'calc' : 'input',
    queEs: `IVA correspondiente a la base de la casilla ${b} (${concepto}) acumulado en **todo el año**.`,
    deDonde: rate ? `Se calcula: casilla ${b} × ${rate} %. Debe coincidir con la suma de las cuotas equivalentes de los cuatro 303.` : `Suma de las cuotas equivalentes de los 303 del año.`,
    ejemplo: rate ? `Base de 100.000 € → cuota de ${(1000 * rate).toLocaleString('es-ES')} €.` : 'Suma de los cuatro trimestres.',
    relacionadas: [b],
  },
]

export const modelo390: ModeloTributario = {
  id: '390',
  numero: '390',
  nombre: 'IVA. Declaración-resumen anual',
  impuesto: 'IVA',
  periodicidad: 'Anual (del 1 al 30 de enero del año siguiente)',
  quien: 'Quienes presentan el 303 (salvo exonerados, por ejemplo, ciertos sujetos en SII o con actividades muy simples)',
  descripcion:
    'Es el "resumen del año" del IVA: recoge, sumadas, todas las operaciones declaradas en los 303 trimestrales, más información sobre el volumen total de operaciones.',
  disponible: true,
  aviso:
    'Réplica didáctica SIMPLIFICADA: el 390 oficial tiene más de 600 casillas (desglose por tipos del IVA deducible, regímenes especiales, prorrata, sectores diferenciados…). Aquí se muestran las esenciales con su numeración habitual; contrasta con las instrucciones del ejercicio.',
  resultado: { n: '86', label: 'Resultado de la liquidación anual', signo: true },
  secciones: [
    {
      id: 'devengado',
      title: 'IVA devengado en el año',
      intro: 'Suma de todo el IVA repercutido y autorrepercutido durante el ejercicio. Debe coincidir con la suma de las casillas equivalentes de los **cuatro 303**.',
      columns: ['Base imponible', 'Cuota'],
      filas: [
        { concepto: 'Régimen ordinario al 4 %', casillas: par('01', '02', 'tipo 4 %', 'Total anual de ventas **sin IVA** al tipo superreducido.', 'Suma de la casilla 01 de los cuatro 303.', 'Ventas de pan de 8.000 € por trimestre → 32.000 € en el año.', {}, 4) },
        { concepto: 'Régimen ordinario al 10 %', casillas: par('03', '04', 'tipo 10 %', 'Total anual de ventas **sin IVA** al tipo reducido.', 'Suma de la casilla 04 de los cuatro 303.', 'Restaurante con 45.000 € por trimestre → 180.000 € en el año.', {}, 10) },
        {
          concepto: 'Régimen ordinario al 21 %',
          casillas: par('05', '06', 'tipo 21 %', 'Total anual de ventas **sin IVA** al tipo general.', 'Suma de la casilla 07 de los cuatro 303.', 'Consultora con 60.000 € por trimestre → 240.000 € en el año.', {
            redFlags: ['Si no coincide con la suma de los 303, la empresa ha corregido (o maquillado) algún trimestre: pide las complementarias.'],
            relacionadas: ['06', '303'],
          }, 21),
        },
        { concepto: 'Adquisiciones intracomunitarias de bienes', casillas: par('21', '22', 'adquisiciones intracomunitarias de bienes', 'Compras de **bienes** a proveedores de otros países de la UE en todo el año.', 'Suma de la parte de bienes de la casilla 10 de los 303 y de la clave A del 349.', 'Compras de maquinaria a Alemania por 80.000 €.', { redFlags: ['Debe cuadrar con la clave A del 349 y con lo que declaran los proveedores en su país.'], relacionadas: ['22', '349'] }) },
        { concepto: 'Adquisiciones intracomunitarias de servicios', casillas: par('545', '546', 'adquisiciones intracomunitarias de servicios', 'Servicios contratados a empresas de otros países de la UE (publicidad online, software, consultoría…).', 'Suma de la parte de servicios de la casilla 10 de los 303 y de la clave I del 349.', 'Publicidad contratada a una empresa irlandesa por 12.000 €.', { relacionadas: ['546', '349'] }) },
        { concepto: 'Otras operaciones con inversión del sujeto pasivo', casillas: par('27', '28', 'inversión del sujeto pasivo', 'Compras en las que la empresa se autorrepercute el IVA por **ISP** (obras, chatarra, oro, móviles, servicios de fuera de la UE…).', 'Suma de la casilla 12 de los 303.', 'Subcontratas de rehabilitación por 50.000 €.') },
        { concepto: 'Modificación de bases y cuotas', casillas: par('29', '30', 'modificaciones', 'Correcciones anuales (rectificativas, devoluciones, impagos).', 'Suma de la casilla 14 de los 303.', 'Rectificativas por −3.000 €.') },
        {
          concepto: 'Total cuotas devengadas',
          casillas: [
            {
              n: '47',
              label: 'Total cuotas IVA devengado',
              kind: 'calc',
              queEs: 'Todo el IVA devengado en el año. Es el equivalente anual de la casilla **27** del 303.',
              deDonde: 'Suma automática: 02 + 04 + 06 + 22 + 546 + 28 + 30.',
              ejemplo: '50.400 (21 %) + 16.800 (intracomunitarias) = 67.200 €.',
              redFlags: ['Debe ser igual a la suma de la casilla 27 de los cuatro 303. Usa la herramienta de **cruce de modelos** para comprobarlo.'],
              relacionadas: ['303', '64'],
            },
          ],
        },
      ],
    },
    {
      id: 'deducible',
      title: 'IVA deducible en el año',
      intro: 'Suma de todo el IVA soportado que la empresa se ha deducido. Equivalente anual de las casillas 28 a 45 del 303.',
      columns: ['Base', 'Cuota'],
      filas: [
        { concepto: 'Operaciones interiores corrientes', casillas: par('48', '49', 'compras interiores corrientes', 'Compras y gastos corrientes a proveedores españoles durante el año.', 'Suma de las casillas 28/29 de los 303.', 'Compras de 30.000 € por trimestre → 120.000 €.', { redFlags: ['Un IVA deducible desproporcionado frente al devengado suele esconder **facturas falsas** de proveedores.'] }) },
        { concepto: 'Operaciones interiores bienes de inversión', casillas: par('50', '51', 'bienes de inversión interiores', 'Compras de bienes de inversión en España en el año.', 'Suma de las casillas 30/31 de los 303.', 'Furgoneta de 25.000 €.') },
        { concepto: 'Importaciones bienes corrientes', casillas: par('52', '53', 'importaciones corrientes', 'Importaciones de bienes corrientes desde fuera de la UE.', 'Suma de las casillas 32/33 de los 303 (DUA).', 'Importaciones de textil por 60.000 €.') },
        { concepto: 'Importaciones bienes de inversión', casillas: par('54', '55', 'importaciones de inversión', 'Importaciones de bienes de inversión.', 'Suma de las casillas 34/35 de los 303.', 'Máquina importada de Japón por 40.000 €.') },
        { concepto: 'Adquisiciones intracomunitarias bienes corrientes', casillas: par('56', '57', 'adq. intracomunitarias corrientes', 'Deducción del IVA autorrepercutido por compras corrientes en la UE.', 'Suma de las casillas 36/37 de los 303.', 'Mercancía comprada en Francia por 80.000 €.') },
        { concepto: 'Adquisiciones intracomunitarias bienes de inversión', casillas: par('58', '59', 'adq. intracomunitarias de inversión', 'Deducción del IVA autorrepercutido por bienes de inversión comprados en la UE.', 'Suma de las casillas 38/39 de los 303.', 'Camión comprado en Alemania por 60.000 €.') },
        { concepto: 'Adquisiciones intracomunitarias de servicios', casillas: par('597', '598', 'adq. intracomunitarias de servicios', 'Deducción del IVA autorrepercutido por servicios contratados en la UE.', 'Parte de servicios de las casillas 36/37 de los 303.', 'Publicidad online contratada en Irlanda por 12.000 €.') },
        { concepto: 'Rectificación de deducciones', casillas: par('62', '63', 'rectificaciones', 'Correcciones del IVA deducido (devoluciones a proveedores, rectificativas recibidas).', 'Suma de las casillas 40/41 de los 303.', 'Devolución de género por −2.000 €.') },
        {
          concepto: 'Total deducciones',
          casillas: [
            { n: '64', label: 'Suma de deducciones', kind: 'calc', queEs: 'Todo el IVA deducido en el año. Equivalente anual de la casilla **45** del 303.', deDonde: 'Suma automática: 49 + 51 + 53 + 55 + 57 + 59 + 598 + 63.', ejemplo: '25.200 + 16.800 = 42.000 €.', relacionadas: ['303', '47', '65'] },
            { n: '65', label: 'Resultado régimen general', kind: 'calc', queEs: 'IVA devengado menos IVA deducible del año: **47 − 64**.', deDonde: 'Automático.', ejemplo: '67.200 − 42.000 = 25.200 €.', relacionadas: ['47', '64', '84'] },
          ],
        },
      ],
    },
    {
      id: 'resultado',
      title: 'Resultado de la liquidación anual',
      filas: [
        {
          concepto: 'Liquidación',
          casillas: [
            { n: '84', label: 'Suma de resultados', kind: 'calc', queEs: 'Suma de los resultados de todos los regímenes de la empresa. Para la mayoría, igual a la casilla 65.', deDonde: 'Automático.', ejemplo: '25.200 €.', relacionadas: ['65'] },
            { n: '85', label: 'Compensación de cuotas del ejercicio anterior', kind: 'input', queEs: 'Saldo a favor que venía del año anterior y que se ha compensado durante este año.', deDonde: 'Casilla 110/78 del primer 303 del año y 390 del año anterior.', ejemplo: 'Venía con 2.000 € a compensar → 2.000 €.', relacionadas: ['86', '662'] },
            { n: '86', label: 'Resultado de la liquidación', kind: 'calc', queEs: 'El resultado "teórico" del año completo: **84 − 85**. Si los 303 se presentaron bien, debe coincidir con lo ingresado y pendiente en las autoliquidaciones.', deDonde: 'Automático.', ejemplo: '25.200 − 2.000 = 23.200 €.', redFlags: ['Si no cuadra con la suma de ingresos (95) y saldos (97/98), hay trimestres mal declarados.'], relacionadas: ['95', '97', '98'] },
          ],
        },
        {
          concepto: 'Resultado de las autoliquidaciones del año',
          casillas: [
            { n: '95', label: 'Total resultados a ingresar en las autoliquidaciones', kind: 'input', queEs: 'Suma de lo que la empresa **ingresó** en los 303 del año (resultados positivos).', deDonde: 'Suma de la casilla 71 positiva de los 303.', ejemplo: 'Ingresó 6.300 + 5.800 + 4.300 + 6.800 = 23.200 €.', redFlags: ['303 "presentados sin ingreso" o aplazados que nunca se pagan.'], relacionadas: ['86', '303'] },
            { n: '97', label: 'Resultado de la última autoliquidación a compensar', kind: 'input', queEs: 'Si el último 303 del año salió negativo y se dejó a compensar el año siguiente, se indica aquí.', deDonde: 'Casilla 71 negativa del 4T (sin pedir devolución).', ejemplo: '0 €.', relacionadas: ['662'] },
            { n: '98', label: 'Resultado de la última autoliquidación a devolver', kind: 'input', queEs: 'Si en el último periodo se pidió devolución, el importe solicitado.', deDonde: 'Casilla 71 del 303 del 4T con solicitud de devolución.', ejemplo: '0 €.', redFlags: ['Devoluciones anuales recurrentes de empresas sin inversiones: cruza con sus proveedores.'] },
            { n: '662', label: 'Cuotas pendientes de compensación al término del ejercicio', kind: 'input', queEs: 'Saldo a favor que queda "guardado" para el año siguiente.', deDonde: 'Casilla 87 del último 303.', ejemplo: '0 €.', relacionadas: ['85'] },
          ],
        },
      ],
    },
    {
      id: 'volumen',
      title: 'Volumen de operaciones',
      intro: 'Cuánto ha "facturado" la empresa en total durante el año (sin IVA). Es un dato clave para comparar con el Impuesto sobre Sociedades y con las cuentas anuales.',
      filas: [
        {
          concepto: 'Volumen',
          casillas: [
            { n: '99', label: 'Operaciones en régimen general', kind: 'input', queEs: 'Ventas y servicios sujetos y no exentos en régimen general (sin IVA).', deDonde: 'Suma de bases devengadas por ventas propias.', ejemplo: '240.000 €.', relacionadas: ['108'] },
            { n: '103', label: 'Entregas intracomunitarias exentas', kind: 'input', queEs: 'Ventas a empresas de otros países de la UE en todo el año.', deDonde: 'Suma de la casilla 59 de los 303.', ejemplo: '140.000 €.', redFlags: ['Debe cuadrar con la clave E del 349. Diferencias = posibles entregas ficticias.'], relacionadas: ['349', '303'] },
            { n: '104', label: 'Exportaciones y otras operaciones exentas con derecho a deducción', kind: 'input', queEs: 'Exportaciones fuera de la UE y asimiladas.', deDonde: 'Suma de la casilla 60 de los 303.', ejemplo: '0 €.' },
            { n: '105', label: 'Operaciones exentas sin derecho a deducción', kind: 'input', queEs: 'Operaciones exentas que no dan derecho a deducir (alquiler de vivienda, sanidad, seguros, formación…).', deDonde: 'Libro de facturas expedidas.', ejemplo: '0 €.', relacionadas: ['108'] },
            { n: '108', label: 'Total volumen de operaciones', kind: 'calc', queEs: 'La "facturación total" de la empresa en el año a efectos de IVA.', deDonde: 'Automático (simplificado): 99 + 103 + 104 + 105.', ejemplo: '380.000 €.', redFlags: ['Debe ser coherente con la **cifra de negocios** de las cuentas anuales y del modelo 200.', 'Volumen superior a 6 M€ → la empresa pasa a ser "gran empresa" (303 mensual y SII).'], relacionadas: ['200'] },
          ],
        },
      ],
    },
  ],
  ejemplo: { '05': 240000, '21': 80000, '22': 16800, '48': 120000, '49': 25200, '56': 80000, '57': 16800, '85': 2000, '95': 23200, '99': 240000, '103': 140000 },
}

export function compute390(v: Record<string, number>): Record<string, number> {
  const r: Record<string, number> = { ...v }
  const g = (k: string) => r[k] ?? 0
  const round = (x: number) => Math.round(x * 100) / 100
  r['02'] = round(g('01') * 0.04)
  r['04'] = round(g('03') * 0.1)
  r['06'] = round(g('05') * 0.21)
  r['47'] = round(['02', '04', '06', '22', '546', '28', '30'].reduce((s, k) => s + g(k), 0))
  r['64'] = round(['49', '51', '53', '55', '57', '59', '598', '63'].reduce((s, k) => s + g(k), 0))
  r['65'] = round(g('47') - g('64'))
  r['84'] = g('65')
  r['86'] = round(g('84') - g('85'))
  r['108'] = round(g('99') + g('103') + g('104') + g('105'))
  return r
}
