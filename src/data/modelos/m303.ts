import type { Casilla, ModeloTributario } from '../../types'

/* Helpers para no repetir texto en las filas por tipo impositivo */
const base = (n: string, tipo: string, ej: string, extra?: Partial<Casilla>): Casilla => ({
  n,
  label: 'Base imponible',
  kind: 'input',
  queEs: `Es la suma del importe **sin IVA** de todas las ventas o servicios que la empresa ha facturado este periodo al **${tipo}**. Es decir, el precio "limpio" antes de añadir el impuesto.`,
  deDonde: `Sale del **libro registro de facturas expedidas** (o del SII). En contabilidad, suele coincidir con lo anotado en las cuentas del grupo **70** (ventas) que llevan IVA al ${tipo}.`,
  ejemplo: ej,
  redFlags: [
    'Bases que cambian bruscamente de un trimestre a otro sin explicación comercial.',
    'Bases que no cuadran con las ventas de la contabilidad (grupo 70) o con el modelo 347 de los clientes.',
  ],
  relacionadas: ['27', '390'],
  ...extra,
})

const tipo = (n: string, pct: number): Casilla => ({
  n,
  label: 'Tipo %',
  kind: 'pct',
  rate: pct,
  queEs: `Es el **porcentaje de IVA** que se aplica a la base de esta fila: el **${String(pct).replace('.', ',')} %**. Viene fijado por la ley; la empresa no lo elige.`,
  deDonde: 'Viene predefinido en el formulario de la AEAT según la Ley 37/1992 del IVA.',
  ejemplo: `Si la base es 1.000 €, la cuota será 1.000 × ${String(pct).replace('.', ',')} % = ${(1000 * pct / 100).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €.`,
})

const cuota = (n: string, b: string, t: string, pct: number): Casilla => ({
  n,
  label: 'Cuota',
  kind: 'calc',
  queEs: `Es el **IVA que la empresa ha cobrado** a sus clientes en esta fila (IVA **repercutido**). Se calcula multiplicando la base (casilla ${b}) por el tipo (casilla ${t}). Es dinero que **no es de la empresa**: lo ha cobrado por cuenta de Hacienda.`,
  deDonde: `Se calcula automáticamente. En contabilidad debe coincidir con los abonos a la cuenta **477 (H.P. IVA repercutido)** por este tipo.`,
  ejemplo: `Si la casilla ${b} es 10.000 €, la cuota es 10.000 × ${pct} % = ${(100 * pct).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €.`,
  relacionadas: [b, t, '27'],
})

export const modelo303: ModeloTributario = {
  id: '303',
  numero: '303',
  nombre: 'IVA. Autoliquidación',
  impuesto: 'IVA',
  periodicidad: 'Trimestral (mensual para grandes empresas, inscritos en REDEME y grupos de IVA)',
  quien: 'Empresarios y profesionales que realizan operaciones sujetas a IVA',
  descripcion:
    'Es la "cuenta trimestral" del IVA: la empresa declara cuánto IVA ha cobrado a sus clientes, cuánto ha pagado a sus proveedores, y paga (o pide que le devuelvan) la diferencia.',
  disponible: true,
  aviso:
    'Réplica didáctica basada en la estructura del modelo vigente. La AEAT revisa el diseño periódicamente (p. ej., en 2023-2024 se añadieron casillas temporales 150 a 155 para tipos del 0 % y 5 %). Contrasta siempre con las instrucciones oficiales del ejercicio.',
  secciones: [
    {
      id: 'devengado',
      title: 'IVA devengado (lo que la empresa ha cobrado)',
      intro:
        'Aquí se declara todo el IVA que la empresa **ha cobrado o debe ingresar**: el de sus ventas, el de sus compras a otros países de la UE y el de las operaciones donde ella misma debe "autorrepercutirse" el impuesto.',
      filas: [
        {
          concepto: 'Régimen general – Tipo superreducido',
          casillas: [
            base('01', 'tipo superreducido (4 %)', 'Una panadería vende pan por 8.000 € sin IVA en el trimestre: casilla 01 = 8.000 €.'),
            tipo('02', 4),
            cuota('03', '01', '02', 4),
          ],
        },
        {
          concepto: 'Régimen general – Tipo reducido',
          casillas: [
            base('04', 'tipo reducido (10 %)', 'Un restaurante factura 45.000 € sin IVA en comidas: casilla 04 = 45.000 €.'),
            tipo('05', 10),
            cuota('06', '04', '05', 10),
          ],
        },
        {
          concepto: 'Régimen general – Tipo general',
          casillas: [
            base('07', 'tipo general (21 %)', 'Una consultora factura 60.000 € sin IVA a sus clientes: casilla 07 = 60.000 €.', {
              redFlags: [
                'Sociedad recién constituida, sin empleados ni local, que declara bases altísimas desde el primer trimestre (posible "trucha" o sociedad emisora de facturas falsas).',
                'Bases que no cuadran con el modelo 347 de los clientes ni con las ventas de la contabilidad.',
              ],
            }),
            tipo('08', 21),
            cuota('09', '07', '08', 21),
          ],
        },
        {
          concepto: 'Adquisiciones intracomunitarias de bienes y servicios',
          casillas: [
            {
              n: '10',
              label: 'Base imponible',
              kind: 'input',
              queEs:
                'Es el importe sin IVA de lo que la empresa ha **comprado a proveedores de otros países de la UE**. En estas compras el proveedor extranjero **no cobra IVA español**: es la empresa española la que se lo "autoliquida".',
              deDonde: 'Facturas de proveedores comunitarios (sin IVA) anotadas en el libro de facturas recibidas. Deben aparecer también en el **modelo 349** como adquisiciones.',
              ejemplo: 'Una empresa compra maquinaria a un proveedor alemán por 20.000 €: casilla 10 = 20.000 €.',
              redFlags: [
                'Es el **punto de entrada del fraude carrusel**: mercancía que entra desde la UE sin IVA y se revende en España cobrando IVA que nunca se ingresa.',
                'Importes que no cuadran con lo que declaran los proveedores en su país (datos del sistema VIES).',
              ],
              relacionadas: ['11', '36', '349'],
            },
            {
              n: '11',
              label: 'Cuota',
              kind: 'input',
              queEs:
                'Es el IVA que la empresa **se autorrepercute** por sus compras intracomunitarias. Al mismo tiempo, normalmente se lo **deduce** en las casillas 36-39, de modo que el efecto neto es cero si tiene derecho a deducción completa.',
              deDonde: 'Se calcula aplicando el tipo español que corresponda a la base de la casilla 10. En contabilidad: cuenta 477 (repercutido) y 472 (soportado) a la vez.',
              ejemplo: 'Compra de 20.000 € al 21 %: casilla 11 = 4.200 €, y la misma cantidad aparece como deducible en la casilla 37.',
              redFlags: ['Que la cuota declarada aquí no aparezca después como deducible (o al revés) suele indicar errores o manipulación.'],
              relacionadas: ['10', '37', '39'],
            },
          ],
        },
        {
          concepto: 'Otras operaciones con inversión del sujeto pasivo (excepto adq. intracomunitarias)',
          casillas: [
            {
              n: '12',
              label: 'Base imponible',
              kind: 'input',
              queEs:
                'Hay operaciones en las que la ley obliga al **comprador** (y no al vendedor) a declarar el IVA. Se llama **inversión del sujeto pasivo** (ISP). Aquí va la base de esas compras: por ejemplo, servicios de empresas de fuera de la UE, ciertas obras de construcción, chatarra, oro de inversión, teléfonos móviles o tablets entre empresarios.',
              deDonde: 'Facturas recibidas sin IVA con la mención "inversión del sujeto pasivo".',
              ejemplo: 'Una constructora subcontrata la rehabilitación de un edificio por 50.000 €: el subcontratista factura sin IVA y la constructora anota 50.000 € en la casilla 12.',
              redFlags: [
                'La ISP se introdujo precisamente en sectores con mucho fraude (**chatarra, oro, móviles, construcción**). Una actividad intensa en estos sectores merece atención.',
              ],
              relacionadas: ['13', '28', '122'],
            },
            {
              n: '13',
              label: 'Cuota',
              kind: 'input',
              queEs: 'Es el IVA que el comprador **se autorrepercute** por las operaciones de la casilla 12. Igual que en las intracomunitarias, normalmente se compensa con el IVA deducible.',
              deDonde: 'Base de la casilla 12 por el tipo que corresponda.',
              ejemplo: '50.000 € al 21 % → casilla 13 = 10.500 €.',
              relacionadas: ['12', '29'],
            },
          ],
        },
        {
          concepto: 'Modificación de bases y cuotas',
          casillas: [
            {
              n: '14',
              label: 'Base imponible',
              kind: 'input',
              queEs:
                'Sirve para **corregir ventas de periodos anteriores**: devoluciones de mercancía, descuentos posteriores, facturas rectificativas o **impagos** de clientes (créditos incobrables). Normalmente es un importe **negativo**.',
              deDonde: '**Facturas rectificativas** emitidas en el periodo (libro registro de facturas expedidas).',
              ejemplo: 'Un cliente devuelve mercancía que se le facturó por 3.000 €: casilla 14 = −3.000 €.',
              redFlags: [
                'Uso masivo de rectificativas por **impago** para recuperar IVA de clientes vinculados que nunca iban a pagar.',
                'Rectificativas que anulan casi todas las ventas de un trimestre anterior.',
              ],
              relacionadas: ['15', '40'],
            },
            {
              n: '15',
              label: 'Cuota',
              kind: 'input',
              queEs: 'El IVA correspondiente a la corrección de la casilla 14. Si la base es negativa, la cuota también lo es y **reduce** el IVA a pagar.',
              deDonde: 'Facturas rectificativas emitidas.',
              ejemplo: 'Devolución de 3.000 € al 21 % → casilla 15 = −630 €.',
              relacionadas: ['14', '27'],
            },
          ],
        },
        {
          concepto: 'Recargo de equivalencia',
          casillas: [
            {
              n: '16',
              label: 'Base imponible',
              kind: 'input',
              queEs:
                'El **recargo de equivalencia** es un régimen especial para **comerciantes minoristas** (personas físicas). Su proveedor les cobra un pequeño recargo extra junto con el IVA, y así el minorista no tiene que presentar el 303. Estas casillas las rellena el **proveedor** que vende a esos minoristas. Esta fila corresponde al recargo del 0,5 % (asociado al IVA del 4 %).',
              deDonde: 'Facturas emitidas a clientes en recargo de equivalencia.',
              ejemplo: 'Un mayorista vende fruta a una frutería por 2.000 €: casilla 16 = 2.000 €.',
              relacionadas: ['17', '18'],
            },
            { n: '17', label: 'Tipo %', kind: 'pct', rate: 0.5, queEs: 'Recargo del **0,5 %**, que acompaña al IVA superreducido.', deDonde: 'Fijado por ley.', ejemplo: '2.000 € × 0,5 % = 10 €.' },
            { n: '18', label: 'Cuota', kind: 'calc', queEs: 'Importe del recargo cobrado al minorista.', deDonde: 'Base 16 × tipo 17.', ejemplo: '10 € en el ejemplo anterior.', relacionadas: ['27'] },
          ],
        },
        {
          concepto: 'Recargo de equivalencia (1,4 %)',
          casillas: [
            { n: '19', label: 'Base imponible', kind: 'input', queEs: 'Ventas a minoristas en recargo de equivalencia que llevan IVA del **10 %**.', deDonde: 'Facturas emitidas a clientes en recargo.', ejemplo: 'Venta de productos al 10 % a una tienda por 1.000 €: casilla 19 = 1.000 €.', relacionadas: ['20', '21'] },
            { n: '20', label: 'Tipo %', kind: 'pct', rate: 1.4, queEs: 'Recargo del **1,4 %**.', deDonde: 'Fijado por ley.', ejemplo: '1.000 € × 1,4 % = 14 €.' },
            { n: '21', label: 'Cuota', kind: 'calc', queEs: 'Importe del recargo cobrado.', deDonde: 'Base 19 × tipo 20.', ejemplo: '14 €.', relacionadas: ['27'] },
          ],
        },
        {
          concepto: 'Recargo de equivalencia (5,2 %)',
          casillas: [
            {
              n: '22',
              label: 'Base imponible',
              kind: 'input',
              queEs: 'Ventas a minoristas en recargo de equivalencia que llevan IVA del **21 %**.',
              deDonde: 'Facturas emitidas a clientes en recargo.',
              ejemplo: 'Venta de ropa a una boutique por 5.000 €: casilla 22 = 5.000 €.',
              redFlags: [
                'Minoristas en recargo **no presentan 303**: un negocio en efectivo (bazares, tiendas) bajo este régimen es opaco para el control del IVA y se usa para introducir efectivo como "ventas".',
              ],
              relacionadas: ['23', '24'],
            },
            { n: '23', label: 'Tipo %', kind: 'pct', rate: 5.2, queEs: 'Recargo del **5,2 %**.', deDonde: 'Fijado por ley.', ejemplo: '5.000 € × 5,2 % = 260 €.' },
            { n: '24', label: 'Cuota', kind: 'calc', queEs: 'Importe del recargo cobrado.', deDonde: 'Base 22 × tipo 23.', ejemplo: '260 €.', relacionadas: ['27'] },
          ],
        },
        {
          concepto: 'Modificación de bases y cuotas del recargo de equivalencia',
          casillas: [
            { n: '25', label: 'Base imponible', kind: 'input', queEs: 'Correcciones (devoluciones, descuentos, impagos) de ventas anteriores a clientes en recargo de equivalencia.', deDonde: 'Facturas rectificativas emitidas a minoristas.', ejemplo: 'Devolución de 500 €: casilla 25 = −500 €.', relacionadas: ['26'] },
            { n: '26', label: 'Cuota', kind: 'input', queEs: 'Recargo correspondiente a las correcciones de la casilla 25.', deDonde: 'Facturas rectificativas.', ejemplo: '−500 € × 5,2 % = −26 €.', relacionadas: ['25', '27'] },
          ],
        },
        {
          concepto: 'Total cuota devengada',
          casillas: [
            {
              n: '27',
              label: 'Total cuota devengada',
              kind: 'calc',
              queEs:
                'Es la **suma de todo el IVA devengado**: el IVA de las ventas, el autorrepercutido por compras intracomunitarias e ISP, las correcciones y el recargo de equivalencia. Es, en resumen, **todo lo que la empresa "debe" a Hacienda** antes de restar lo que ella ha pagado.',
              deDonde: 'Suma automática: 03 + 06 + 09 + 11 + 13 + 15 + 18 + 21 + 24 + 26.',
              ejemplo: 'Si la cuota del 21 % es 12.600 € y la de compras UE es 4.200 €, el total devengado es 16.800 €.',
              redFlags: ['Debe cuadrar con el saldo acumulado de la cuenta **477** en contabilidad. Diferencias importantes indican ventas no declaradas o contabilidad manipulada.'],
              relacionadas: ['45', '46'],
            },
          ],
        },
      ],
    },
    {
      id: 'deducible',
      title: 'IVA deducible (lo que la empresa ha pagado)',
      intro:
        'Aquí la empresa declara el IVA que **ha pagado a sus proveedores** y que la ley le permite **restar** del IVA cobrado. Es el bloque favorito del fraude: **cada factura falsa de compra genera un IVA deducible ficticio**.',
      filas: [
        {
          concepto: 'Por cuotas soportadas en operaciones interiores corrientes',
          casillas: [
            {
              n: '28',
              label: 'Base',
              kind: 'input',
              queEs:
                'Importe sin IVA de las **compras y gastos habituales** hechos a proveedores **españoles**: mercancías, suministros, alquiler del local, asesoría, combustible… Se llaman "corrientes" porque se consumen en el día a día (no son inversiones duraderas).',
              deDonde: '**Libro registro de facturas recibidas**. En contabilidad, cargos en cuentas del grupo **60** (compras) y **62** (servicios exteriores).',
              ejemplo: 'Una tienda compra género a un mayorista por 30.000 € + IVA: casilla 28 = 30.000 €.',
              redFlags: [
                'Compras a proveedores **sin estructura real** (sin empleados, sin almacén, administradores testaferros): posibles **facturas falsas** para generar IVA deducible y sacar dinero de la empresa.',
                'Gastos que no tienen relación con la actividad (relojes de lujo, viajes personales, vehículos de alta gama).',
              ],
              relacionadas: ['29', '347'],
            },
            {
              n: '29',
              label: 'Cuota',
              kind: 'input',
              queEs: 'El **IVA soportado** en esas compras corrientes que la empresa se deduce. Se escribe a mano porque las compras pueden tener tipos distintos (4 %, 10 %, 21 %).',
              deDonde: 'Suma del IVA de las facturas recibidas. En contabilidad, cargos en la cuenta **472 (H.P. IVA soportado)**.',
              ejemplo: '30.000 € al 21 % → casilla 29 = 6.300 €.',
              redFlags: ['Cuota que no es coherente con la base de la casilla 28 (por ejemplo, un IVA medio del 21 % cuando la empresa compra productos al 4 %).'],
              relacionadas: ['28', '45'],
            },
          ],
        },
        {
          concepto: 'Por cuotas soportadas en operaciones interiores con bienes de inversión',
          casillas: [
            {
              n: '30',
              label: 'Base',
              kind: 'input',
              queEs:
                'Compras a proveedores españoles de **bienes duraderos** que la empresa usará durante años (maquinaria, vehículos, inmuebles, equipos informáticos de más de 3.005,06 €). Se separan porque su deducción puede regularizarse durante varios años.',
              deDonde: 'Facturas recibidas de bienes de inversión. En contabilidad, cargos en el **grupo 21** (inmovilizado material).',
              ejemplo: 'La empresa compra una furgoneta por 25.000 € + IVA: casilla 30 = 25.000 €.',
              redFlags: [
                'Compra de **inmuebles o vehículos de lujo** por sociedades sin actividad real, con petición de devolución del IVA.',
                'Bienes de inversión que luego no aparecen en el balance (grupo 21).',
              ],
              relacionadas: ['31', '43'],
            },
            { n: '31', label: 'Cuota', kind: 'input', queEs: 'IVA soportado en la compra de bienes de inversión en España.', deDonde: 'Facturas recibidas de bienes de inversión; cuenta 472.', ejemplo: '25.000 € al 21 % → 5.250 €.', relacionadas: ['30', '45'] },
          ],
        },
        {
          concepto: 'Por cuotas soportadas en las importaciones de bienes corrientes',
          casillas: [
            {
              n: '32',
              label: 'Base',
              kind: 'input',
              queEs: 'Importe de las mercancías corrientes **importadas de fuera de la UE** (China, EE. UU., Reino Unido…). En las importaciones el IVA lo cobra la **Aduana**, no el proveedor.',
              deDonde: 'El **DUA** (Documento Único Administrativo) de importación emitido por la Aduana.',
              ejemplo: 'Una empresa importa textil de China por 15.000 €: casilla 32 = 15.000 €.',
              redFlags: ['Importaciones **infravaloradas** en aduana (precio declarado muy por debajo del de mercado): técnica de blanqueo basado en el comercio (TBML).'],
              relacionadas: ['33', '77'],
            },
            { n: '33', label: 'Cuota', kind: 'input', queEs: 'IVA pagado (o diferido) en Aduana por esas importaciones.', deDonde: 'DUA de importación.', ejemplo: '15.000 € al 21 % → 3.150 €.', relacionadas: ['32', '45'] },
          ],
        },
        {
          concepto: 'Por cuotas soportadas en las importaciones de bienes de inversión',
          casillas: [
            { n: '34', label: 'Base', kind: 'input', queEs: 'Importación de **bienes duraderos** (maquinaria, equipos) desde fuera de la UE.', deDonde: 'DUA de importación.', ejemplo: 'Importación de una máquina desde Japón por 40.000 €: casilla 34 = 40.000 €.', relacionadas: ['35'] },
            { n: '35', label: 'Cuota', kind: 'input', queEs: 'IVA pagado en Aduana por esos bienes de inversión.', deDonde: 'DUA de importación.', ejemplo: '40.000 € al 21 % → 8.400 €.', relacionadas: ['34', '45'] },
          ],
        },
        {
          concepto: 'En adquisiciones intracomunitarias de bienes corrientes y servicios',
          casillas: [
            {
              n: '36',
              label: 'Base',
              kind: 'input',
              queEs: 'Las compras a la UE que se autorrepercutieron en la casilla 10 aparecen aquí de nuevo para **deducirse** el IVA (si son bienes o servicios corrientes).',
              deDonde: 'Facturas de proveedores comunitarios.',
              ejemplo: 'Compra de mercancía a Francia por 20.000 € → 10 = 20.000 € y 36 = 20.000 €.',
              redFlags: ['Si la 36 + 38 no cuadra con la 10, hay que preguntar por qué.'],
              relacionadas: ['10', '37'],
            },
            { n: '37', label: 'Cuota', kind: 'input', queEs: 'IVA deducible de compras intracomunitarias corrientes. Normalmente igual a lo autorrepercutido en la 11.', deDonde: 'Cálculo sobre la base 36.', ejemplo: '20.000 € al 21 % → 4.200 €.', relacionadas: ['11', '36', '45'] },
          ],
        },
        {
          concepto: 'En adquisiciones intracomunitarias de bienes de inversión',
          casillas: [
            { n: '38', label: 'Base', kind: 'input', queEs: 'Compras de **bienes de inversión** a proveedores de otros países de la UE.', deDonde: 'Facturas de proveedores comunitarios.', ejemplo: 'Un camión comprado en Alemania por 60.000 €: casilla 38 = 60.000 €.', redFlags: ['Compra de **vehículos de alta gama** en otros países de la UE a nombre de sociedades instrumentales.'], relacionadas: ['10', '39'] },
            { n: '39', label: 'Cuota', kind: 'input', queEs: 'IVA deducible de esas compras intracomunitarias de inversión.', deDonde: 'Cálculo sobre la base 38.', ejemplo: '60.000 € al 21 % → 12.600 €.', relacionadas: ['11', '38', '45'] },
          ],
        },
        {
          concepto: 'Rectificación de deducciones',
          casillas: [
            { n: '40', label: 'Base', kind: 'input', queEs: 'Corrección de compras de periodos anteriores: **devoluciones a proveedores**, descuentos recibidos o facturas rectificativas que **reciben** la empresa. Suele ser negativo.', deDonde: 'Facturas rectificativas recibidas.', ejemplo: 'La empresa devuelve género por 2.000 €: casilla 40 = −2.000 €.', relacionadas: ['41', '14'] },
            { n: '41', label: 'Cuota', kind: 'input', queEs: 'IVA de esas correcciones. Si es negativo, reduce el IVA deducible.', deDonde: 'Facturas rectificativas recibidas.', ejemplo: '−2.000 € al 21 % → −420 €.', relacionadas: ['40', '45'] },
          ],
        },
        {
          concepto: 'Otros ajustes',
          casillas: [
            { n: '42', label: 'Compensaciones Régimen Especial A.G. y P.', kind: 'input', queEs: 'Cuando una empresa compra productos a **agricultores, ganaderos o pescadores** en régimen especial, les paga una **compensación** (del 12 % o 10,5 %) en lugar de IVA, y puede deducirla aquí.', deDonde: 'Recibos emitidos a agricultores en régimen especial (REAGP).', ejemplo: 'Una cooperativa paga 1.200 € de compensación a agricultores: casilla 42 = 1.200 €.', redFlags: ['Recibos a "agricultores" que no tienen explotación real.'], relacionadas: ['45'] },
            { n: '43', label: 'Regularización bienes de inversión', kind: 'input', queEs: 'Ajuste del IVA deducido por bienes de inversión cuando cambia el porcentaje en que se usan para actividades con derecho a deducción (por ejemplo, si un inmueble pasa a alquilarse como vivienda, que está exento). Se hace en el **último periodo del año**.', deDonde: 'Cálculos de regularización de la prorrata de años anteriores.', ejemplo: 'Ajuste de −1.000 € por un local que pasa a uso exento.', relacionadas: ['30', '45'] },
            { n: '44', label: 'Regularización por aplicación del porcentaje definitivo de prorrata', kind: 'input', queEs: 'Las empresas que hacen a la vez operaciones con IVA y exentas solo pueden deducirse una **parte** del IVA (la **prorrata**). Durante el año usan un porcentaje provisional y en el último periodo lo ajustan al definitivo aquí.', deDonde: 'Cálculo de la prorrata definitiva del año.', ejemplo: 'Prorrata provisional 80 %, definitiva 75 % → ajuste negativo.', relacionadas: ['45'] },
            {
              n: '45',
              label: 'Total a deducir',
              kind: 'calc',
              queEs: 'Es la **suma de todo el IVA que la empresa se puede restar**. Es la cifra que, si está inflada con facturas falsas, reduce artificialmente lo que se paga a Hacienda o genera devoluciones.',
              deDonde: 'Suma automática: 29 + 31 + 33 + 35 + 37 + 39 + 41 + 42 + 43 + 44.',
              ejemplo: '6.300 (29) + 4.200 (37) = 10.500 € a deducir.',
              redFlags: ['Debe cuadrar con los cargos en la cuenta **472** de la contabilidad.', 'Un deducible sistemáticamente superior al devengado (casilla 46 negativa trimestre tras trimestre) sin inversiones que lo justifiquen.'],
              relacionadas: ['27', '46'],
            },
          ],
        },
        {
          concepto: 'Resultado régimen general',
          casillas: [
            {
              n: '46',
              label: 'Resultado régimen general',
              kind: 'calc',
              queEs: 'Es la diferencia entre lo cobrado y lo pagado: **IVA devengado (27) − IVA deducible (45)**. Si es positivo, la empresa debe dinero a Hacienda; si es negativo, Hacienda le debe a ella.',
              deDonde: 'Cálculo automático: 27 − 45.',
              ejemplo: '16.800 − 10.500 = 6.300 € a favor de Hacienda.',
              relacionadas: ['27', '45', '64'],
            },
          ],
        },
      ],
    },
    {
      id: 'adicional',
      title: 'Información adicional',
      intro: 'Casillas informativas: no cambian el resultado, pero dicen a Hacienda qué operaciones **sin IVA español** ha hecho la empresa. Son oro para cruzar datos.',
      filas: [
        {
          concepto: 'Operaciones sin IVA español',
          casillas: [
            {
              n: '59',
              label: 'Entregas intracomunitarias de bienes y servicios',
              kind: 'input',
              queEs: 'Ventas a **empresas** de otros países de la UE. Van **sin IVA** (están exentas) porque el IVA lo pagará el comprador en su país. Para que sea válido, el cliente debe tener NIF-IVA en el **VIES**.',
              deDonde: 'Facturas emitidas a clientes comunitarios. Deben coincidir con el **modelo 349** (clave E).',
              ejemplo: 'Venta de aceite a un distribuidor italiano por 35.000 €: casilla 59 = 35.000 €.',
              redFlags: [
                '**Entregas intracomunitarias ficticias**: la mercancía nunca sale de España pero se factura sin IVA a una sociedad comunitaria (a menudo inexistente). Es la **salida** del fraude carrusel.',
                'Diferencias entre la casilla 59 y el 349.',
              ],
              relacionadas: ['349', '390'],
            },
            {
              n: '60',
              label: 'Exportaciones y operaciones asimiladas',
              kind: 'input',
              queEs: 'Ventas a clientes **fuera de la UE**. Van sin IVA porque la mercancía sale del territorio aduanero; se justifica con el DUA de exportación.',
              deDonde: 'Facturas de exportación y DUA.',
              ejemplo: 'Venta de maquinaria a Marruecos por 80.000 €: casilla 60 = 80.000 €.',
              redFlags: ['Exportaciones **sobrevaloradas** a países de riesgo: técnica de blanqueo basado en el comercio (TBML) para justificar entradas de fondos.'],
              relacionadas: ['390'],
            },
            {
              n: '120',
              label: 'Operaciones no sujetas por reglas de localización',
              kind: 'input',
              queEs: 'Servicios u operaciones que, según las reglas del IVA, se entienden hechos **en otro país** y por eso no llevan IVA español (por ejemplo, servicios de consultoría a una empresa extranjera).',
              deDonde: 'Facturas emitidas con la mención "operación no sujeta" o "inversión del sujeto pasivo" en destino.',
              ejemplo: 'Consultoría a una empresa de EE. UU. por 10.000 €: casilla 120 = 10.000 €.',
              redFlags: ['Facturación de **servicios intangibles** (consultoría, asesoría, "management fees") a sociedades en paraísos fiscales: difícil de verificar y muy usada para mover fondos.'],
              relacionadas: ['390'],
            },
            {
              n: '122',
              label: 'Operaciones sujetas con inversión del sujeto pasivo',
              kind: 'input',
              queEs: 'Ventas en España en las que, por ley, **el cliente** debe declarar el IVA (ISP). El vendedor factura sin IVA y lo informa aquí.',
              deDonde: 'Facturas emitidas con la mención "inversión del sujeto pasivo".',
              ejemplo: 'Una chatarrería vende 12.000 € de metal a una fundición: casilla 122 = 12.000 €.',
              relacionadas: ['12'],
            },
          ],
        },
      ],
    },
    {
      id: 'resultado',
      title: 'Resultado de la liquidación',
      intro: 'El último paso: ajustar el resultado y decidir si la empresa **paga, compensa o pide devolución**.',
      filas: [
        {
          concepto: 'Cálculo final',
          casillas: [
            { n: '64', label: 'Suma de resultados', kind: 'calc', queEs: 'Suma de los resultados de todos los regímenes que aplica la empresa. Para la mayoría de sociedades es igual a la casilla 46 (régimen general).', deDonde: 'Automático: 46 (+ resultados de otros regímenes, si los hay).', ejemplo: '6.300 €.', relacionadas: ['46', '66'] },
            { n: '65', label: '% Atribuible a la Administración del Estado', kind: 'pct', rate: 100, queEs: 'Solo importa para empresas que operan también en el **País Vasco o Navarra** (que tienen Haciendas propias). Indica qué parte del IVA corresponde al Estado. Para el resto, es el **100 %**.', deDonde: 'Proporción del volumen de operaciones en territorio común.', ejemplo: 'Empresa solo en Madrid → 100 %.' },
            { n: '66', label: 'Atribuible a la Administración del Estado', kind: 'calc', queEs: 'Parte del resultado que corresponde a la AEAT: casilla 64 × casilla 65.', deDonde: 'Automático.', ejemplo: '6.300 × 100 % = 6.300 €.', relacionadas: ['64', '65', '69'] },
            { n: '77', label: 'IVA a la importación liquidado por la Aduana pendiente de ingreso', kind: 'input', queEs: 'Empresas acogidas al **diferimiento del IVA a la importación** no pagan en Aduana: ingresan ese IVA aquí, en el 303. Se suma al resultado.', deDonde: 'DUA de importación con IVA diferido.', ejemplo: 'IVA de importación diferido de 3.150 €: casilla 77 = 3.150 €.', relacionadas: ['33', '69'] },
            {
              n: '110',
              label: 'Cuotas a compensar pendientes de periodos anteriores',
              kind: 'input',
              queEs: 'Si en trimestres anteriores la empresa tuvo **saldo a su favor** y no pidió devolución, lo "guardó" para descontarlo después. Aquí indica cuánto tiene acumulado.',
              deDonde: 'Casilla 87 del 303 del periodo anterior.',
              ejemplo: 'El trimestre pasado salió −2.000 € y se dejó a compensar: casilla 110 = 2.000 €.',
              redFlags: ['Saldos a compensar que crecen sin parar y se solicitan de golpe en el 4T (devolución elevada).'],
              relacionadas: ['78', '87'],
            },
            { n: '78', label: 'Cuotas a compensar de periodos previos aplicadas en este periodo', kind: 'input', queEs: 'De lo que la empresa tenía guardado (casilla 110), cuánto **usa este trimestre** para reducir lo que paga.', deDonde: 'Decisión del contribuyente, con el límite del saldo disponible y del resultado.', ejemplo: 'Tiene 2.000 € a compensar y este trimestre debe 6.300 €: aplica 2.000 € en la casilla 78.', relacionadas: ['110', '87', '69'] },
            { n: '87', label: 'Cuotas a compensar pendientes para periodos posteriores', kind: 'calc', queEs: 'Lo que **sigue guardado** para el futuro después de este trimestre: 110 − 78.', deDonde: 'Automático.', ejemplo: '2.000 − 2.000 = 0 €.', relacionadas: ['110', '78'] },
            { n: '68', label: 'Resultado de la regularización anual', kind: 'input', queEs: 'Solo para empresas que tributan **a la vez** ante el Estado y una Diputación Foral (País Vasco/Navarra), en el último periodo del año. Para la mayoría, se deja vacía.', deDonde: 'Cálculo de la proporción definitiva del año.', ejemplo: 'Normalmente 0.', relacionadas: ['69'] },
            { n: '69', label: 'Resultado', kind: 'calc', queEs: 'El resultado ya ajustado: **66 + 77 − 78 + 68**.', deDonde: 'Automático.', ejemplo: '6.300 + 0 − 2.000 + 0 = 4.300 €.', relacionadas: ['66', '77', '78', '68', '71'] },
            { n: '70', label: 'A deducir (solo autoliquidación complementaria)', kind: 'input', queEs: 'Si la empresa presenta una **complementaria** (porque se equivocó y debe pagar más), aquí indica lo que ya ingresó en la declaración original, para no pagarlo dos veces.', deDonde: 'Resultado de la autoliquidación anterior del mismo periodo.', ejemplo: 'Ya pagó 4.300 € y ahora el resultado es 5.000 €: casilla 70 = 4.300 €.', redFlags: ['Complementarias frecuentes tras requerimientos de la AEAT.'], relacionadas: ['71'] },
            {
              n: '71',
              label: 'Resultado de la liquidación',
              kind: 'calc',
              queEs: 'La cifra final: **69 − 70**. Si es **positiva**, la empresa debe **ingresar** esa cantidad. Si es **negativa**, puede **compensarla** en trimestres siguientes o, en el último periodo del año (o si está en el REDEME), **pedir la devolución**.',
              deDonde: 'Automático.',
              ejemplo: '4.300 − 0 = 4.300 € a ingresar.',
              redFlags: [
                'Sociedades que piden **devoluciones** de forma recurrente: comprueba que los proveedores existen y han ingresado su IVA.',
                'Resultado "a ingresar" que se presenta **sin ingreso** (reconocimiento de deuda) de forma sistemática antes de que la sociedad desaparezca.',
              ],
              relacionadas: ['69', '70', '390'],
            },
          ],
        },
      ],
    },
  ],
  resultado: { n: '71', label: 'Resultado de la liquidación', signo: true },
  ejemplo: {
    '01': 0, '04': 0, '07': 60000,
    '10': 20000, '11': 4200,
    '28': 30000, '29': 6300,
    '36': 20000, '37': 4200,
    '59': 35000,
    '110': 2000, '78': 2000,
  },
}

/** Motor de cálculo del 303 */
export function compute303(v: Record<string, number>): Record<string, number> {
  const g = (k: string) => v[k] ?? 0
  const r: Record<string, number> = { ...v }
  const pairs: [string, string, string][] = [
    ['01', '02', '03'], ['04', '05', '06'], ['07', '08', '09'],
    ['16', '17', '18'], ['19', '20', '21'], ['22', '23', '24'],
  ]
  const rates: Record<string, number> = { '02': 4, '05': 10, '08': 21, '17': 0.5, '20': 1.4, '23': 5.2, '65': 100 }
  for (const [k, val] of Object.entries(rates)) r[k] = val
  const round = (x: number) => Math.round(x * 100) / 100
  for (const [b, t, c] of pairs) r[c] = round(g(b) * r[t] / 100)
  const gr = (k: string) => r[k] ?? 0
  r['27'] = round(['03', '06', '09', '11', '13', '15', '18', '21', '24', '26'].reduce((s, k) => s + gr(k), 0))
  r['45'] = round(['29', '31', '33', '35', '37', '39', '41', '42', '43', '44'].reduce((s, k) => s + gr(k), 0))
  r['46'] = round(gr('27') - gr('45'))
  r['64'] = gr('46')
  r['66'] = round(gr('64') * gr('65') / 100)
  r['87'] = round(gr('110') - gr('78'))
  r['69'] = round(gr('66') + gr('77') - gr('78') + gr('68'))
  r['71'] = round(gr('69') - gr('70'))
  return r
}
