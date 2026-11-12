import type { ModeloTributario } from '../../types'

export const modelo349: ModeloTributario = {
  id: '349',
  numero: '349',
  nombre: 'Declaración recapitulativa de operaciones intracomunitarias',
  impuesto: 'IVA (informativa)',
  periodicidad: 'Mensual (o trimestral si las entregas y prestaciones no superan 50.000 € por trimestre)',
  quien: 'Empresarios y profesionales que compran o venden bienes o servicios a otros países de la UE',
  descripcion:
    'Es la "lista de clientes y proveedores europeos": por cada operador de otro país de la UE indica su NIF-IVA, el tipo de operación (clave) y el importe. Todos los Estados miembros intercambian esta información.',
  disponible: true,
  aviso:
    'Réplica didáctica. El 349 se presenta por vía electrónica con una hoja resumen y un registro por cada operador. La numeración del resumen es orientativa; contrasta con el diseño de registro vigente.',
  resultado: { n: '02', label: 'Importe total de operaciones intracomunitarias' },
  secciones: [
    {
      id: 'resumen',
      title: 'Resumen de la declaración',
      intro: 'Totales de todos los operadores declarados en el periodo.',
      filas: [
        {
          concepto: 'Operaciones del periodo',
          casillas: [
            { n: '01', label: 'Número total de operadores intracomunitarios', kind: 'input', queEs: 'Cuántos **clientes y proveedores de otros países de la UE** distintos aparecen en la declaración (contando por separado cada combinación de operador y clave).', deDonde: 'Recuento de los registros de declarados.', ejemplo: 'La empresa vendió a un cliente italiano y compró a un proveedor alemán → 2.', redFlags: ['Muchos operadores nuevos en cada periodo, con NIF-IVA que se dan de baja enseguida.'] },
            { n: '02', label: 'Importe de las operaciones intracomunitarias', kind: 'input', queEs: 'Suma de las bases imponibles de **todas** las operaciones declaradas (compras y ventas).', deDonde: 'Suma de la base imponible de todos los registros.', ejemplo: '35.000 € de ventas a Italia + 20.000 € de compras a Alemania = 55.000 €.', redFlags: ['Debe cuadrar con las casillas 10 (compras) y 59 (ventas) del 303 del mismo periodo.'], relacionadas: ['303', '390'] },
          ],
        },
        {
          concepto: 'Rectificaciones de periodos anteriores',
          casillas: [
            { n: '03', label: 'Número total de operadores con rectificaciones', kind: 'input', queEs: 'Número de operadores cuyos importes de periodos anteriores se corrigen en esta declaración.', deDonde: 'Registros de rectificación.', ejemplo: 'Se corrige la venta a un cliente francés del trimestre anterior → 1.', redFlags: ['Rectificaciones frecuentes tras requerimientos o tras detectar discrepancias con otros países.'] },
            { n: '04', label: 'Importe de las rectificaciones', kind: 'input', queEs: 'Importe total rectificado.', deDonde: 'Suma de los registros de rectificación.', ejemplo: '−5.000 €.' },
          ],
        },
      ],
    },
    {
      id: 'registro',
      title: 'Registro de un operador declarado',
      intro: 'En la declaración real se rellena **un registro por cada operador y clave**. Aquí tienes uno de ejemplo para entender cada campo.',
      filas: [
        {
          concepto: 'Identificación del operador',
          casillas: [
            { n: 'NIF', label: 'NIF-IVA del operador', kind: 'text', queEs: 'Número de identificación a efectos de IVA del cliente o proveedor **en su país**, con el prefijo del país (FR, DE, IT, PT…).', deDonde: 'Factura del cliente/proveedor; debe comprobarse en el **VIES**.', ejemplo: 'FR12345678901 (Francia), DE123456789 (Alemania).', redFlags: ['NIF-IVA no válido en el VIES en la fecha de la operación: la exención de la venta puede no proceder.', 'Mismo NIF-IVA que aparece en tramas investigadas en otros países.'], relacionadas: ['036'] },
            { n: 'NOM', label: 'Nombre o razón social', kind: 'text', queEs: 'Nombre de la empresa del otro país.', deDonde: 'Factura.', ejemplo: 'Distribution Lyon SARL.', redFlags: ['Nombres genéricos o que no coinciden con el titular del NIF-IVA en el VIES.'] },
            { n: 'PAIS', label: 'Código de país', kind: 'text', queEs: 'País de la UE del operador (dos letras).', deDonde: 'Prefijo del NIF-IVA.', ejemplo: 'FR, DE, IT, PT, NL…' },
          ],
        },
        {
          concepto: 'Operación',
          casillas: [
            {
              n: 'CLV',
              label: 'Clave de operación',
              kind: 'text',
              queEs: 'Letra que indica **qué tipo de operación** es. Las más importantes: **E** entregas intracomunitarias (ventas de bienes), **A** adquisiciones (compras de bienes), **T** operaciones triangulares, **S** prestaciones de servicios (ventas), **I** adquisiciones de servicios (compras), **M** y **H** entregas posteriores a una importación exenta, **R / D / C** ventas en consigna.',
              deDonde: 'Naturaleza de la factura.',
              ejemplo: 'Venta de aceite a un distribuidor francés → E. Compra de maquinaria a Alemania → A.',
              redFlags: ['Uso de la clave **T** (triangulares) o **M** para mercancía que en realidad no sale de España.', 'Cambios de clave entre periodos para el mismo operador.'],
            },
            { n: 'BI', label: 'Base imponible', kind: 'input', queEs: 'Importe sin IVA de las operaciones con ese operador y clave durante el periodo.', deDonde: 'Suma de las facturas con ese operador.', ejemplo: '35.000 €.', redFlags: ['Debe coincidir con lo que el otro operador declara en su país (el sistema **VIES** cruza los datos y genera discrepancias).'], relacionadas: ['02'] },
          ],
        },
      ],
    },
  ],
  ejemplo: { '01': 2, '02': 55000, NIF: 'FR12345678901', NOM: 'Distribution Lyon SARL', PAIS: 'FR', CLV: 'E', BI: 35000 },
}
