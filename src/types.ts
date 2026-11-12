export type CalloutVariant = 'info' | 'investigacion' | 'redflag' | 'ejemplo' | 'analogia'

export type InteractiveName =
  | 'BalanceViewer'
  | 'AsientoSimulator'
  | 'IvaChain'
  | 'PgcExplorer'
  | 'RatioCalculator'
  | 'CarruselDiagram'
  | 'FacturaFalsaCircuito'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; variant: CalloutVariant; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'interactive'; name: InteractiveName }
  | { type: 'reveal'; title: string; text: string }

export interface QuizQuestion {
  q: string
  options: string[]
  correct: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  minutes: number
  summary: string
  blocks: Block[]
  quiz: QuizQuestion[]
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  code: string
  title: string
  tagline: string
  description: string
  color: 'primary' | 'teal' | 'accent'
  icon: 'building' | 'receipt' | 'files'
  badge: string
  modules: Module[]
}

/** Casilla de un modelo tributario */
export interface Casilla {
  n: string
  label: string
  kind: 'input' | 'calc' | 'pct' | 'info' | 'text'
  /** Fórmula opcional: función que calcula el valor a partir del resto */
  rate?: number
  /** Texto pedagógico */
  queEs: string
  deDonde: string
  ejemplo: string
  redFlags?: string[]
  relacionadas?: string[]
}

export interface FilaModelo {
  concepto: string
  casillas: Casilla[]
}

export interface SeccionModelo {
  id: string
  title: string
  intro?: string
  filas: FilaModelo[]
}

export interface ModeloTributario {
  id: string
  numero: string
  nombre: string
  impuesto: string
  periodicidad: string
  quien: string
  descripcion: string
  disponible: boolean
  aviso?: string
  secciones?: SeccionModelo[]
  ejemplo?: Record<string, number | string>
  /** Casilla que se destaca como resultado final */
  resultado?: { n: string; label: string; signo?: boolean }
}

export interface GlossaryTerm {
  term: string
  def: string
  ejemplo?: string
  tags: string[]
}

export interface RedFlag {
  title: string
  detail: string
  area: 'Contabilidad' | 'IVA' | 'Modelos'
  severity: 'alta' | 'media'
  source?: string
}
