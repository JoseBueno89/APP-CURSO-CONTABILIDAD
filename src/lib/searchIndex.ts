import { courses } from '../data/courses'
import { modelos } from '../data/modelos'
import { glosario } from '../data/glosario'
import { redFlags } from '../data/redflags'
import type { Block } from '../types'

export type Group = 'Lecciones' | 'Casillas' | 'Modelos' | 'Glosario' | 'Red flags' | 'Herramientas'

export interface Entry {
  group: Group
  title: string
  subtitle: string
  url: string
  hay: string // texto normalizado para buscar
  titleN: string
}

export const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\*\*/g, '').toLowerCase()

const blockText = (b: Block): string => {
  switch (b.type) {
    case 'p':
    case 'h':
      return b.text
    case 'list':
      return b.items.join(' ')
    case 'callout':
      return `${b.title ?? ''} ${b.text}`
    case 'table':
      return [...b.headers, ...b.rows.flat(), b.caption ?? ''].join(' ')
    case 'reveal':
      return `${b.title} ${b.text}`
    default:
      return ''
  }
}

const mk = (group: Group, title: string, subtitle: string, url: string, body: string): Entry => ({
  group, title, subtitle, url, titleN: norm(title), hay: norm(`${title} ${subtitle} ${body}`),
})

let cache: Entry[] | null = null

export function getIndex(): Entry[] {
  if (cache) return cache
  const e: Entry[] = []
  for (const c of courses)
    for (const m of c.modules)
      for (const l of m.lessons)
        e.push(mk('Lecciones', l.title, `${c.code} · ${m.title}`, `/curso/${c.id}/${l.id}`, `${l.summary} ${l.blocks.map(blockText).join(' ')}`))

  for (const mo of modelos) {
    e.push(mk('Modelos', `Modelo ${mo.numero} · ${mo.nombre}`, mo.impuesto, mo.disponible ? `/modelos/${mo.id}` : '/modelos', mo.descripcion))
    if (!mo.disponible) continue
    mo.secciones?.forEach((s) =>
      s.filas.forEach((f) =>
        f.casillas.forEach((ca) =>
          e.push(mk('Casillas', `Casilla ${ca.n} · ${ca.label}`, `Modelo ${mo.numero} · ${f.concepto}`, `/modelos/${mo.id}?casilla=${encodeURIComponent(ca.n)}`, `${mo.numero} ${ca.queEs} ${ca.deDonde}`)),
        ),
      ),
    )
  }

  for (const g of glosario) e.push(mk('Glosario', g.term, g.tags.join(' · '), `/glosario?q=${encodeURIComponent(g.term)}`, `${g.def} ${g.ejemplo ?? ''}`))
  for (const r of redFlags) e.push(mk('Red flags', r.title, `${r.area}${r.source ? ' · ' + r.source : ''}`, '/red-flags', r.detail))

  e.push(mk('Herramientas', 'Cruce de modelos', 'Comprueba qué casillas deben cuadrar entre 303, 390, 349 y 347', '/cruce', 'cruce comparar discrepancia cuadrar'))
  e.push(mk('Herramientas', 'Certificados', 'Descarga tus certificados en PDF', '/certificado', 'certificado diploma pdf'))
  cache = e
  return e
}

export function search(q: string, limit = 40): Entry[] {
  const terms = norm(q).split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  const scored: { e: Entry; s: number }[] = []
  for (const e of getIndex()) {
    if (!terms.every((t) => e.hay.includes(t))) continue
    let s = 0
    for (const t of terms) {
      if (e.titleN.includes(t)) s += 10
      if (e.titleN.startsWith(t) || e.titleN.includes(` ${t}`)) s += 5
    }
    // "casilla 27" o "27" → priorizar coincidencia exacta de número de casilla
    if (e.group === 'Casillas' && terms.some((t) => e.titleN.startsWith(`casilla ${t} `))) s += 30
    if (e.group === 'Lecciones') s += 2
    scored.push({ e, s })
  }
  const top = scored.sort((a, b) => b.s - a.s).slice(0, limit)
  // Agrupar por categoría manteniendo primero la categoría del mejor resultado
  const order: Group[] = []
  for (const x of top) if (!order.includes(x.e.group)) order.push(x.e.group)
  return top.sort((a, b) => order.indexOf(a.e.group) - order.indexOf(b.e.group)).map((x) => x.e)
}
