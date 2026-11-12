import { AlertTriangle, Calculator, Database, Link2, Pin, X } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import type { Casilla } from '../types'
import { Rich } from '../lib/rich'

interface Props {
  casilla: Casilla
  anchor: DOMRect
  pinned: boolean
  exists: (n: string) => boolean
  onJump: (n: string) => void
  onClose: () => void
  onEnter: () => void
  onLeave: () => void
}

const W = 380

export default function CasillaTooltip({ casilla: c, anchor, pinned, exists, onJump, onClose, onEnter, onLeave }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: anchor.bottom + 8, left: anchor.left })

  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 300
    const vw = window.innerWidth
    const vh = window.innerHeight
    const width = Math.min(W, vw - 24)
    let left = anchor.left + anchor.width / 2 - width / 2
    left = Math.max(12, Math.min(left, vw - width - 12))
    let top = anchor.bottom + 8
    if (top + h > vh - 12) top = Math.max(12, anchor.top - h - 8)
    setPos({ top, left })
  }, [anchor, c.n])

  return (
    <div
      ref={ref}
      role="tooltip"
      id={`tip-${c.n}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ top: pos.top, left: pos.left, width: Math.min(W, window.innerWidth - 24) }}
      className="no-print fixed z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-surface text-sm shadow-2xl animate-fade-up"
    >
      <div className="sticky top-0 flex items-center justify-between gap-2 bg-[#0b2545] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#c9a227] px-2 py-0.5 font-mono text-sm font-semibold text-[#0b2545]">{c.n}</span>
          <span className="font-semibold leading-tight">{c.label}</span>
        </div>
        <div className="flex items-center gap-1">
          {pinned && <Pin className="h-3.5 w-3.5 text-[#c9a227]" aria-label="Fijado" />}
          <button onClick={onClose} aria-label="Cerrar explicación" className="rounded p-1 hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <section>
          <h4 className="mb-1 text-[11px] font-bold uppercase tracking-wider text-accent">¿Qué es?</h4>
          <p className="leading-relaxed text-ink/90"><Rich text={c.queEs} /></p>
        </section>
        <section>
          <h4 className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary"><Database className="h-3 w-3" /> ¿De dónde sale el dato?</h4>
          <p className="leading-relaxed text-ink/90"><Rich text={c.deDonde} /></p>
        </section>
        <section className="rounded-lg bg-surface-2 p-3">
          <h4 className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted"><Calculator className="h-3 w-3" /> Ejemplo</h4>
          <p className="leading-relaxed text-ink/90"><Rich text={c.ejemplo} /></p>
        </section>
        {c.redFlags && c.redFlags.length > 0 && (
          <section className="rounded-lg bg-danger-soft p-3">
            <h4 className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-danger"><AlertTriangle className="h-3 w-3" /> En una investigación</h4>
            <ul className="list-disc space-y-1 pl-4 text-ink/90">
              {c.redFlags.map((r) => <li key={r}><Rich text={r} /></li>)}
            </ul>
          </section>
        )}
        {c.relacionadas && c.relacionadas.length > 0 && (
          <section>
            <h4 className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted"><Link2 className="h-3 w-3" /> Debe cuadrar con</h4>
            <div className="flex flex-wrap gap-1.5">
              {c.relacionadas.map((r) =>
                exists(r) ? (
                  <button key={r} onClick={() => onJump(r)} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-primary hover:bg-primary-soft">Casilla {r}</button>
                ) : (
                  <span key={r} className="rounded-md bg-teal-soft px-2 py-0.5 font-mono text-xs text-teal">Modelo {r}</span>
                ),
              )}
            </div>
          </section>
        )}
        {!pinned && <p className="text-[11px] text-muted">Pulsa la casilla para fijar esta explicación.</p>}
      </div>
    </div>
  )
}
