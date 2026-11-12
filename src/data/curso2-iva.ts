import type { Course } from '../types'
import { curso2Modulos3a10 } from './curso2-modulos-3-10'

export const curso2: Course = {
  id: 'iva',
  code: 'C2',
  title: 'El IVA explicado para investigadores',
  tagline: 'El impuesto que más se defrauda en Europa, contado paso a paso.',
  description:
    'Cómo funciona el IVA, por qué genera tantas oportunidades de fraude y cómo reconstruir una trama a partir de facturas y autoliquidaciones.',
  color: 'teal',
  icon: 'receipt',
  badge: 'Especialista IVA',
  modules: [
    {
      id: 'm1',
      title: 'Cómo funciona el IVA',
      description: 'IVA repercutido, IVA soportado y la cadena de valor.',
      lessons: [
        {
          id: 'c2-m1-l1',
          title: 'La cadena del IVA',
          minutes: 8,
          summary: 'Por qué las empresas cobran IVA que no es suyo y qué pasa con él.',
          blocks: [
            {
              type: 'p',
              text: 'El **IVA** (Impuesto sobre el Valor Añadido) lo paga, al final, el **consumidor**. Pero quien lo cobra y lo ingresa en Hacienda son las **empresas** que intervienen en la cadena. Cada empresa actúa como un **recaudador**: cobra IVA a sus clientes, descuenta el IVA que ella misma pagó a sus proveedores e ingresa la diferencia.',
            },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'Dos palabras clave',
              text: '**IVA repercutido** = el que la empresa **cobra** a sus clientes en sus facturas de venta (es un dinero que debe a Hacienda). **IVA soportado** = el que la empresa **paga** a sus proveedores en sus facturas de compra (puede descontárselo). **A ingresar = repercutido − soportado.**',
            },
            { type: 'h', text: 'Sigue el recorrido de una mesa de madera' },
            { type: 'interactive', name: 'IvaChain' },
            {
              type: 'p',
              text: 'Fíjate en que la suma de lo que ingresa cada empresa coincide exactamente con el IVA que paga el consumidor final. Hacienda va cobrando "a trozos", en cada eslabón, solo por el **valor añadido** de cada uno.',
            },
            {
              type: 'callout',
              variant: 'investigacion',
              title: '¿Qué te dice esto en una investigación?',
              text: 'El sistema funciona **mientras todos los eslabones ingresen su parte**. Si una empresa **cobra el IVA y desaparece sin ingresarlo**, mientras su cliente **sí se lo deduce**, Hacienda pierde ese dinero. Esa es la base del **fraude carrusel**, que estudiaremos en el módulo 8.',
            },
            {
              type: 'callout',
              variant: 'redflag',
              title: 'Señales de alerta',
              text: 'Empresas con **IVA soportado muy elevado** respecto a su IVA repercutido de forma sistemática (solicitan devoluciones continuamente); proveedores que **no presentan el 303**; o sociedades de reciente creación que facturan volúmenes enormes desde el primer trimestre.',
            },
          ],
          quiz: [
            {
              q: 'Una empresa repercute 2.100 € de IVA y soporta 1.400 €. ¿Cuánto ingresa?',
              options: ['3.500 €', '2.100 €', '700 €', '1.400 €'],
              correct: 2,
              explanation: 'Repercutido − soportado = 2.100 − 1.400 = 700 €.',
            },
            {
              q: '¿Quién soporta económicamente el IVA al final de la cadena?',
              options: ['El fabricante', 'El distribuidor', 'El consumidor final', 'Hacienda'],
              correct: 2,
              explanation: 'Las empresas se deducen el IVA que pagan; el consumidor final no puede, así que es quien lo soporta realmente.',
            },
            {
              q: '¿Qué ocurre si un proveedor cobra el IVA, no lo ingresa y desaparece?',
              options: [
                'Nada, su cliente lo paga',
                'Hacienda pierde esa cuota, porque el cliente sí se la deduce',
                'El IVA se anula automáticamente',
                'El consumidor paga el doble',
              ],
              correct: 1,
              explanation: 'Es el mecanismo del "trucha" o missing trader, núcleo del fraude carrusel.',
            },
          ],
        },
      ],
    },
    {
      id: 'm2',
      title: 'Tipos impositivos y exenciones',
      description: 'General, reducido, superreducido y operaciones exentas.',
      lessons: [
        {
          id: 'c2-m2-l1',
          title: '21, 10, 4… y las operaciones exentas',
          minutes: 7,
          summary: 'Qué tipo de IVA se aplica a cada operación y por qué importa.',
          blocks: [
            {
              type: 'p',
              text: 'No todo tributa igual. La Ley 37/1992 del IVA establece varios **tipos impositivos** según el bien o el servicio, y una lista de **operaciones exentas** que no llevan IVA.',
            },
            {
              type: 'table',
              headers: ['Tipo', '%', 'Ejemplos'],
              rows: [
                ['General', '21 %', 'La mayoría de bienes y servicios: ropa, electrónica, vehículos, asesoría, hostelería de ocio nocturno…'],
                ['Reducido', '10 %', 'Hostelería y restauración, transporte de viajeros, vivienda nueva, algunos alimentos.'],
                ['Superreducido', '4 %', 'Pan, leche, frutas y verduras, libros, medicamentos, vivienda de protección oficial.'],
                ['Exento', '—', 'Sanidad, educación, seguros, operaciones financieras, alquiler de vivienda, segunda transmisión de inmuebles.'],
              ],
              caption: 'Tipos orientativos. Comprueba siempre la normativa vigente: los tipos de ciertos productos cambian con frecuencia.',
            },
            {
              type: 'callout',
              variant: 'analogia',
              title: 'Exento no es lo mismo que "no sujeto"',
              text: '**Exento**: la operación entra en el ámbito del IVA, pero la ley la libera de pagarlo (p. ej., un seguro). **No sujeto**: la operación ni siquiera entra en el impuesto (p. ej., vender una empresa entera como unidad productiva). En la práctica, ninguna lleva IVA, pero tienen consecuencias distintas en la deducción.',
            },
            {
              type: 'callout',
              variant: 'investigacion',
              title: '¿Qué te dice esto en una investigación?',
              text: 'Las operaciones **exentas** y la **segunda transmisión de inmuebles** (que tributa por ITP en lugar de IVA) son muy utilizadas en blanqueo inmobiliario. Revisa si una sociedad aplica el tipo correcto: aplicar un **tipo reducido indebido** o declarar **exenciones falsas** son formas habituales de defraudar.',
            },
          ],
          quiz: [
            {
              q: '¿Qué tipo de IVA se aplica, por regla general, a un servicio de asesoría jurídica?',
              options: ['4 %', '10 %', '21 %', 'Exento'],
              correct: 2,
              explanation: 'Los servicios profesionales tributan al tipo general del 21 %.',
            },
            {
              q: 'El alquiler de una vivienda habitual a un particular…',
              options: ['Tributa al 21 %', 'Tributa al 10 %', 'Está exento de IVA', 'Tributa al 4 %'],
              correct: 2,
              explanation: 'El arrendamiento de vivienda está exento (art. 20.Uno.23º LIVA).',
            },
          ],
        },
      ],
    },
    ...curso2Modulos3a10,
  ],
}

export const curso3Meta = {
  id: 'modelos',
  code: 'C3',
  title: 'Biblioteca interactiva de Modelos Tributarios',
  tagline: 'Cada casilla, explicada como si nunca hubieras visto un impuesto.',
  description:
    'Réplicas interactivas de los modelos de la AEAT con explicaciones casilla a casilla, modo práctica y descarga en PDF.',
  badge: 'Lector de Modelos',
}
