import { AlertTriangle, Calculator, Database, Link2, Pin, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
const GAP = 10
const MARGIN = 12

/** true en pantallas estrechas: el tooltip se muestra como panel inferior */
export function useIsSheet() {
  const q = '(max-width: 639px)'
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

function Content({ c, exists, onJump, pinned, sheet }: { c: Casilla; exists: (n: string) => boolean; onJump: (n: string) => void; pinned: boolean; sheet: boolean }) {
  return (
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
                <button key={r} onClick={() => onJump(r)} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-primary hover:bg-primary-soft">Casilla {r}</button>
              ) : (
                <span key={r} className="rounded-md bg-teal-soft px-2 py-1 font-mono text-xs text-teal">Modelo {r}</span>
              ),
            )}
          </div>
        </section>
      )}
      {!pinned && !sheet && <p className="text-[11px] text-muted">Pulsa la casilla para fijar esta explicación.</p>}
    </div>
  )
}

function Header({ c, pinned, onClose }: { c: Casilla; pinned: boolean; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-[#0b2545] px-4 py-3 text-white">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 rounded-md bg-[#c9a227] px-2 py-0.5 font-mono text-sm font-semibold text-[#0b2545]">{c.n}</span>
        <span className="truncate font-semibold leading-tight">{c.label}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {pinned && <Pin className="h-3.5 w-3.5 text-[#c9a227]" aria-label="Fijado" />}
        <button onClick={onClose} aria-label="Cerrar explicación" className="rounded p-1.5 hover:bg-white/10"><X className="h-5 w-5" /></button>
      </div>
    </div>
  )
}

export default function CasillaTooltip({ casilla: c, anchor, pinned, exists, onJump, onClose, onEnter, onLeave }: Props) {
  const sheet = useIsSheet()
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; maxH: number } | null>(null)

  /* Escritorio: debajo de la casilla si cabe; si no, encima; si no cabe en ninguno, en el lado con más espacio */
  useLayoutEffect(() => {
    if (sheet) return
    const el = ref.current
    if (!el) return
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight
    const width = Math.min(W, vw - MARGIN * 2)
    // altura real del contenido aunque el panel esté limitado: cabecera + contenido desplazable
    const head = el.firstElementChild as HTMLElement | null
    const body = el.lastElementChild as HTMLElement | null
    const natural = (head?.offsetHeight ?? 0) + (body?.scrollHeight ?? 0) + 2
    const below = vh - anchor.bottom - GAP - MARGIN
    const above = anchor.top - GAP - MARGIN
    let top: number
    let maxH: number
    if (natural <= below || below >= above) {
      maxH = Math.max(160, below)
      top = anchor.bottom + GAP
    } else {
      maxH = Math.max(160, above)
      top = anchor.top - GAP - Math.min(natural, maxH)
    }
    top = Math.max(MARGIN, Math.min(top, vh - MARGIN - Math.min(natural, maxH)))
    let left = anchor.left + anchor.width / 2 - width / 2
    left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN))
    setPos({ top, left, maxH })
  }, [anchor, c.n, sheet])

  /* Móvil: desplazar la página para que la casilla quede visible por encima del panel */
  useEffect(() => {
    if (!sheet) return
    const limit = window.innerHeight * 0.3
    if (anchor.top > limit || anchor.top < 64) window.scrollBy({ top: anchor.top - 80, behavior: 'smooth' })
    // solo al abrir una casilla nueva (no en cada actualización de posición)
  }, [c.n, sheet])

  if (sheet) {
    return createPortal(
      <div
        role="dialog"
        aria-label={`Explicación de la casilla ${c.n}`}
        data-tooltip
        className="no-print fixed inset-x-0 bottom-0 z-50 flex max-h-[62vh] flex-col overflow-hidden rounded-t-2xl border-t border-line bg-surface text-sm shadow-[0_-12px_40px_rgba(0,0,0,0.25)] animate-sheet-up"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-center bg-[#0b2545] pt-2"><span className="h-1 w-10 rounded-full bg-white/30" /></div>
        <Header c={c} pinned={false} onClose={onClose} />
        <div className="overflow-y-auto overscroll-contain">
          <Content c={c} exists={exists} onJump={onJump} pinned={pinned} sheet />
        </div>
      </div>,
      document.body,
    )
  }

  return createPortal(
    <div
      ref={ref}
      role="tooltip"
      id={`tip-${c.n}`}
      data-tooltip
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        width: Math.min(W, document.documentElement.clientWidth - MARGIN * 2),
        maxHeight: pos?.maxH,
        visibility: pos ? 'visible' : 'hidden',
      }}
      className="no-print fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-sm shadow-2xl"
    >
      <Header c={c} pinned={pinned} onClose={onClose} />
      <div className="overflow-y-auto overscroll-contain">
        <Content c={c} exists={exists} onJump={onJump} pinned={pinned} sheet={false} />
      </div>
    </div>,
    document.body,
  )
}
