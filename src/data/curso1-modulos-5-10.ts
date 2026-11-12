import type { Module } from '../types'

export const curso1Modulos5a10: Module[] = [
  {
    id: 'm5',
    title: 'La Cuenta de Pérdidas y Ganancias',
    description: 'De dónde viene el dinero y a dónde va.',
    lessons: [
      {
        id: 'c1-m5-l1',
        title: 'La película del año: ingresos, gastos y resultado',
        minutes: 9,
        summary: 'Cómo se construye el resultado de una empresa y qué partidas suelen esconder anomalías.',
        blocks: [
          {
            type: 'p',
            text: 'Si el Balance es una **fotografía**, la **Cuenta de Pérdidas y Ganancias** (PyG) es una **película**: cuenta lo que ha pasado durante todo el año. Recoge los **ingresos** (grupo 7) y los **gastos** (grupo 6), y su diferencia es el **resultado del ejercicio**: beneficio o pérdida.',
          },
          {
            type: 'callout',
            variant: 'analogia',
            title: 'Como tu nómina y tus gastos del mes',
            text: 'Lo que cobras es el ingreso; el alquiler, la comida y la luz son los gastos. Lo que te sobra (o te falta) a final de mes es tu "resultado". Una empresa hace exactamente lo mismo, pero ordenando los gastos por tipo para que se vea **cómo** se gana o se pierde el dinero.',
          },
          { type: 'h', text: 'La estructura, de arriba abajo' },
          {
            type: 'table',
            caption: 'PyG simplificada de una distribuidora ficticia (importes en €)',
            headers: ['Partida', 'Importe', 'Qué significa'],
            rows: [
              ['1. Importe neto de la cifra de negocios', '850.000', 'Ventas y servicios de la actividad principal (cuentas 70x).'],
              ['4. Aprovisionamientos', '-510.000', 'Lo que cuesta la mercancía vendida (cuentas 60x).'],
              ['6. Gastos de personal', '-180.000', 'Sueldos y Seguridad Social (cuentas 64x).'],
              ['7. Otros gastos de explotación', '-95.000', 'Alquileres, suministros, asesores, publicidad (cuentas 62x).'],
              ['8. Amortización del inmovilizado', '-15.000', 'El "desgaste" anual de los bienes duraderos (cuentas 68x).'],
              ['**A.1) Resultado de explotación**', '**50.000**', 'Lo que gana la empresa con su negocio.'],
              ['14/15. Ingresos y gastos financieros', '-8.000', 'Intereses cobrados y pagados.'],
              ['**A.3) Resultado antes de impuestos**', '**42.000**', ''],
              ['17. Impuesto sobre beneficios', '-10.500', 'Gasto por Impuesto sobre Sociedades (25 % general).'],
              ['**A.5) Resultado del ejercicio**', '**31.500**', 'Va al Balance en la cuenta 129.'],
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: '¿Qué te dice esto en una investigación?',
            text: 'Compara la PyG con la **realidad física** del negocio. Una empresa que vende 850.000 € de mercancía debería tener **aprovisionamientos** (compras) y algo de **personal**. Si ves una cifra de negocios alta con gastos casi nulos, pregúntate: ¿quién hace el trabajo? ¿De dónde sale la mercancía? Los márgenes extraordinarios son tan sospechosos como las pérdidas crónicas.',
          },
          { type: 'h', text: 'Blanqueo "al revés": declarar beneficios para lavar dinero' },
          {
            type: 'p',
            text: 'Hay una técnica que sorprende a los recién llegados: algunas organizaciones **inflan sus ventas y pagan impuestos de buen grado**. Al hacerlo, el dinero ilícito aparece como beneficio legítimo de una empresa (por ejemplo, un restaurante, un solárium o un aparcamiento con mucho efectivo). Pagar un 25 % de Impuesto sobre Sociedades es, para ellos, la **comisión del lavado**.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta en la PyG',
            text: '**Márgenes muy superiores al sector** sin ventaja competitiva aparente; ventas que crecen mucho sin aumento de compras ni personal; **ingresos excepcionales** (778) recurrentes; gastos de **servicios profesionales** (623) altos a sociedades vinculadas o extranjeras; o **intereses pagados** (662) a prestamistas desconocidos.',
          },
          {
            type: 'reveal',
            title: 'Ejercicio: ¿qué ves raro en esta PyG?',
            text: 'Una cafetería con 2 empleados declara 1,2 M€ de ventas, 60.000 € de compras de café y alimentos y un margen del 80 %. **Respuesta:** el volumen de ventas es incompatible con el aforo y la plantilla, y las compras no justifican tanta venta (no hay café para 1,2 M€). Patrón típico de introducción de efectivo ilícito como ventas en un negocio de caja.',
          },
        ],
        quiz: [
          {
            q: 'La Cuenta de Pérdidas y Ganancias muestra…',
            options: ['Lo que la empresa tiene y debe en un día concreto', 'Los ingresos y gastos acumulados durante un periodo', 'Solo los movimientos de caja', 'La lista de socios'],
            correct: 1,
            explanation: 'La PyG resume la actividad del ejercicio: ingresos menos gastos = resultado.',
          },
          {
            q: 'Una sociedad declara grandes beneficios y paga el Impuesto sobre Sociedades sin rechistar, pero no tiene estructura para generar esas ventas. ¿Qué puede estar ocurriendo?',
            options: ['Nada: pagar impuestos demuestra legalidad', 'Puede estar blanqueando, presentando fondos ilícitos como beneficios', 'Es un error del gestor', 'Está en concurso de acreedores'],
            correct: 1,
            explanation: 'Inflar ventas y pagar impuestos es una forma de "legitimar" fondos: el impuesto es el coste del blanqueo.',
          },
          {
            q: '¿A qué cuenta del Balance va el resultado del ejercicio?',
            options: ['570', '129', '700', '551'],
            correct: 1,
            explanation: 'El resultado del ejercicio se recoge en la cuenta 129, dentro del Patrimonio Neto.',
          },
        ],
      },
    ],
  },
  {
    id: 'm6',
    title: 'Memoria, EFE y ECPN',
    description: 'La letra pequeña que lo explica todo.',
    lessons: [
      {
        id: 'c1-m6-l1',
        title: 'La letra pequeña: Memoria, flujos de efectivo y patrimonio neto',
        minutes: 9,
        summary: 'Los tres documentos que casi nadie lee y que más información esconden.',
        blocks: [
          {
            type: 'p',
            text: 'El Balance y la PyG dan **cifras**. Los otros tres documentos de las cuentas anuales dan **explicaciones**. Muchas veces, la información más valiosa para una investigación está en la **Memoria**, en un párrafo que nadie lee.',
          },
          { type: 'h', text: 'La Memoria: el manual de instrucciones' },
          {
            type: 'list',
            items: [
              '**Operaciones con partes vinculadas**: préstamos, compras, ventas o servicios con socios, administradores y empresas del grupo. Es el apartado número uno para el investigador.',
              '**Retribuciones y anticipos a administradores**: cuánto cobran y si se les ha prestado dinero.',
              '**Avales y garantías**: si la empresa responde de deudas de terceros (a menudo, de sus socios).',
              '**Empresa en funcionamiento**: si hay dudas sobre la continuidad del negocio.',
              '**Hechos posteriores al cierre**: lo relevante que ocurrió después del 31 de diciembre.',
              '**Información sobre el titular real** y la composición del accionariado (en el modelo de depósito).',
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Truco de investigador',
            text: 'Busca en la Memoria la palabra **"vinculadas"** y la cuenta **551**. Si la empresa tiene saldos grandes con socios y la Memoria no los explica, o los explica con frases genéricas ("operaciones de tesorería"), anótalo como indicio.',
          },
          { type: 'h', text: 'El Estado de Flujos de Efectivo (EFE): por dónde entró y salió la caja' },
          {
            type: 'p',
            text: 'El EFE separa los movimientos de dinero real en tres "grifos". Es obligatorio solo para empresas que no pueden formular cuentas abreviadas, pero cuando existe es una herramienta excelente.',
          },
          {
            type: 'table',
            headers: ['Flujo', 'Qué recoge', 'Lo normal', 'Lo sospechoso'],
            rows: [
              ['Explotación', 'Cobros a clientes, pagos a proveedores y empleados', 'Positivo en un negocio sano', 'Negativo años seguidos mientras la empresa crece'],
              ['Inversión', 'Compra y venta de inmuebles, maquinaria, participaciones', 'Negativo (la empresa invierte)', 'Grandes compras de activos de lujo sin actividad que las justifique'],
              ['Financiación', 'Préstamos recibidos y devueltos, aportaciones de socios, dividendos', 'Variable', 'Entradas recurrentes de socios o "préstamos" que financian todo lo demás'],
            ],
          },
          {
            type: 'callout',
            variant: 'analogia',
            title: 'Beneficio no es lo mismo que dinero',
            text: 'Una empresa puede ganar dinero en la PyG y no tener un euro en el banco (porque no cobra a sus clientes), o perder dinero y estar llena de caja (porque alguien le presta). El EFE te dice **de dónde viene realmente el efectivo**.',
          },
          { type: 'h', text: 'El ECPN: cómo cambia el dinero de los socios' },
          {
            type: 'p',
            text: 'El **Estado de Cambios en el Patrimonio Neto** explica por qué ha variado el patrimonio de un año a otro: beneficios, dividendos repartidos, **ampliaciones de capital**, **aportaciones de socios**, compensación de pérdidas…',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta',
            text: '**Ampliaciones de capital** suscritas por socios sin capacidad económica conocida; aportaciones de socios para "compensar pérdidas" año tras año; **ampliaciones por compensación de créditos** (convertir una deuda dudosa con un socio en capital); y Memorias que omiten operaciones vinculadas que sí se ven en el Balance.',
          },
        ],
        quiz: [
          {
            q: '¿Qué apartado de la Memoria es más útil para detectar trasvases con socios?',
            options: ['Normas de valoración', 'Operaciones con partes vinculadas', 'Información medioambiental', 'Hechos posteriores'],
            correct: 1,
            explanation: 'La Memoria debe detallar préstamos, compras, ventas y servicios con socios, administradores y sociedades del grupo.',
          },
          {
            q: 'Una sociedad tiene flujos de explotación negativos durante 4 años, pero compra inmuebles todos los años. ¿Qué flujo explicará cómo lo paga?',
            options: ['Explotación', 'Inversión', 'Financiación', 'Ninguno'],
            correct: 2,
            explanation: 'Si el negocio no genera caja, las compras se pagan con financiación: préstamos o aportaciones. Hay que identificar quién aporta ese dinero.',
          },
          {
            q: 'Una "ampliación de capital por compensación de créditos" consiste en…',
            options: ['Repartir dividendos', 'Convertir en capital una deuda que la sociedad tenía con un socio o acreedor', 'Pagar a Hacienda', 'Vender acciones en bolsa'],
            correct: 1,
            explanation: 'Si el crédito original era ficticio o de origen ilícito, la ampliación "lava" esa deuda convirtiéndola en participación en la sociedad.',
          },
        ],
      },
    ],
  },
  {
    id: 'm7',
    title: 'Cuentas anuales en el Registro Mercantil',
    description: 'Cómo obtenerlas e interpretarlas.',
    lessons: [
      {
        id: 'c1-m7-l1',
        title: 'El Registro Mercantil: la biografía pública de una sociedad',
        minutes: 8,
        summary: 'Qué información pública hay, dónde pedirla y cómo reconstruir la historia de una empresa.',
        blocks: [
          {
            type: 'p',
            text: 'El **Registro Mercantil** es la "biografía oficial" de cada sociedad. Ahí está su nacimiento (constitución), sus cambios de domicilio, de administradores y de capital, y sus **cuentas anuales** de cada año. Es **público**: cualquiera puede consultarlo pagando una pequeña tasa.',
          },
          {
            type: 'table',
            headers: ['Fuente', 'Qué obtienes', 'Utilidad'],
            rows: [
              ['**Nota simple / certificación**', 'Datos vigentes: domicilio, objeto social, capital, administradores, apoderados', 'Saber quién manda hoy'],
              ['**Historial de actos (BORME)**', 'Boletín Oficial del Registro Mercantil: constitución, nombramientos, ceses, ampliaciones, cambios de domicilio, disolución', 'Reconstruir la cronología'],
              ['**Depósito de cuentas**', 'Balance, PyG, Memoria e informe de auditoría de cada ejercicio', 'Analizar la evolución económica'],
              ['**Declaración de titularidad real**', 'Personas físicas que controlan la sociedad (se incluye con el depósito de cuentas)', 'Identificar al titular real'],
            ],
          },
          { type: 'h', text: 'Los plazos que debes conocer' },
          {
            type: 'list',
            ordered: true,
            items: [
              'Los administradores **formulan** las cuentas en los **3 meses** siguientes al cierre (normalmente, antes del 31 de marzo).',
              'La junta de socios las **aprueba** en los **6 meses** siguientes al cierre (antes del 30 de junio).',
              'Se **depositan** en el Registro en el **mes siguiente** a la aprobación (antes del 30 de julio, aproximadamente).',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Cuentas normales, abreviadas y pymes',
            text: 'Las sociedades pequeñas pueden presentar **modelos abreviados** con menos detalle (Balance abreviado si durante dos ejercicios seguidos cumplen 2 de 3: activo ≤ 4 M€, cifra de negocios ≤ 8 M€, plantilla media ≤ 50). La **auditoría** es obligatoria cuando se superan 2 de estos 3 límites: activo > 2,85 M€, cifra de negocios > 5,7 M€, plantilla > 50. Contrasta los umbrales con la normativa vigente.',
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Cómo reconstruir la historia de una sociedad',
            text: 'Ordena cronológicamente los actos del BORME y busca **patrones**: ¿cambió de administrador justo antes de una operación grande? ¿Trasladó el domicilio a una provincia distinta cuando empezaron las inspecciones? ¿El administrador figura en **decenas de sociedades** (posible testaferro o "administrador profesional")? Cruza los nombres con las bases de datos de titularidad real a las que tengas acceso.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Señales de alerta registrales',
            text: '**Sociedades "durmientes"** compradas ya constituidas (sociedades de reciente compra con antigüedad aparente); **cambios de denominación** y de objeto social radicales; domicilio en **centros de negocios** o despachos que albergan cientos de sociedades; **hoja registral cerrada** por no depositar cuentas mientras sigue operando; y administradores extranjeros o personas jurídicas como administradores.',
          },
        ],
        quiz: [
          {
            q: '¿Dónde se publican los nombramientos y ceses de administradores?',
            options: ['En el BOE', 'En el BORME', 'En el Catastro', 'En la AEAT'],
            correct: 1,
            explanation: 'El Boletín Oficial del Registro Mercantil publica los actos inscritos.',
          },
          {
            q: '¿En qué plazo debe aprobar la junta las cuentas anuales?',
            options: ['1 mes', '3 meses', '6 meses desde el cierre', '12 meses'],
            correct: 2,
            explanation: 'La junta ordinaria se celebra en los 6 primeros meses del ejercicio para aprobar las cuentas.',
          },
          {
            q: 'Una persona figura como administradora única de 60 sociedades diferentes. ¿Qué te sugiere?',
            options: ['Que es una empresaria de éxito', 'Posible testaferro o administrador de sociedades instrumentales', 'Nada relevante', 'Que es auditora'],
            correct: 1,
            explanation: 'La acumulación de cargos en muchas sociedades sin relación es un indicador clásico de testaferros.',
          },
        ],
      },
    ],
  },
  {
    id: 'm8',
    title: 'Ratios para detectar anomalías',
    description: 'Liquidez, endeudamiento, rentabilidad y rotación.',
    lessons: [
      {
        id: 'c1-m8-l1',
        title: 'Ratios: el termómetro de una empresa',
        minutes: 10,
        summary: 'Calcula los ratios clave con la calculadora interactiva y aprende a leerlos en clave de riesgo.',
        blocks: [
          {
            type: 'p',
            text: 'Un **ratio** es simplemente una división entre dos cifras de las cuentas. Su valor no está en el número en sí, sino en **compararlo**: con años anteriores, con empresas del mismo sector o con lo que sería "razonable" para ese negocio.',
          },
          {
            type: 'table',
            headers: ['Ratio', 'Fórmula', 'Qué mide'],
            rows: [
              ['Liquidez', 'Activo corriente / Pasivo corriente', 'Si puede pagar sus deudas a corto plazo. Lo habitual: 1 a 2.'],
              ['Endeudamiento', 'Pasivo total / (PN + Pasivo)', 'Qué parte de la empresa se financia con dinero ajeno.'],
              ['Efectivo sobre ventas', 'Caja y bancos / Cifra de negocios', 'Si el efectivo es proporcionado a la actividad.'],
              ['Rotación del activo', 'Cifra de negocios / Activo total', 'Cuántos euros vende por cada euro invertido.'],
              ['Rentabilidad económica (ROA)', 'Resultado de explotación / Activo total', 'Lo que rinden los activos.'],
              ['Margen', 'Resultado de explotación / Cifra de negocios', 'Lo que gana por cada euro vendido.'],
              ['Periodo medio de cobro', '(Clientes / Cifra de negocios) × 365', 'Días que tarda en cobrar a sus clientes.'],
            ],
          },
          { type: 'h', text: 'Calculadora: prueba con Inversiones Levante Global, S.L.' },
          { type: 'interactive', name: 'RatioCalculator' },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Los tres ratios del investigador',
            text: '1) **Efectivo sobre ventas**: si supera ampliamente el 20-30 % de forma sostenida en un negocio pequeño, pregunta por el origen. 2) **Rotación del activo** muy baja: la sociedad acumula activos que no usa para vender (patrimonio aparcado). 3) **Periodo medio de cobro** desorbitado: ventas que nunca se cobran (posibles ventas ficticias).',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'Cuidado con las conclusiones rápidas',
            text: 'Un ratio raro **no prueba nada**: hay sectores con mucha caja (hostelería), mucho activo (inmobiliarias) o cobros lentos (obra pública). Úsalos para **priorizar** qué preguntar, nunca como conclusión.',
          },
        ],
        quiz: [
          {
            q: 'Una sociedad tiene activo corriente de 50.000 € y pasivo corriente de 200.000 €. Su liquidez es…',
            options: ['4', '0,25', '1', '150.000'],
            correct: 1,
            explanation: '50.000 / 200.000 = 0,25. No puede pagar sus deudas a corto plazo con sus activos corrientes.',
          },
          {
            q: 'Ventas anuales de 100.000 € y saldo de clientes de 400.000 €. ¿Periodo medio de cobro?',
            options: ['36 días', '365 días', '1.460 días', '4 días'],
            correct: 2,
            explanation: '(400.000 / 100.000) × 365 = 1.460 días: cuatro años de ventas sin cobrar. Indicio de ventas ficticias o de clientes vinculados que no pagan.',
          },
          {
            q: '¿Para qué sirven los ratios en una investigación?',
            options: ['Para probar un delito', 'Para priorizar qué preguntar y dónde mirar', 'Para calcular impuestos', 'No sirven para nada'],
            correct: 1,
            explanation: 'Son indicadores: orientan la investigación, no la sustituyen.',
          },
        ],
      },
    ],
  },
  {
    id: 'm9',
    title: 'Cuentas sensibles en blanqueo',
    description: '551, 570, 118, 170/171, 553 y compañía.',
    lessons: [
      {
        id: 'c1-m9-l1',
        title: 'Las cuentas que más hablan',
        minutes: 10,
        summary: 'Fichas de las cuentas contables más utilizadas para introducir, mover o extraer fondos.',
        blocks: [
          {
            type: 'p',
            text: 'El dinero ilícito necesita **entrar** en la sociedad, **circular** y, al final, **salir** hacia sus beneficiarios. Cada una de esas fases deja huella en cuentas concretas. Esta es tu "lista de vigilancia".',
          },
          {
            type: 'table',
            caption: 'Fase de ENTRADA: cómo se introduce el dinero',
            headers: ['Cuenta', 'Qué es', 'Cómo se usa para blanquear', 'Qué pedir'],
            rows: [
              ['**118** Aportaciones de socios', 'Dinero que los socios meten sin ampliar capital', 'Introducir fondos sin justificar su origen', 'Origen de fondos del socio, extractos'],
              ['**100** Capital social', 'Lo que aportan los socios en constitución o ampliación', 'Ampliaciones suscritas con dinero ilícito', 'Escritura, certificado bancario del desembolso'],
              ['**163 / 171** Deudas a l/p', 'Préstamos recibidos', '"Loan-back": el propio dinero vuelve como préstamo de una sociedad extranjera', 'Contrato, intereses pagados, garantías, prestamista real'],
              ['**700 / 705** Ventas', 'Ingresos de la actividad', 'Ventas ficticias para justificar ingresos en efectivo', 'Facturas, clientes, albaranes, cobros'],
              ['**778** Ingresos excepcionales', 'Ingresos extraordinarios', 'Justificar entradas puntuales sin soporte', 'Documentación del hecho excepcional'],
            ],
          },
          {
            type: 'table',
            caption: 'Fase de CIRCULACIÓN y SALIDA',
            headers: ['Cuenta', 'Qué es', 'Cómo se usa', 'Qué pedir'],
            rows: [
              ['**551** C/c con socios y administradores', 'Trasvases de dinero sociedad ↔ socios', 'Sacar dinero para los socios sin tributar como dividendo o sueldo', 'Mayor de la cuenta, acuerdos, extractos'],
              ['**553** C/c con socios por fusiones/escisiones', 'Saldos de reestructuraciones societarias', 'Ocultar movimientos en operaciones complejas', 'Proyecto de fusión, balances'],
              ['**570** Caja', 'Efectivo', 'Saldos ficticios para cuadrar o efectivo de origen ilícito', 'Arqueos, libro de caja, depósitos bancarios'],
              ['**623** Servicios de profesionales', 'Asesoría, consultoría', 'Facturas falsas para sacar fondos', 'Contratos, entregables, prestador real'],
              ['**662** Intereses de deudas', 'Intereses pagados por préstamos', 'Pagar "intereses" a prestamistas ficticios', 'Contrato y prestamista'],
              ['**240 / 250** Participaciones', 'Inversiones en otras sociedades', 'Mover fondos a estructuras societarias opacas', 'Escrituras, cadena societaria'],
            ],
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Pide siempre el "mayor" de la cuenta',
            text: 'El **libro mayor** de una cuenta muestra **todos sus movimientos** del año, uno a uno, con fecha, importe y contrapartida. El saldo del Balance solo te dice cómo terminó el año; el mayor te dice **cómo llegó ahí**. Una 551 con saldo cero a 31/12 puede haber movido millones durante el año.',
          },
          {
            type: 'callout',
            variant: 'redflag',
            title: 'El "barrido" de fin de año',
            text: 'Desconfía de cuentas sensibles (551, 570) que **se dejan a cero justo el 31 de diciembre** con un asiento manual contra otra cuenta (por ejemplo, convirtiendo el saldo de la 551 en un "préstamo a largo plazo" o en un gasto). Es una forma de maquillar el Balance.',
          },
        ],
        quiz: [
          {
            q: 'En un "loan-back", el blanqueador…',
            options: [
              'Pide un préstamo al banco',
              'Hace que su propio dinero ilícito vuelva a su sociedad disfrazado de préstamo de una entidad extranjera',
              'Presta dinero a sus empleados',
              'Paga sus deudas por adelantado',
            ],
            correct: 1,
            explanation: 'El dinero sale hacia una sociedad o cuenta en el extranjero que él controla y regresa como "préstamo", aparentemente legítimo.',
          },
          {
            q: 'El saldo de la 551 a 31 de diciembre es cero. ¿Puedes descartar movimientos con socios?',
            options: ['Sí', 'No: hay que revisar el libro mayor de todo el año', 'Solo si hay auditoría', 'Solo si la sociedad es una S.A.'],
            correct: 1,
            explanation: 'El saldo final no muestra los movimientos intermedios. Pide siempre el mayor.',
          },
          {
            q: '¿Qué cuenta usarías para detectar facturas de "consultoría" sospechosas?',
            options: ['570', '623', '129', '300'],
            correct: 1,
            explanation: 'La 623 recoge los servicios de profesionales independientes; es una vía clásica para extraer fondos con facturas falsas.',
          },
        ],
      },
    ],
  },
  {
    id: 'm10',
    title: 'Caso práctico: la sociedad pantalla',
    description: 'Analiza unas cuentas completas de principio a fin.',
    lessons: [
      {
        id: 'c1-m10-l1',
        title: 'Caso "Reformas Atlántida, S.L."',
        minutes: 15,
        summary: 'Aplica todo lo aprendido a un caso completo: registro, cuentas, ratios y cuentas sensibles.',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            title: 'Tu misión',
            text: 'La unidad ha recibido una comunicación del SEPBLAC sobre ingresos en efectivo en cuentas de **Reformas Atlántida, S.L.** (sociedad y personas **ficticias**). Te piden un primer análisis de su información contable y registral. Lee los datos, intenta responder cada pregunta y después despliega la solución.',
          },
          { type: 'h', text: '1. Información registral (BORME)' },
          {
            type: 'table',
            headers: ['Fecha', 'Acto inscrito'],
            rows: [
              ['03/2019', 'Constitución. Capital 3.000 €. Objeto: reformas y construcción. Administrador único: M.R.T.'],
              ['11/2021', 'Cese de M.R.T. Nombramiento de administrador único: J.P.L. (figura en otras 34 sociedades).'],
              ['01/2022', 'Cambio de domicilio a un centro de negocios. Ampliación del objeto social: "comercio de metales y joyería".'],
              ['06/2023', 'Ampliación de capital por compensación de créditos: 450.000 €.'],
              ['2024', 'No deposita cuentas del ejercicio 2023.'],
            ],
          },
          {
            type: 'reveal',
            title: '¿Qué te llama la atención?',
            text: 'Cuatro indicios: 1) **cambio de administrador** a una persona con 34 cargos (posible testaferro); 2) traslado a un **centro de negocios**; 3) **ampliación de objeto** hacia metales y joyería, sectores de riesgo sin relación con las reformas; 4) **ampliación por compensación de créditos** de 450.000 € (¿qué crédito tenía el socio contra la sociedad y de dónde salió ese dinero?). Además, **deja de depositar cuentas** justo después.',
          },
          { type: 'h', text: '2. Cuentas anuales (importes en miles de €)' },
          {
            type: 'table',
            headers: ['Partida', '2020', '2021', '2022'],
            rows: [
              ['Cifra de negocios', '95', '140', '1.850'],
              ['Aprovisionamientos', '-40', '-60', '-90'],
              ['Gastos de personal', '-35', '-38', '-12'],
              ['Resultado del ejercicio', '4', '6', '1.290'],
              ['Caja (570)', '3', '5', '380'],
              ['Clientes (430)', '12', '20', '960'],
              ['C/c con socios – deudor (551)', '0', '0', '610'],
              ['Deudas con socios (163/171)', '0', '0', '450'],
            ],
          },
          {
            type: 'reveal',
            title: 'Calcula: margen 2022, efectivo/ventas y periodo medio de cobro',
            text: '**Margen** ≈ 1.290 / 1.850 = **70 %** (frente al 4 % de años anteriores, en un sector de márgenes bajos). **Efectivo/ventas** = 380 / 1.850 = **20,5 %**. **Periodo medio de cobro** = 960 / 1.850 × 365 ≈ **189 días**. Las ventas se multiplican por 13 mientras los **gastos de personal bajan** y las **compras apenas crecen**: ¿quién hace las reformas y con qué materiales?',
          },
          {
            type: 'reveal',
            title: '¿Qué cuentas sensibles se activan y en qué orden?',
            text: '**Entrada**: ventas de 2022 (700) que no se corresponden con capacidad real, cobradas en parte en efectivo (570 = 380). **Circulación/salida**: el dinero pasa a los socios (551 deudor = 610). **Legitimación**: en 2023 aparece una deuda con socios de 450 que se **convierte en capital** (ampliación por compensación de créditos). Patrón: introducir efectivo como ventas, sacarlo a socios y reintroducirlo como "capital" limpio.',
          },
          {
            type: 'reveal',
            title: '¿Qué diligencias propondrías?',
            text: 'Pedir el **libro mayor** de 570, 551, 700 y 430; **facturas y clientes** de 2022 (cruzar con su **347** y el 347 de los clientes); **extractos bancarios** y origen del efectivo ingresado; **escritura** de la ampliación de 2023 y documentación del crédito compensado; identificar al **titular real** detrás de J.P.L.; revisar los **303** (¿cuadra el IVA con ventas de 1,85 M€?) y el **111** (¿tiene empleados?).',
          },
          {
            type: 'callout',
            variant: 'investigacion',
            title: 'Conclusión del caso',
            text: 'Ningún indicio por sí solo prueba el blanqueo, pero **la combinación** (testaferro + cambio de objeto a sector de riesgo + ventas desproporcionadas + efectivo + trasvases a socios + capitalización de créditos + dejar de depositar cuentas) justifica una investigación patrimonial en profundidad.',
          },
        ],
        quiz: [
          {
            q: 'En el caso, ¿qué hace más sospechoso el crecimiento de ventas de 2022?',
            options: ['Que se pagó el IVA', 'Que crecen las ventas pero bajan los gastos de personal y las compras apenas suben', 'Que la empresa es una S.L.', 'Que el capital es de 3.000 €'],
            correct: 1,
            explanation: 'Unas ventas reales de reformas requieren mano de obra y materiales. Sin ellos, las ventas probablemente no existen.',
          },
          {
            q: '¿Qué papel juega la ampliación de capital por compensación de créditos de 2023?',
            options: ['Ninguno', 'Convierte una deuda de origen dudoso en capital aparentemente legítimo', 'Reduce el IVA', 'Es obligatoria por ley'],
            correct: 1,
            explanation: 'Es la fase de integración: el dinero queda dentro de la sociedad como capital del socio.',
          },
          {
            q: '¿Qué modelo tributario consultarías para saber si la sociedad tiene empleados?',
            options: ['303', '347', '111', '349'],
            correct: 2,
            explanation: 'El modelo 111 recoge las retenciones sobre nóminas. Sin 111, no hay empleados declarados.',
          },
          {
            q: 'El primer administrador cesa y entra uno con 34 cargos. ¿Cuál es la hipótesis principal?',
            options: ['Profesionalización de la gestión', 'Interposición de un testaferro para ocultar al titular real', 'Jubilación', 'Fusión'],
            correct: 1,
            explanation: 'Es un patrón típico de interposición: el titular real se aparta formalmente.',
          },
        ],
      },
    ],
  },
]
