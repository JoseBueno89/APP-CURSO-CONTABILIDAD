import type { Block, InteractiveName } from '../types'
import { Rich } from '../lib/rich'
import { Callout } from './ui'
import PgcExplorer from './interactive/PgcExplorer'
import AsientoSimulator from './interactive/AsientoSimulator'
import BalanceViewer from './interactive/BalanceViewer'
import IvaChain from './interactive/IvaChain'
import RatioCalculator from './interactive/RatioCalculator'
import CarruselDiagram from './interactive/CarruselDiagram'
import FacturaFalsaCircuito from './interactive/FacturaFalsaCircuito'
import { ChevronDown, Eye } from 'lucide-react'

const interactives: Record<InteractiveName, () => React.JSX.Element> = {
  PgcExplorer,
  AsientoSimulator,
  BalanceViewer,
  IvaChain,
  RatioCalculator,
  CarruselDiagram,
  FacturaFalsaCircuito,
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-lesson text-[15.5px] text-ink/90">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}><Rich text={b.text} /></p>
          case 'h':
            return <h2 key={i} className="mb-2 mt-10 text-xl font-bold tracking-tight text-ink">{b.text}</h2>
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul'
            return (
              <Tag key={i} className={`my-4 space-y-2 pl-5 ${b.ordered ? 'list-decimal' : 'list-disc'} marker:text-accent`}>
                {b.items.map((it, j) => <li key={j} className="leading-relaxed"><Rich text={it} /></li>)}
              </Tag>
            )
          }
          case 'callout':
            return <Callout key={i} variant={b.variant} title={b.title} text={b.text} />
          case 'table':
            return (
              <figure key={i} className="my-6 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[#0b2545] text-white">
                    <tr>{b.headers.map((h) => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-line odd:bg-surface even:bg-surface-2">
                        {r.map((c, k) => <td key={k} className={`px-4 py-2.5 align-top ${/^[\d.,*]+$/.test(c.replace(/\*/g, '')) ? 'font-mono' : ''}`}><Rich text={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {b.caption && <figcaption className="border-t border-line bg-surface-2 px-4 py-2 text-xs text-muted">{b.caption}</figcaption>}
              </figure>
            )
          case 'interactive': {
            const C = interactives[b.name]
            return <C key={i} />
          }
          case 'reveal':
            return (
              <details key={i} className="group my-4 overflow-hidden rounded-xl border border-line bg-surface">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-ink hover:bg-surface-2">
                  <span className="flex items-center gap-2"><Eye className="h-4 w-4 text-accent" /> {b.title}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted">
                    <span className="group-open:hidden">Ver solución</span><span className="hidden group-open:inline">Ocultar</span>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </span>
                </summary>
                <div className="border-t border-line bg-accent-soft/50 px-4 py-3 text-[15px] leading-relaxed"><Rich text={b.text} /></div>
              </details>
            )
        }
      })}
    </div>
  )
}
