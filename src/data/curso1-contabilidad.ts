import type { Course } from '../types'
import { curso1Modulos5a10 } from './curso1-modulos-5-10'

export const curso1: Course = {
  id: 'contabilidad',
  code: 'C1',
  title: 'Contabilidad de Sociedades para Investigadores',
  tagline: 'Aprende a leer las cuentas de una empresa como quien lee una escena del crimen.',
  description:
    'Del Plan General Contable al análisis de cuentas anuales, con un único objetivo: que sepas encontrar dónde se esconde el dinero.',
  color: 'primary',
  icon: 'building',
  badge: 'Analista Contable',
  modules: [
    {
      id: 'm1',
      title: 'Por qué la contabilidad importa en una investigación',
      description: 'La contabilidad es el rastro que deja el dinero. Aprende a mirarla con ojos de investigador.',
      lessons: [
        {
          id: 'c1-m1-l1',
          title: 'La contabilidad: la huella del dinero',
          minutes: 7,
          summary: 'Qué es la contabilidad, quién está obligado a llevarla y por qué es una mina de información.',
          blocks: [
            {
              type: 'p',
              text: 'Imagina que una empresa es una casa. La **contabilidad** es el diario que anota todo lo que entra y sale por la puerta: cada compra, cada venta, cada préstamo, cada euro que un socio mete o se lleva. Si alguien quiere blanquear dinero a través de una sociedad, **ese dinero tiene que pasar por el diario**. Puede maquillarse, pero no puede desaparecer sin dejar rastro.',
            },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'Piensa en ello así',
              text: 'El extracto bancario te dice que el dinero se ha movido. La contabilidad te dice **por qué** dice la empresa que se ha movido. Cuando las dos versiones no encajan, ahí tienes tu hilo del que tirar.',
            },
            { type: 'h', text: '¿Quién está obligado a llevar contabilidad?' },
            {
              type: 'p',
              text: 'Todas las **sociedades mercantiles** (S.A., S.L., cooperativas…) deben llevar contabilidad según el **Código de Comercio** y el **Plan General de Contabilidad (PGC)**. Además, cada año deben depositar sus **cuentas anuales** en el Registro Mercantil, donde cualquiera puede consultarlas.',
            },
            {
              type: 'list',
              items: [
                '**Libro Diario**: anota cada operación por orden cronológico.',
                '**Libro de Inventarios y Cuentas Anuales**: recoge el balance y las cuentas de cierre.',
                '**Libro de Actas**: decisiones de la junta de socios y del órgano de administración.',
                '**Libro registro de socios / acciones nominativas**: quién es dueño de la sociedad.',
              ],
            },
            {
              type: 'callout',
              variant: 'investigacion',
              title: '¿Qué te dice esto en una investigación?',
              text: 'Los libros son obligatorios y deben conservarse **6 años**. Si una sociedad no puede aportarlos, los lleva con retraso o hay operaciones relevantes que no aparecen en el Diario, esto ya es un indicio en sí mismo. Y el **Libro registro de socios** es clave para identificar al **titular real**.',
            },
            { type: 'h', text: 'Las cuentas anuales: el informe que todo el mundo puede ver' },
            {
              type: 'table',
              headers: ['Documento', 'Qué responde', 'Pregunta del investigador'],
              rows: [
                ['Balance', '¿Qué tiene y qué debe la empresa en una fecha concreta?', '¿Tiene activos coherentes con su actividad?'],
                ['Cuenta de Pérdidas y Ganancias', '¿Cuánto ganó o perdió durante el año?', '¿De dónde salen los ingresos? ¿Son creíbles?'],
                ['Estado de Cambios en el Patrimonio Neto (ECPN)', '¿Cómo cambió el dinero de los socios?', '¿Hay aportaciones sin justificar?'],
                ['Estado de Flujos de Efectivo (EFE)', '¿Por dónde entró y salió la caja?', '¿El efectivo cuadra con la actividad?'],
                ['Memoria', 'La letra pequeña: explica todo lo anterior', '¿Hay operaciones con partes vinculadas?'],
              ],
            },
            {
              type: 'callout',
              variant: 'redflag',
              title: 'Señales de alerta',
              text: 'Sociedades que **no depositan cuentas** durante varios ejercicios pero siguen facturando; cuentas depositadas con modelo **abreviado** que ocultan el detalle; o cambios frecuentes de **auditor** o de **domicilio social**.',
            },
          ],
          quiz: [
            {
              q: '¿Durante cuántos años deben conservarse los libros contables?',
              options: ['2 años', '4 años', '6 años', '10 años'],
              correct: 2,
              explanation: 'El Código de Comercio (art. 30) obliga a conservar libros, correspondencia y justificantes durante 6 años desde el último asiento.',
            },
            {
              q: '¿Qué documento de las cuentas anuales te ayuda más a identificar operaciones con partes vinculadas?',
              options: ['El Balance', 'La Memoria', 'La Cuenta de Pérdidas y Ganancias', 'El Libro de Actas'],
              correct: 1,
              explanation: 'La Memoria tiene un apartado específico de operaciones con partes vinculadas (socios, administradores, empresas del grupo).',
            },
            {
              q: '¿Dónde pueden consultarse las cuentas anuales de una S.L.?',
              options: ['Solo en la AEAT', 'En el Registro Mercantil', 'Solo pidiéndolas a la empresa', 'En el Catastro'],
              correct: 1,
              explanation: 'Las cuentas anuales se depositan en el Registro Mercantil y son de acceso público.',
            },
          ],
        },
      ],
    },
    {
      id: 'm2',
      title: 'El Plan General Contable sin miedo',
      description: 'Los 9 grupos de cuentas explicados con analogías domésticas.',
      lessons: [
        {
          id: 'c1-m2-l1',
          title: 'Los grupos de cuentas: el mapa del PGC',
          minutes: 8,
          summary: 'Cómo está organizado el Plan General Contable y qué cuentas debes vigilar.',
          blocks: [
            {
              type: 'p',
              text: 'El **Plan General de Contabilidad** (Real Decreto 1514/2007) es como un **diccionario común**: obliga a todas las empresas a usar los mismos números para las mismas cosas. Gracias a él, la cuenta **570** significa "caja" tanto en una panadería de Cuenca como en una multinacional.',
            },
            {
              type: 'p',
              text: 'Las cuentas se organizan en **grupos** numerados del 1 al 9. El primer dígito te dice a qué familia pertenece una cuenta; cuantos más dígitos, más detalle. Por ejemplo: **5** (cuentas financieras) → **57** (tesorería) → **570** (caja, euros).',
            },
            { type: 'interactive', name: 'PgcExplorer' },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'Truco para recordarlo',
              text: 'Grupos **1 a 5** → lo que la empresa **tiene y debe** (van al Balance). Grupos **6 y 7** → lo que **gasta y gana** (van a Pérdidas y Ganancias). Grupos **8 y 9** → gastos e ingresos que se imputan directamente al patrimonio neto (poco frecuentes en pymes).',
            },
            {
              type: 'callout',
              variant: 'investigacion',
              title: 'Cuentas que todo investigador debe vigilar',
              text: '**551** (cuenta corriente con socios y administradores), **570** (caja), **118** (aportaciones de socios), **170/171** (deudas a largo plazo), **553** (cuentas con socios por fusiones/escisiones), **129** (resultado del ejercicio) y **430/400** (clientes/proveedores). Haz clic en cada grupo del mapa para ver por qué.',
            },
          ],
          quiz: [
            {
              q: '¿A qué grupo pertenece la cuenta 570 "Caja, euros"?',
              options: ['Grupo 1 – Financiación básica', 'Grupo 4 – Acreedores y deudores', 'Grupo 5 – Cuentas financieras', 'Grupo 7 – Ventas'],
              correct: 2,
              explanation: 'La tesorería (caja y bancos) está en el subgrupo 57, dentro del grupo 5.',
            },
            {
              q: 'Las cuentas de los grupos 6 y 7 forman…',
              options: ['El Balance', 'La Cuenta de Pérdidas y Ganancias', 'La Memoria', 'El Libro de Actas'],
              correct: 1,
              explanation: 'Grupo 6 = gastos y grupo 7 = ingresos. Su diferencia es el resultado del ejercicio.',
            },
            {
              q: '¿Por qué la cuenta 551 es especialmente interesante en blanqueo?',
              options: [
                'Porque recoge las ventas',
                'Porque refleja el dinero que va y viene entre la sociedad y sus socios/administradores',
                'Porque es obligatoria auditarla',
                'Porque solo la usan las S.A.',
              ],
              correct: 1,
              explanation: 'La 551 es el "puente" entre el patrimonio de la sociedad y el de sus socios: un canal clásico para sacar o meter fondos sin justificación.',
            },
          ],
        },
      ],
    },
    {
      id: 'm3',
      title: 'La partida doble: debe y haber',
      description: 'El principio que hace que la contabilidad siempre cuadre (y por qué eso te ayuda).',
      lessons: [
        {
          id: 'c1-m3-l1',
          title: 'Todo tiene un origen y un destino',
          minutes: 9,
          summary: 'Entiende el asiento contable con ejemplos visuales y practica con el simulador.',
          blocks: [
            {
              type: 'p',
              text: 'La **partida doble** se basa en una idea muy sencilla: **el dinero no aparece ni desaparece, solo cambia de sitio**. Por eso, cada operación se anota dos veces: una vez donde **va** el valor (**Debe**) y otra de donde **viene** (**Haber**). La suma del Debe siempre es igual a la suma del Haber.',
            },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'La regla de oro',
              text: '**Debe = a dónde va** (lo que recibo o el destino). **Haber = de dónde viene** (lo que entrego o el origen). Si compro un ordenador pagando con el banco: el ordenador "entra" (Debe) y el dinero "sale" del banco (Haber).',
            },
            {
              type: 'table',
              caption: 'Ejemplo: la sociedad compra un ordenador de 1.000 € + IVA pagando por banco',
              headers: ['Cuenta', 'Debe', 'Haber'],
              rows: [
                ['217 Equipos para procesos de información', '1.000,00', ''],
                ['472 H.P. IVA soportado', '210,00', ''],
                ['572 Bancos', '', '1.210,00'],
                ['**Totales**', '**1.210,00**', '**1.210,00**'],
              ],
            },
            { type: 'h', text: 'Practica: monta tú el asiento' },
            { type: 'interactive', name: 'AsientoSimulator' },
            {
              type: 'callout',
              variant: 'investigacion',
              title: '¿Qué te dice esto en una investigación?',
              text: 'Como todo asiento necesita una **contrapartida**, cuando veas un ingreso de dinero en el banco (572 al Debe) pregúntate: **¿qué cuenta está al Haber?** Si es una venta (700), debe haber factura y cliente. Si es un préstamo (170) o una aportación de socio (118/551), debe haber contrato o acuerdo. La contrapartida es **la explicación oficial** del movimiento.',
            },
            {
              type: 'callout',
              variant: 'redflag',
              title: 'Señales de alerta',
              text: 'Entradas de efectivo en **570 Caja** con contrapartida en ventas (700) en negocios que normalmente cobran con tarjeta; asientos de **regularización** a final de año sin soporte documental; o cargos y abonos recurrentes en la **551** por importes redondos.',
            },
          ],
          quiz: [
            {
              q: 'Un socio ingresa 50.000 € en el banco de la sociedad como préstamo. ¿Qué cuenta va al Debe?',
              options: ['551 Cuenta corriente con socios', '572 Bancos', '700 Ventas', '100 Capital social'],
              correct: 1,
              explanation: 'El dinero "entra" en el banco: 572 al Debe. La contrapartida al Haber sería la deuda con el socio (por ejemplo, 551 o 163/171).',
            },
            {
              q: 'En todo asiento contable…',
              options: ['El Debe es mayor que el Haber', 'La suma del Debe es igual a la del Haber', 'Solo hay dos cuentas', 'Siempre aparece la cuenta de bancos'],
              correct: 1,
              explanation: 'Es el principio de la partida doble: los importes del Debe y del Haber siempre suman lo mismo.',
            },
            {
              q: 'Ves una entrada de 30.000 € en caja (570) con contrapartida en ventas (700) en una empresa que solo factura a otras empresas. ¿Qué haces?',
              options: [
                'Nada, es normal',
                'Pedir facturas, identidad del cliente y analizar si el cobro en efectivo es coherente',
                'Asumir que es un error contable',
                'Comprobar solo el IVA',
              ],
              correct: 1,
              explanation: 'Las ventas B2B en efectivo por importes altos son atípicas (además, existen límites legales al pago en efectivo). Es una señal clásica de introducción de fondos ilícitos como ventas ficticias.',
            },
          ],
        },
      ],
    },
    {
      id: 'm4',
      title: 'El Balance: la foto de la empresa',
      description: 'Activo, pasivo y patrimonio neto. Cómo leer un balance en 5 minutos.',
      lessons: [
        {
          id: 'c1-m4-l1',
          title: 'Leer un balance en 5 minutos',
          minutes: 10,
          summary: 'Explora un balance real (ficticio) partida a partida y aprende a detectar anomalías.',
          blocks: [
            {
              type: 'p',
              text: 'El **Balance** es una **fotografía** de la empresa en un día concreto (normalmente el 31 de diciembre). A la izquierda está lo que la empresa **tiene** (**Activo**) y a la derecha **cómo lo ha pagado**: con dinero propio (**Patrimonio Neto**) o con dinero ajeno (**Pasivo**).',
            },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'La ecuación fundamental',
              text: '**Activo = Patrimonio Neto + Pasivo.** Si tienes un piso de 200.000 € y una hipoteca de 150.000 €, tu activo es 200.000, tu pasivo 150.000 y tu patrimonio neto 50.000. Una empresa funciona exactamente igual.',
            },
            { type: 'h', text: 'Explora el balance de "Inversiones Levante Global, S.L."' },
            {
              type: 'p',
              text: 'Esta sociedad es ficticia, pero su balance reproduce patrones reales de investigaciones de blanqueo. **Pasa el ratón (o pulsa)** sobre cada partida para ver qué significa y qué podría esconder.',
            },
            { type: 'interactive', name: 'BalanceViewer' },
            {
              type: 'callout',
              variant: 'investigacion',
              title: 'Método rápido de lectura',
              text: '1) Mira el **total**: ¿es coherente con el tamaño del negocio declarado? 2) Compara **efectivo** frente a actividad. 3) Revisa las **deudas con socios** y con **empresas del grupo**. 4) Mira el **patrimonio neto**: ¿hay pérdidas acumuladas y aun así la empresa sigue operando? Alguien la está financiando.',
            },
          ],
          quiz: [
            {
              q: 'Una sociedad tiene un activo de 800.000 € y un pasivo de 900.000 €. ¿Cuál es su patrimonio neto?',
              options: ['1.700.000 €', '100.000 €', '-100.000 €', '0 €'],
              correct: 2,
              explanation: 'PN = Activo − Pasivo = 800.000 − 900.000 = −100.000 €. Patrimonio neto negativo: la empresa debe más de lo que tiene.',
            },
            {
              q: 'Una sociedad sin empleados, con unas ventas de 20.000 € y 400.000 € en caja (570). ¿Qué te sugiere?',
              options: ['Gestión prudente', 'Posible acumulación de efectivo de origen no justificado', 'Error del programa contable', 'Nada relevante'],
              correct: 1,
              explanation: 'Un saldo de efectivo desproporcionado respecto a la actividad es un indicador clásico. ¿De dónde viene ese dinero si no viene de las ventas?',
            },
          ],
        },
      ],
    },
    ...curso1Modulos5a10,
  ],
}
