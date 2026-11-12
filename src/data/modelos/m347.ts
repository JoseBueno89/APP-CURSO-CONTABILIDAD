import type { ModeloTributario } from '../../types'

export const modelo347: ModeloTributario = {
  id: '347',
  numero: '347',
  nombre: 'Declaración anual de operaciones con terceras personas',
  impuesto: 'Informativa',
  periodicidad: 'Anual (en febrero, sobre el año anterior)',
  quien: 'Empresarios y profesionales con operaciones superiores a 3.005,06 € (IVA incluido) en el año con una misma persona o entidad',
  descripcion:
    'Es el "chivato cruzado": cada empresa declara a quién ha vendido y a quién ha comprado más de 3.005,06 € en el año. Como ambas partes lo presentan, Hacienda puede cruzar los datos y detectar facturas que una declara y la otra no.',
  disponible: true,
  aviso:
    'Réplica didáctica. No se declaran en el 347 las operaciones ya informadas por otras vías (por ejemplo, las del 349 o las que se suministran por el SII). La numeración del resumen es orientativa; contrasta con el diseño de registro vigente.',
  resultado: { n: '02', label: 'Importe anual total de las operaciones' },
  secciones: [
    {
      id: 'resumen',
      title: 'Resumen de la declaración',
      filas: [
        {
          concepto: 'Totales',
          casillas: [
            { n: '01', label: 'Número total de personas y entidades', kind: 'input', queEs: 'Cuántos clientes y proveedores distintos superan el umbral de **3.005,06 €** en el año.', deDonde: 'Recuento de registros de declarados.', ejemplo: '25 clientes y 12 proveedores → 37.' },
            { n: '02', label: 'Importe anual de las operaciones', kind: 'input', queEs: 'Suma de los importes anuales (**con IVA**) de todos los declarados.', deDonde: 'Suma de la casilla de importe anual de todos los registros.', ejemplo: '1.250.000 €.', redFlags: ['Ventas declaradas en el 347 muy superiores o inferiores a las bases del 303/390 (recuerda que el 347 incluye el IVA).'], relacionadas: ['390', '303'] },
            { n: '03', label: 'Número total de inmuebles', kind: 'input', queEs: 'Número de locales de negocio alquilados declarados.', deDonde: 'Registros de inmuebles.', ejemplo: '1.' },
            { n: '04', label: 'Importe total por arrendamiento de locales de negocio', kind: 'input', queEs: 'Total de alquileres de locales declarados.', deDonde: 'Registros de inmuebles.', ejemplo: '18.000 €.', relacionadas: ['115', '180'] },
          ],
        },
      ],
    },
    {
      id: 'registro',
      title: 'Registro de un declarado',
      intro: 'Se rellena **un registro por cada cliente o proveedor** que supere el umbral, separado por clave. Aquí tienes uno de ejemplo.',
      filas: [
        {
          concepto: 'Identificación',
          casillas: [
            { n: 'NIF', label: 'NIF del declarado', kind: 'text', queEs: 'NIF del cliente o proveedor español.', deDonde: 'Factura.', ejemplo: 'B12345678.', redFlags: ['NIF de sociedades **revocados** o dadas de baja: la AEAT puede revocar el NIF de sociedades instrumentales.'] },
            { n: 'NOM', label: 'Apellidos y nombre o razón social', kind: 'text', queEs: 'Nombre del cliente o proveedor.', deDonde: 'Factura.', ejemplo: 'Reformas Atlántida, S.L.' },
            { n: 'PRO', label: 'Código provincia', kind: 'text', queEs: 'Provincia del domicilio del declarado (código de 2 dígitos).', deDonde: 'Domicilio fiscal.', ejemplo: '28 (Madrid), 46 (Valencia).' },
          ],
        },
        {
          concepto: 'Operación',
          casillas: [
            {
              n: 'CLV',
              label: 'Clave de operación',
              kind: 'text',
              queEs: 'Tipo de operación: **A** adquisiciones (compras), **B** entregas (ventas), **C** cobros por cuenta de terceros, **D** adquisiciones de entidades públicas, **E** subvenciones pagadas por entidades públicas, **F** ventas de agencias de viajes, **G** compras de agencias de viajes.',
              deDonde: 'Naturaleza de las facturas.',
              ejemplo: 'Un proveedor al que compramos → A. Un cliente al que vendemos → B.',
              redFlags: ['La empresa declara al proveedor con clave A, pero el proveedor **no la declara** con clave B (o por otro importe): posible factura falsa.'],
            },
            { n: '1T', label: 'Importe 1.er trimestre', kind: 'input', queEs: 'Importe (IVA incluido) de las operaciones con este declarado en el primer trimestre.', deDonde: 'Facturas del trimestre.', ejemplo: '12.100 €.' },
            { n: '2T', label: 'Importe 2.º trimestre', kind: 'input', queEs: 'Importe del segundo trimestre.', deDonde: 'Facturas del trimestre.', ejemplo: '9.680 €.' },
            { n: '3T', label: 'Importe 3.er trimestre', kind: 'input', queEs: 'Importe del tercer trimestre.', deDonde: 'Facturas del trimestre.', ejemplo: '0 €.' },
            { n: '4T', label: 'Importe 4.º trimestre', kind: 'input', queEs: 'Importe del cuarto trimestre.', deDonde: 'Facturas del trimestre.', ejemplo: '14.520 €.', redFlags: ['Concentración de facturación en el **último trimestre** para "ajustar" resultados.'] },
            { n: 'IMP', label: 'Importe anual de las operaciones', kind: 'calc', queEs: 'Total del año con este declarado, **IVA incluido**: suma de los cuatro trimestres.', deDonde: 'Automático: 1T + 2T + 3T + 4T.', ejemplo: '36.300 €.', redFlags: ['Diferencias con el importe que declara la otra parte.'], relacionadas: ['02'] },
          ],
        },
        {
          concepto: 'Datos especiales',
          casillas: [
            { n: 'MET', label: 'Importe percibido en metálico', kind: 'input', queEs: 'Cobros **en efectivo** de este cliente que superen **6.000 €** en el año. Se declaran aparte, aunque la operación no supere el umbral general.', deDonde: 'Libro de caja y recibos.', ejemplo: '7.000 €.', redFlags: ['Cobros en efectivo elevados entre empresas, que además pueden vulnerar la **limitación de pagos en efectivo** (1.000 € cuando interviene un empresario o profesional).', 'Es una de las casillas más útiles en investigaciones de blanqueo: contrástala con la cuenta 570 (Caja) del declarante.'] },
            { n: 'ARR', label: 'Arrendamiento de local de negocio', kind: 'text', queEs: 'Se marca si las operaciones corresponden al alquiler de un local de negocio. Se informa también la referencia catastral.', deDonde: 'Contrato de arrendamiento.', ejemplo: 'X', relacionadas: ['115', '180'] },
            { n: 'INM', label: 'Importe por transmisiones de inmuebles sujetas a IVA', kind: 'input', queEs: 'Importe recibido por ventas de inmuebles sujetas a IVA.', deDonde: 'Escrituras de compraventa.', ejemplo: '0 €.', redFlags: ['Compraventas de inmuebles entre sociedades vinculadas a precios fuera de mercado.'] },
          ],
        },
      ],
    },
  ],
  ejemplo: { '01': 37, '02': 1250000, '03': 1, '04': 18000, NIF: 'B12345678', NOM: 'Reformas Atlántida, S.L.', PRO: '46', CLV: 'B', '1T': 12100, '2T': 9680, '4T': 14520, MET: 7000 },
}

export function compute347(v: Record<string, number>): Record<string, number> {
  const g = (k: string) => v[k] ?? 0
  return { ...v, IMP: Math.round((g('1T') + g('2T') + g('3T') + g('4T')) * 100) / 100 }
}
