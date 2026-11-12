import type { Module } from '../types'

export const curso2Modulos3a10: Module[] = [
  {
    id: 'm3',
    title: 'Sujetos pasivos, devengo e inversión del sujeto pasivo',
    description: 'Quién debe ingresar el IVA y cuándo.',
    lessons: [
      {
        id: 'c2-m3-l1',
        title: '¿Quién paga, cuándo y por qué a veces "se da la vuelta"?',
        minutes: 8,
        summary: 'Sujeto pasivo, devengo y el mecanismo de inversión del sujeto pasivo (ISP).',
        blocks: [
          {
            type: 'p',
            text: 'El **sujeto pasivo** es quien está obligado a declarar e ingresar el IVA en Hacienda. Por regla general es el **vendedor**: el empresario o profesional que entrega el bien o presta el servicio. Él cobra el IVA a su cliente y lo ingresa en su 303.',
          },
          {
            type: 'p',
            text: 'El **devengo** es el **momento** en que nace la obligación. Importante: **no es cuando se cobra**, sino cuando se **entrega** el bien o se **presta** el servicio. Si el cliente paga por adelantado, el IVA se devenga en ese momento por la parte anticipada.',
          },
          {
            type: 'callout',
            variant: 'analogia',
            title: 'El devengo, en una frase',
            text: 'Vendes un coche el 28 de marzo y te lo pagan el 15 de abril: el IVA va al **primer trimestre** (cuando entregaste el coche), aunque el dinero llegue en el segundo. (Salvo que estés en el régimen especial de **criterio de caja**, que veremos en el módulo 7.)',
          },
          { type: 'h', text: 'Inversión del sujeto pasivo (ISP): cuando paga el comprador' },
          {
            type: 'p',
            text: 'En algunos casos la ley **da la vuelta** a la obligación: el vendedor factura **sin IVA** y es el **comprador** quien se autorrepercute el IVA y, a la vez, se lo deduce. Resultado para Hacienda: no se mueve dinero, y por tanto **no hay IVA que el vendedor pueda quedarse y desaparecer**. Por eso la ISP es, ante todo, una **medida antifraude**.',
          },
          {
            type: 'table',
            caption: 'Principales supuestos de ISP (art. 84.Uno.2º Ley 37/1992). Contrasta con la redacción vigente.',
            headers: ['Supuesto', 'Por qué existe'],
            rows: [
              ['Servicios y bienes de empresarios **no establecidos** en España', 'Hacienda no puede controlar a un vendedor extranjero'],
              ['**Oro** de inversión y oro sin elaborar', 'Sector históricamente usado en fraude carrusel'],
              ['**Chatarra**, desperdicios y materiales de recuperación', 'Mucho efectivo y proveedores sin estructura'],
              ['**Ejecuciones de obra** de urbanización o rehabilitación (subcontratas)', 'Cadenas de subcontratistas que desaparecían'],
              ['Entregas de **inmuebles** con renuncia a la exención o en ejecución de garantía', 'Grandes cuotas concentradas en una operación'],
              ['**Teléfonos móviles, consolas, portátiles y tabletas** a revendedores o por importe elevado', 'Producto ligero, caro y fácil de mover entre países'],
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: '¿Qué te dice esto en una investigación?',
            text: 'Cuando la ley aplica la ISP a un sector, es porque allí **hubo fraude masivo**. Las organizaciones suelen **migrar** a productos o sectores cercanos donde aún no se aplica (por ejemplo, de móviles a componentes o perfumes). Además, comprueba que la ISP **se aplicó realmente**: facturas con IVA en operaciones que deberían ir con ISP son una oportunidad para cobrar un IVA que no se ingresará.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Facturas con IVA en sectores sujetos a ISP; empresas que cambian bruscamente de producto hacia sectores de alto valor y poco peso; y **anticipos** cobrados (devengan IVA) por entregas que nunca se producen.',
          },
        ],
        quiz: [
          {
            q: 'Un servicio se presta el 30 de junio y se cobra el 20 de julio. Régimen general. ¿En qué trimestre se declara el IVA?',
            options: ['Segundo trimestre', 'Tercer trimestre', 'Cuando quiera la empresa', 'En el resumen anual'],
            correct: 0,
            explanation: 'El devengo se produce con la prestación del servicio, no con el cobro.',
          },
          {
            q: 'En la inversión del sujeto pasivo, ¿quién declara el IVA?',
            options: ['El vendedor', 'El comprador', 'El transportista', 'Nadie'],
            correct: 1,
            explanation: 'El comprador se autorrepercute el IVA (y normalmente se lo deduce a la vez).',
          },
          {
            q: '¿Por qué la ISP ayuda contra el fraude?',
            options: ['Porque sube el tipo de IVA', 'Porque el vendedor no cobra IVA y, por tanto, no puede quedárselo y desaparecer', 'Porque obliga a pagar en efectivo', 'Porque elimina las facturas'],
            correct: 1,
            explanation: 'Sin IVA cobrado por el vendedor, desaparece el incentivo del "missing trader".',
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'Operaciones intracomunitarias y el ROI',
    description: 'Comercio dentro de la UE y el registro de operadores.',
    lessons: [
      {
        id: 'c2-m4-l1',
        title: 'Comprar y vender en la UE sin IVA (y por qué eso es peligroso)',
        minutes: 9,
        summary: 'Entregas y adquisiciones intracomunitarias, el ROI, el VIES y los requisitos de la exención.',
        blocks: [
          {
            type: 'p',
            text: 'Dentro de la Unión Europea, cuando una empresa vende mercancía a **otra empresa** de otro país, la venta va **sin IVA** (exenta). El IVA se paga en el país de **destino**: el comprador se lo autorrepercute en su declaración (en España, casillas 10/11 del 303).',
          },
          {
            type: 'list',
            items: [
              '**Entrega intracomunitaria**: venta de España a otro país de la UE. Exenta. Casilla 59 del 303 y clave **E** del 349.',
              '**Adquisición intracomunitaria**: compra de otro país de la UE a España. El comprador se autorrepercute el IVA. Casillas 10/11 del 303 y clave **A** del 349.',
            ],
          },
          { type: 'h', text: 'Requisitos para vender sin IVA' },
          {
            type: 'list',
            ordered: true,
            items: [
              'La mercancía **sale físicamente** de España hacia otro Estado miembro (y se puede probar: CMR, contrato de transporte, seguro, factura del transportista).',
              'El comprador es un empresario con **NIF-IVA válido** en otro Estado miembro, comprobable en el **VIES**.',
              'La operación se declara en el **modelo 349** (desde 2020 es requisito para aplicar la exención).',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'El ROI y el VIES',
            text: 'Para operar sin IVA con la UE, una empresa española debe estar dada de alta en el **ROI** (Registro de Operadores Intracomunitarios) mediante el modelo **036**. La AEAT puede denegar o revocar el alta si detecta riesgo. Al darse de alta, su NIF aparece como válido en el **VIES**, la base de datos europea que cualquiera puede consultar.',
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: '¿Qué te dice esto en una investigación?',
            text: 'La ausencia de IVA en la frontera interior es el **corazón del fraude carrusel**. Comprueba: ¿la mercancía salió realmente? ¿El cliente comunitario existe y tiene estructura? ¿Su NIF-IVA estaba activo en la **fecha** de la operación? ¿Cuadran el 349 español y la declaración recapitulativa del otro país (vía cooperación administrativa / Eurofisc)?',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Altas en el ROI de sociedades recién creadas que de inmediato realizan grandes adquisiciones; clientes comunitarios con NIF dado de baja poco después; **transportes no acreditados** o CMR sin firmar; facturas a clientes comunitarios con **domicilios de entrega en España**; y diferencias entre lo declarado en el 349 y en el país del socio comercial.',
          },
        ],
        quiz: [
          {
            q: 'Una empresa española vende a una empresa francesa con NIF-IVA válido y transporta la mercancía a Lyon. ¿Lleva IVA español?',
            options: ['Sí, 21 %', 'No, es una entrega intracomunitaria exenta', 'Sí, 10 %', 'Depende del pago'],
            correct: 1,
            explanation: 'Cumple los requisitos de la entrega intracomunitaria exenta: el IVA lo pagará el comprador en Francia.',
          },
          {
            q: '¿Qué herramienta pública permite comprobar si un NIF-IVA europeo es válido?',
            options: ['El BORME', 'El VIES', 'El Catastro', 'El SII'],
            correct: 1,
            explanation: 'VIES (VAT Information Exchange System) es la base de datos europea de NIF-IVA.',
          },
          {
            q: 'La factura de una "entrega intracomunitaria" indica un almacén de entrega en Zaragoza. ¿Qué indica?',
            options: ['Nada', 'Que la mercancía quizá no salió de España: la exención podría ser improcedente', 'Que es una exportación', 'Que es una importación'],
            correct: 1,
            explanation: 'Si la mercancía no sale de España no hay entrega intracomunitaria; la operación debería haber llevado IVA.',
          },
        ],
      },
    ],
  },
  {
    id: 'm5',
    title: 'Importaciones y exportaciones',
    description: 'El IVA en la frontera.',
    lessons: [
      {
        id: 'c2-m5-l1',
        title: 'El IVA en la aduana y el blanqueo basado en el comercio',
        minutes: 8,
        summary: 'Cómo tributan las operaciones con países de fuera de la UE y cómo se manipulan.',
        blocks: [
          {
            type: 'p',
            text: 'Con países **de fuera de la UE** (China, EE. UU., Marruecos, Reino Unido…) las reglas cambian: aparece la **Aduana** y un documento clave, el **DUA** (Documento Único Administrativo).',
          },
          {
            type: 'table',
            headers: ['Operación', 'Cómo tributa', 'Dónde se ve'],
            rows: [
              ['**Importación**', 'El IVA lo liquida la Aduana al entrar la mercancía (o se difiere al 303 si la empresa está acogida)', 'DUA de importación; 303 casillas 32-35 y 77'],
              ['**Exportación**', 'Exenta: la mercancía sale de la UE y se acredita con el DUA de exportación', 'DUA de exportación; 303 casilla 60'],
              ['**Ventas a viajeros** (tax free)', 'El turista extracomunitario recupera el IVA al salir con el documento electrónico DIVA', 'Sistema DIVA'],
            ],
          },
          {
            type: 'callout',
            variant: 'analogia',
            title: 'Exportar sin IVA: el principio de "tributación en destino"',
            text: 'El IVA grava el **consumo**. Si el bien se va a consumir fuera, no debe soportar IVA español. Por eso las exportaciones van sin IVA y las importaciones pagan el IVA español en la frontera.',
          },
          { type: 'h', text: 'El blanqueo basado en el comercio (TBML)' },
          {
            type: 'p',
            text: 'El **Trade-Based Money Laundering** utiliza operaciones de comercio exterior aparentemente normales para mover valor entre países. El GAFI lo considera uno de los métodos de blanqueo más importantes.',
          },
          {
            type: 'table',
            headers: ['Técnica', 'Cómo funciona'],
            rows: [
              ['**Sobrefacturación** de exportaciones', 'Se exporta algo barato facturándolo caro: el importador extranjero envía mucho dinero, que entra en España como cobro legítimo.'],
              ['**Infrafacturación** de importaciones', 'Se declara un valor bajo en aduana y la diferencia se paga por otras vías: se mueve valor sin rastro bancario (y se reduce el IVA y los aranceles).'],
              ['**Facturación múltiple**', 'La misma mercancía se factura varias veces para justificar varios pagos.'],
              ['**Envíos fantasma**', 'Se factura y se paga una exportación que nunca existió.'],
            ],
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Precios unitarios muy alejados del mercado; mercancías que no encajan con la actividad de la empresa; pagos de **terceros** ajenos a la operación o desde países distintos al del cliente; rutas de transporte ilógicas; descripciones vagas en el DUA ("material diverso"); y **tax free** masivo a nombre de pocos pasaportes.',
          },
        ],
        quiz: [
          {
            q: 'Una empresa exporta tornillos a Panamá a 50 € la unidad cuando su precio de mercado es 0,20 €. ¿Qué técnica sospechas?',
            options: ['Infrafacturación', 'Sobrefacturación de exportaciones', 'Recargo de equivalencia', 'ISP'],
            correct: 1,
            explanation: 'Facturar muy por encima del valor permite justificar la entrada de grandes sumas como cobro de una exportación.',
          },
          {
            q: '¿Qué documento acredita una exportación?',
            options: ['El modelo 347', 'El DUA de exportación', 'El CMR', 'El modelo 036'],
            correct: 1,
            explanation: 'La salida de la mercancía del territorio aduanero de la UE se acredita con el DUA de exportación.',
          },
        ],
      },
    ],
  },
  {
    id: 'm6',
    title: 'Libros registro y SII',
    description: 'Dónde queda anotada cada factura.',
    lessons: [
      {
        id: 'c2-m6-l1',
        title: 'Facturas, libros registro y SII',
        minutes: 8,
        summary: 'Qué debe contener una factura, qué libros lleva una empresa y qué información recibe Hacienda en tiempo casi real.',
        blocks: [
          {
            type: 'p',
            text: 'Detrás de cada casilla del 303 hay **facturas**, y las facturas se anotan en **libros registro**. Si sabes dónde mirar, puedes reconstruir una trama factura a factura.',
          },
          { type: 'h', text: 'Requisitos de una factura completa' },
          {
            type: 'list',
            items: [
              'Número y, en su caso, **serie** (correlativa).',
              'Fecha de expedición (y de la operación si es distinta).',
              'Nombre o razón social, **NIF** y domicilio de emisor y destinatario.',
              'Descripción de la operación, **base imponible**, **tipo** y **cuota** de IVA.',
              'Menciones especiales cuando proceda: "exenta", "inversión del sujeto pasivo", "régimen especial de criterio de caja"…',
            ],
          },
          {
            type: 'table',
            caption: 'Libros registro de IVA',
            headers: ['Libro', 'Qué recoge', 'Alimenta'],
            rows: [
              ['Facturas **expedidas**', 'Todas las ventas facturadas', 'IVA devengado del 303 (casillas 01-27)'],
              ['Facturas **recibidas**', 'Todas las compras y gastos', 'IVA deducible del 303 (casillas 28-45)'],
              ['Bienes de **inversión**', 'Bienes duraderos y su regularización', 'Casilla 43'],
              ['Determinadas operaciones **intracomunitarias**', 'Envíos de bienes para trabajos, ventas en consigna…', 'Modelo 349'],
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'El SII: los libros, casi en directo',
            text: 'Las grandes empresas (facturación superior a 6 M€), las inscritas en el **REDEME** (devolución mensual) y los grupos de IVA llevan sus libros a través del **Suministro Inmediato de Información**: envían cada factura a la AEAT en un plazo de **4 días hábiles**. Además, la normativa de sistemas de facturación (**VeriFactu**) y la factura electrónica obligatoria entre empresas se están implantando de forma escalonada: comprueba el calendario vigente.',
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: '¿Qué te dice esto en una investigación?',
            text: 'Pide los **libros registro** (no solo el 303): ahí verás **a quién** se factura y **de quién** se recibe. Ordena las facturas por número y fecha y busca huecos, saltos o series paralelas. Si una de las partes está en el SII, la AEAT tendrá el detalle de cada factura con pocos días de diferencia.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta en las facturas',
            text: '**Numeración** con saltos o series duplicadas; facturas consecutivas a un mismo cliente (el emisor solo trabaja para él); **descripciones genéricas** ("servicios varios", "trabajos según presupuesto"); importes redondos; facturas emitidas en **fechas no laborables** en serie; y receptores que anotan facturas que el emisor no declara.',
          },
        ],
        quiz: [
          {
            q: 'El IVA deducible del 303 se obtiene del libro de…',
            options: ['Facturas expedidas', 'Facturas recibidas', 'Actas', 'Inventarios'],
            correct: 1,
            explanation: 'El IVA soportado deducible procede de las facturas recibidas de proveedores.',
          },
          {
            q: 'Un proveedor emite las facturas 101, 102, 103… 140, todas a la misma empresa durante un año. ¿Qué indica?',
            options: ['Que es un buen proveedor', 'Que solo factura a un cliente: posible emisor instrumental de facturas', 'Que tiene muchas sedes', 'Que está en el SII'],
            correct: 1,
            explanation: 'Un proveedor cuya numeración solo recoge un cliente puede existir únicamente para emitir facturas a ese cliente.',
          },
        ],
      },
    ],
  },
  {
    id: 'm7',
    title: 'Regímenes especiales',
    description: 'Recargo de equivalencia, REBU, criterio de caja, simplificado.',
    lessons: [
      {
        id: 'c2-m7-l1',
        title: 'Los regímenes especiales y sus puntos ciegos',
        minutes: 9,
        summary: 'Cómo funcionan los regímenes especiales del IVA y por qué algunos son atractivos para el fraude.',
        blocks: [
          {
            type: 'p',
            text: 'Además del régimen general, la Ley del IVA prevé **regímenes especiales** pensados para simplificar la vida a ciertos negocios. Cada simplificación crea, inevitablemente, **zonas con menos control**.',
          },
          {
            type: 'table',
            headers: ['Régimen', 'Quién', 'Cómo funciona', 'Punto ciego'],
            rows: [
              ['**Simplificado** (módulos)', 'Autónomos de ciertas actividades (bares, taxis, transporte…)', 'El IVA se calcula con parámetros fijos (superficie, personal…), no con las ventas reales', 'Puede emitir facturas sin que le cueste más IVA: el "facturero" clásico'],
              ['**Recargo de equivalencia**', 'Minoristas personas físicas', 'El proveedor cobra un recargo y el minorista no presenta 303', 'Las ventas al público no se controlan por el IVA'],
              ['**REBU**', 'Revendedores de bienes usados, arte, antigüedades, coches de segunda mano', 'Se tributa solo por el **margen** entre compra y venta', 'Manipular precios de compra; vehículos y arte como depósito de valor'],
              ['**Criterio de caja** (RECC)', 'Empresas con volumen ≤ 2 M€ que lo eligen', 'El IVA se devenga al **cobrar**, no al facturar (con límite temporal)', 'Facturas "pendientes de cobro" que retrasan el ingreso'],
              ['**Agricultura, ganadería y pesca** (REAGP)', 'Agricultores y ganaderos', 'No repercuten IVA: reciben una compensación del comprador', 'Recibos a "agricultores" sin explotación real'],
              ['**Oro de inversión**', 'Operaciones con oro de inversión', 'Exentas con posibilidad de renuncia e ISP', 'Sector de alto valor y anonimato'],
              ['**OSS / IOSS** (ventanilla única)', 'Ventas a distancia a consumidores de la UE', 'Se declara el IVA de varios países en una sola declaración', 'Comercio electrónico con plataformas y almacenes en terceros países'],
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'El "facturero" en módulos',
            text: 'Un autónomo en **estimación objetiva y régimen simplificado** paga el IVA según parámetros fijos. Si emite facturas falsas por 200.000 €, su IVA no cambia, pero su cliente se deduce 42.000 €. A cambio, cobra una comisión. Es una de las tramas más frecuentes en España (construcción, transporte, reformas).',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Proveedores en **módulos** que facturan importes muy por encima de su capacidad; concesionarios o anticuarios en **REBU** con compras a particulares en efectivo; minoristas en **recargo** que ingresan grandes cantidades de efectivo en el banco; y "agricultores" sin tierras que emiten recibos REAGP.',
          },
        ],
        quiz: [
          {
            q: '¿Por qué un autónomo en régimen simplificado puede emitir facturas falsas "sin coste fiscal" de IVA?',
            options: ['Porque su IVA se calcula con módulos fijos, no con sus facturas', 'Porque está exento', 'Porque no tiene NIF', 'Porque no presenta declaraciones'],
            correct: 0,
            explanation: 'Su cuota se fija por parámetros objetivos: facturar más no le obliga a ingresar más IVA.',
          },
          {
            q: 'En el REBU, el IVA se calcula sobre…',
            options: ['El precio de venta total', 'El margen entre compra y venta', 'El precio de compra', 'Nada: está exento'],
            correct: 1,
            explanation: 'El régimen de bienes usados grava solo el margen de beneficio del revendedor.',
          },
        ],
      },
    ],
  },
  {
    id: 'm8',
    title: 'El fraude carrusel',
    description: 'Diagrama interactivo de una trama paso a paso.',
    lessons: [
      {
        id: 'c2-m8-l1',
        title: 'Anatomía de un fraude carrusel',
        minutes: 12,
        summary: 'Recorre paso a paso una trama de fraude carrusel y aprende el papel de cada sociedad.',
        blocks: [
          {
            type: 'p',
            text: 'El **fraude carrusel** (o fraude del operador desaparecido, MTIC) es el fraude de IVA más grave de Europa: la Comisión Europea lo estima en **decenas de miles de millones de euros al año**. Aprovecha la combinación de dos reglas que ya conoces: las **compras intracomunitarias van sin IVA** y las **ventas interiores lo llevan**.',
          },
          {
            type: 'callout',
            variant: 'analogia',
            title: 'La idea en una frase',
            text: 'Una sociedad compra sin IVA en otro país de la UE, **vende en España cobrando IVA**, **no lo ingresa** y desaparece. Mientras, la mercancía sigue su camino hasta salir de nuevo de España sin IVA, y la última empresa **pide la devolución** del IVA que soportó. Hacienda devuelve un dinero que nunca cobró.',
          },
          { type: 'h', text: 'Recorre la trama' },
          { type: 'interactive', name: 'CarruselDiagram' },
          {
            type: 'table',
            caption: 'Los papeles de la trama',
            headers: ['Papel', 'Qué hace', 'Cómo suele ser'],
            rows: [
              ['**Proveedor UE** (conduit)', 'Vende sin IVA a la trucha', 'A menudo controlado por la organización; recibe la mercancía de vuelta'],
              ['**Trucha** (missing trader)', 'Compra sin IVA, vende con IVA, no ingresa y desaparece', 'Sociedad reciente, testaferro, sin estructura, vida de pocos meses'],
              ['**Pantalla** (buffer)', 'Intermedia para alejar a la trucha del broker', 'Sí presenta sus declaraciones, con márgenes mínimos'],
              ['**Broker**', 'Vende fuera de España sin IVA y pide la devolución', 'Empresa aparentemente sólida; a veces, consciente del fraude'],
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Cómo se detecta',
            text: '1) **Precio de venta de la trucha inferior al de compra** (puede vender barato porque se queda el IVA). 2) **Cadenas cortas y rápidas** de facturas por el mismo producto e importe. 3) **Pagos circulares**: el dinero vuelve al punto de partida en pocos días, a menudo a través de las mismas entidades o de cuentas en el extranjero. 4) Productos de **alto valor y poco volumen** (móviles, chips, perfumes, metales, derechos de emisión, energía). 5) Cruce **303 / 349 / VIES** entre países.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Sociedades nuevas con altas en el ROI y facturación millonaria en semanas; administradores sin perfil empresarial; **compras y ventas el mismo día** por el mismo producto; ausencia de almacén, seguro o transporte propio; y **solicitudes de devolución** recurrentes de brokers cuyo proveedor es una sociedad joven.',
          },
        ],
        quiz: [
          {
            q: '¿Qué hace la "trucha" en un fraude carrusel?',
            options: ['Exporta y pide la devolución', 'Compra sin IVA, vende con IVA, no lo ingresa y desaparece', 'Fabrica la mercancía', 'Transporta la mercancía'],
            correct: 1,
            explanation: 'La trucha (missing trader) es quien se queda el IVA cobrado sin ingresarlo.',
          },
          {
            q: '¿Por qué la trucha puede vender por debajo de su precio de compra?',
            options: ['Porque compra con descuento', 'Porque el IVA que no ingresa compensa la pérdida y genera el beneficio', 'Porque está subvencionada', 'Porque no paga transporte'],
            correct: 1,
            explanation: 'El IVA cobrado y no ingresado es el beneficio del fraude: puede regalar parte del margen para colocar la mercancía.',
          },
          {
            q: 'En el ejemplo del diagrama, ¿cuánto pierde Hacienda?',
            options: ['1.050 €', '208.950 €', '207.900 €', '0 €'],
            correct: 2,
            explanation: 'La trucha no ingresa 207.900 €; la pantalla ingresa 1.050 €; el broker recibe una devolución de 208.950 €. Neto: −207.900 €.',
          },
        ],
      },
    ],
  },
  {
    id: 'm9',
    title: 'Facturación falsa',
    description: 'Su reflejo en las autoliquidaciones.',
    lessons: [
      {
        id: 'c2-m9-l1',
        title: 'Facturas falsas: el dinero que sale por la puerta de atrás',
        minutes: 10,
        summary: 'Tipos de facturación falsa, cómo funciona el circuito y qué rastro deja en los modelos.',
        blocks: [
          {
            type: 'p',
            text: 'Una **factura falsa** documenta una operación que **no existió** (o que existió por un importe distinto). Sirve a la vez para **defraudar** (deducir un IVA y un gasto inexistentes) y para **blanquear o extraer dinero** de una empresa.',
          },
          {
            type: 'table',
            headers: ['Tipo', 'Descripción'],
            rows: [
              ['**Factura falsa** (simulada)', 'No hay ninguna operación real detrás.'],
              ['**Factura falseada**', 'Hay operación, pero se altera el importe, la fecha, el concepto o el proveedor real.'],
              ['**Factura de favor**', 'Un tercero emite la factura a cambio de una comisión, para que otro la deduzca.'],
            ],
          },
          { type: 'h', text: 'El circuito del dinero' },
          { type: 'interactive', name: 'FacturaFalsaCircuito' },
          { type: 'h', text: 'El rastro en los modelos' },
          {
            type: 'table',
            headers: ['Modelo', 'En el receptor (quien usa la factura)', 'En el emisor (el "facturero")'],
            rows: [
              ['**303**', 'IVA deducible (casillas 28-29) inflado', 'IVA devengado declarado pero no ingresado, compensado con IVA soportado también falso, o no presentado'],
              ['**347**', 'Declara compras al facturero', 'No declara la venta, o la declara a otro cliente: **discrepancia de cruce**'],
              ['**200 / 100**', 'Gasto deducible ficticio que reduce el impuesto', 'Ingreso que no cuadra con sus medios'],
              ['**111**', 'Sin cambio', 'Sin empleados declarados, pese a "facturar obras"'],
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Encaje penal (orientativo)',
            text: 'Según los hechos, puede concurrir **delito contra la Hacienda Pública** (art. 305 CP, cuota defraudada superior a 120.000 € por impuesto y periodo), **falsedad en documento mercantil** (arts. 390 y 392 CP), **blanqueo de capitales** (art. 301 CP) y **organización criminal**. La calificación concreta corresponde a la autoridad judicial.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: 'Pagos por transferencia a un proveedor seguidos de **retiradas de efectivo** del mismo importe (menos un porcentaje); proveedores sin medios materiales ni personales; conceptos genéricos; proveedores en **módulos** con facturación desproporcionada; y cadenas de subcontratación en las que **ningún eslabón tiene trabajadores**.',
          },
        ],
        quiz: [
          {
            q: 'Un proveedor cobra una transferencia de 60.500 € y, al día siguiente, retira 57.000 € en efectivo. ¿Qué sugiere?',
            options: ['Pago de nóminas', 'Devolución del dinero al cliente menos comisión: factura falsa', 'Inversión', 'Nada'],
            correct: 1,
            explanation: 'Es el patrón típico del retorno en efectivo: el cliente recupera su dinero (ahora "negro") y el facturero cobra su comisión.',
          },
          {
            q: '¿Qué modelo informativo permite cruzar lo que declara el comprador con lo que declara el vendedor?',
            options: ['303', '347', '111', '036'],
            correct: 1,
            explanation: 'El 347 lo presentan ambas partes: si uno declara la operación y el otro no, hay discrepancia.',
          },
        ],
      },
    ],
  },
  {
    id: 'm10',
    title: 'Caso práctico: reconstruir una trama',
    description: 'De las facturas a la trama completa.',
    lessons: [
      {
        id: 'c2-m10-l1',
        title: 'Caso "Operación Silicio"',
        minutes: 15,
        summary: 'A partir de modelos y facturas de tres sociedades, reconstruye una trama de fraude de IVA.',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            title: 'Tu misión',
            text: 'La AEAT ha remitido información sobre una posible trama en el comercio de **procesadores informáticos**. Tienes datos de tres sociedades españolas **ficticias**: **Tecnocomp Iberia, S.L.**, **Distribuciones Mediterráneo Digital, S.L.** y **Global Chips Trading, S.A.** Analiza los datos y despliega cada solución.',
          },
          { type: 'h', text: '1. Datos censales' },
          {
            type: 'table',
            headers: ['Sociedad', 'Constitución', 'Alta ROI', 'Empleados (111)', 'Administrador'],
            rows: [
              ['Tecnocomp Iberia', 'Feb 2025', 'Mar 2025', '0', 'Persona de 23 años sin otros cargos'],
              ['Mediterráneo Digital', '2018', '2018', '2', 'Administrador también apoderado en Global Chips'],
              ['Global Chips Trading', '2012', '2012', '14', 'Consejo de administración'],
            ],
          },
          { type: 'h', text: '2. Modelos 303 del 2T 2025 (importes en €)' },
          {
            type: 'table',
            headers: ['Casilla', 'Tecnocomp', 'Mediterráneo', 'Global Chips'],
            rows: [
              ['10 Adquisiciones intracomunitarias (base)', '4.800.000', '0', '0'],
              ['07 Base al 21 %', '4.750.000', '4.770.000', '0'],
              ['09 Cuota devengada al 21 %', '997.500', '1.001.700', '0'],
              ['29 Cuota deducible interior', '0', '997.500', '1.001.700'],
              ['59 Entregas intracomunitarias', '0', '0', '4.790.000'],
              ['71 Resultado', '997.500 (sin ingreso)', '4.200', '-1.001.700 (solicita devolución)'],
            ],
          },
          {
            type: 'reveal',
            title: '¿Qué papel juega cada sociedad?',
            text: '**Tecnocomp** es la **trucha**: sociedad recién creada, sin empleados, administrador sin perfil, compra 4,8 M€ en la UE sin IVA y **vende por menos (4,75 M€)** con IVA, que no ingresa. **Mediterráneo Digital** es la **pantalla**: compra a la trucha y vende con un margen mínimo, ingresa solo 4.200 €. **Global Chips** es el **broker**: compra con IVA y vende fuera de España sin IVA (casilla 59), por lo que **pide la devolución** de 1.001.700 €.',
          },
          {
            type: 'reveal',
            title: '¿Cuánto pierde Hacienda en este trimestre?',
            text: 'Recauda: 4.200 € (Mediterráneo). Pierde: 997.500 € no ingresados por Tecnocomp. Si devuelve a Global Chips: −1.001.700 €. **Saldo: 4.200 − 1.001.700 = −997.500 €**, exactamente el IVA que se quedó la trucha.',
          },
          {
            type: 'reveal',
            title: '¿Qué otros cruces harías?',
            text: '**349 de Tecnocomp** (clave A) frente a las declaraciones recapitulativas de los proveedores comunitarios (vía Eurofisc). **349 de Global Chips** (clave E): ¿quién es el cliente comunitario? ¿Coincide con el proveedor original de Tecnocomp (circularidad)? **347** de las tres sociedades. **Extractos bancarios**: ¿el dinero circula en pocos días y vuelve al origen? **Transporte**: ¿la mercancía se movió realmente? Y el vínculo personal: el administrador de Mediterráneo es **apoderado de Global Chips**.',
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Conclusión del caso',
            text: 'La trama presenta todos los elementos de un **fraude carrusel**: trucha efímera, venta por debajo de coste, pantalla con margen mínimo, broker exportador que pide devolución, mismo producto e importes casi idénticos, y **vínculos personales** entre pantalla y broker. El siguiente paso sería solicitar la suspensión de la devolución y seguir el flujo de fondos internacional.',
          },
        ],
        quiz: [
          {
            q: '¿Qué dato de Tecnocomp es más revelador?',
            options: ['Que tiene NIF', 'Que vende por menos de lo que compra y no ingresa el IVA', 'Que está en Madrid', 'Que presenta el 303'],
            correct: 1,
            explanation: 'Vender por debajo de coste solo es rentable si te quedas el IVA: firma típica de la trucha.',
          },
          {
            q: '¿Qué casilla del 303 de Global Chips revela que es el broker?',
            options: ['Casilla 10', 'Casilla 59 (entregas intracomunitarias) junto con un deducible elevado', 'Casilla 77', 'Casilla 01'],
            correct: 1,
            explanation: 'Vende sin IVA fuera de España (59) y soporta mucho IVA interior: resultado a devolver.',
          },
          {
            q: '¿Qué vínculo refuerza la hipótesis de una trama organizada?',
            options: ['Que las tres venden procesadores', 'Que el administrador de la pantalla es apoderado del broker', 'Que todas tienen NIF', 'Que presentan el 303 trimestral'],
            correct: 1,
            explanation: 'Los vínculos personales entre eslabones indican coordinación, no simples operaciones comerciales.',
          },
        ],
      },
    ],
  },
]
