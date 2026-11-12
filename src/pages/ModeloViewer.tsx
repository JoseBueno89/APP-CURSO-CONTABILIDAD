import { AlertTriangle, ChevronRight, Download, Eraser, ExternalLink, FileDown, Info, Search, Sparkles } from 'lucide-react'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { computeFns, getModelo } from '../data/modelos'
import type { Casilla, FilaModelo } from '../types'
import { eur, Rich } from '../lib/rich'
import { useProgress } from '../lib/progress'
import CasillaTooltip, { useIsSheet } from '../components/CasillaTooltip'
import { Pill } from '../components/ui'

function parseNum(s: string): number {
  const t = s.replace(/\s|€/g, '')
  if (!t || t === '-') return 0
  const n = t.includes(',') ? Number(t.replace(/\./g, '').replace(',', '.')) : Number(t)
  return Number.isFinite(n) ? n : 0
}

type PrintMode = 'explicado' | 'blanco' | null

export default function ModeloViewer() {
  const { id = '' } = useParams()
  const modelo = getModelo(id)
  const { markModelo } = useProgress()
  const [raw, setRaw] = useState<Record<string, string>>({})
  const [tip, setTip] = useState<{ n: string; rect: DOMRect; pinned: boolean } | null>(null)
  const [highlight, setHighlight] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [printMode, setPrintMode] = useState<PrintMode>(null)
  const hideTimer = useRef<number | undefined>(undefined)
  const sheet = useIsSheet()

  useEffect(() => {
    if (modelo?.disponible) markModelo(modelo.id)
  }, [modelo, markModelo])

  const all = useMemo(() => {
    const m = new Map<string, Casilla>()
    modelo?.secciones?.forEach((s) => s.filas.forEach((f) => f.casillas.forEach((c) => m.set(c.n, c))))
    return m
  }, [modelo])

  const values = useMemo(() => {
    const nums: Record<string, number> = {}
    for (const [k, v] of Object.entries(raw)) if (all.get(k)?.kind !== 'text') nums[k] = parseNum(v)
    const fn = computeFns[modelo?.id ?? '']
    return fn ? fn(nums) : nums
  }, [raw, modelo, all])

  /* Tooltip: mostrar / ocultar */
  const show = useCallback((n: string, pinned = false) => {
    window.clearTimeout(hideTimer.current)
    const el = document.getElementById(`cas-${n}`)
    if (!el) return
    setTip((t) => ({ n, rect: el.getBoundingClientRect(), pinned: pinned || (t?.n === n && t.pinned) }))
  }, [])
  const scheduleHide = useCallback(() => {
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setTip((t) => (t && !t.pinned ? null : t)), 180)
  }, [])

  useEffect(() => {
    if (!tip) return
    const update = () => {
      const el = document.getElementById(`cas-${tip.n}`)
      if (el) setTip((t) => (t ? { ...t, rect: el.getBoundingClientRect() } : t))
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setTip(null)
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-tooltip]') && !target.closest('[data-casilla]')) setTip(null)
    }
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [tip?.n])

  const jump = useCallback((n: string) => {
    const el = document.getElementById(`cas-${n}`)
    if (!el) return false
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlight(n)
    window.setTimeout(() => setHighlight(null), 2200)
    window.setTimeout(() => show(n, true), 450)
    return true
  }, [show])

  /* Al cambiar de modelo: vaciar; si llega ?casilla=XX (buscador global), abrirla */
  const [params] = useSearchParams()
  const target = params.get('casilla')
  useEffect(() => {
    setRaw({})
    setTip(null)
  }, [id])
  useEffect(() => {
    if (!target || !all.has(target)) return
    const t = window.setTimeout(() => jump(target), 350)
    return () => window.clearTimeout(t)
  }, [target, all, jump])

  /* Impresión / PDF */
  useEffect(() => {
    if (!printMode) return
    setTip(null)
    const done = () => setPrintMode(null)
    window.addEventListener('afterprint', done, { once: true })
    const t = window.setTimeout(() => window.print(), 50)
    return () => window.clearTimeout(t)
  }, [printMode])

  if (!modelo || !modelo.disponible || !modelo.secciones) return <Navigate to="/modelos" replace />

  const loadExample = () => {
    const r: Record<string, string> = {}
    for (const [k, v] of Object.entries(modelo.ejemplo ?? {})) if (v) r[k] = typeof v === 'number' ? String(v).replace('.', ',') : v
    setRaw(r)
  }

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim().replace(/^casilla\s*/i, '')
    const hit = [q, q.toUpperCase(), q.padStart(2, '0')].find((c) => all.has(c))
    setNotFound(!(hit && jump(hit)))
  }

  const blank = printMode === 'blanco'
  const tipCasilla = tip ? all.get(tip.n) : undefined
  const res = modelo.resultado
  const resVal = res ? values[res.n] ?? 0 : 0

  const boxProps = (c: Casilla) => ({
    c,
    value: values[c.n],
    raw: raw[c.n] ?? '',
    blank,
    active: tip?.n === c.n,
    highlight: highlight === c.n,
    sheet,
    onChange: (v: string) => setRaw((r) => ({ ...r, [c.n]: v })),
    onEnter: () => show(c.n),
    onLeave: scheduleHide,
    onPin: () => show(c.n, true),
  })

  return (
    <div className="animate-fade-up">
      <nav className="no-print mb-6 flex items-center gap-1 text-sm text-muted" aria-label="Migas de pan">
        <Link to="/" className="hover:text-ink">Inicio</Link><ChevronRight className="h-4 w-4" />
        <Link to="/modelos" className="hover:text-ink">Modelos</Link><ChevronRight className="h-4 w-4" />
        <span className="text-ink">Modelo {modelo.numero}</span>
      </nav>

      {/* Cabecera estilo formulario oficial */}
      <header className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm print-break">
        <div className="flex flex-col gap-4 bg-[#0b2545] px-6 py-5 text-white sm:flex-row sm:items-center">
          <div className="rounded-xl bg-[#c9a227] px-4 py-2 font-mono text-3xl font-semibold text-[#0b2545]">{modelo.numero}</div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.18em] text-[#9fb4d4]">Réplica didáctica · {modelo.impuesto}</p>
            <h1 className="text-2xl font-extrabold tracking-tight">{modelo.nombre}</h1>
          </div>
        </div>
        <div className="grid gap-4 p-6 text-sm sm:grid-cols-3">
          <div><div className="text-xs font-semibold uppercase tracking-wider text-muted">¿Quién lo presenta?</div><div className="mt-1 text-ink">{modelo.quien}</div></div>
          <div><div className="text-xs font-semibold uppercase tracking-wider text-muted">¿Cuándo?</div><div className="mt-1 text-ink">{modelo.periodicidad}</div></div>
          <div><div className="text-xs font-semibold uppercase tracking-wider text-muted">En una frase</div><div className="mt-1 text-ink">{modelo.descripcion}</div></div>
        </div>
        {modelo.aviso && (
          <div className="mx-6 mb-6 flex gap-2 rounded-lg bg-warn-soft p-3 text-xs text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-warn" /> {modelo.aviso}
          </div>
        )}
      </header>

      {/* Barra de herramientas */}
      <div className="no-print z-10 mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-surface/95 p-3 shadow-sm backdrop-blur sm:sticky sm:top-16 lg:flex-row lg:items-center">
        <form onSubmit={onSearch} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setNotFound(false) }}
              placeholder="¿Qué es la casilla…? Escribe un número (p. ej. 27)"
              aria-label="Buscar casilla"
              className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-surface dark:text-[#0a1220]">Ir</button>
          {notFound && <span className="text-xs text-danger">No existe</span>}
        </form>
        <div className="flex flex-wrap gap-2">
          <ToolBtn onClick={loadExample} icon={<Sparkles className="h-4 w-4" />}>Cargar ejemplo</ToolBtn>
          <ToolBtn onClick={() => setRaw({})} icon={<Eraser className="h-4 w-4" />}>Vaciar</ToolBtn>
          <ToolBtn onClick={() => setPrintMode('explicado')} icon={<FileDown className="h-4 w-4" />} primary>PDF explicado</ToolBtn>
          <ToolBtn onClick={() => setPrintMode('blanco')} icon={<Download className="h-4 w-4" />}>PDF en blanco</ToolBtn>
          <a href="https://sede.agenciatributaria.gob.es" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-surface-2">
            <ExternalLink className="h-4 w-4" /> Sede AEAT
          </a>
        </div>
      </div>

      <p className="no-print mt-4 text-sm text-muted">
        <strong className="text-ink">Modo práctica:</strong> escribe importes en las casillas blancas; las casillas sombreadas se calculan solas.{' '}
        {sheet ? 'Toca el número de una casilla para ver su explicación.' : 'Pasa el ratón o pulsa sobre cualquier casilla para ver su explicación.'}
      </p>

      {/* Formulario */}
      <div className="mt-6 space-y-6">
        {modelo.secciones.map((s) => (
          <section key={s.id} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm print-break">
            <div className="border-b border-line bg-primary-soft px-5 py-3">
              <h2 className="font-bold text-ink">{s.title}</h2>
              {s.intro && <p className="mt-1 text-sm text-ink/80"><Rich text={s.intro} /></p>}
            </div>
            {s.columns ? (
              /* Disposición del formulario oficial: columnas fijas */
              <GridBody filas={s.filas} columns={s.columns} render={(c) => <CasillaBox key={c.n} variant="cell" {...boxProps(c)} />} />
            ) : (
              <div className="divide-y divide-line">
                {s.filas.map((f) => (
                  <div key={f.concepto} className="grid gap-3 px-3 py-4 sm:px-5 lg:grid-cols-[minmax(0,15rem)_1fr] lg:items-center">
                    <div className="text-sm font-medium text-ink">{f.concepto}</div>
                    <div className="flex flex-wrap gap-2">
                      {f.casillas.map((c) => <CasillaBox key={c.n} variant="box" {...boxProps(c)} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Resultado destacado */}
      {res && (
        <div className="no-print mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#0b2545] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[#9fb4d4]">{res.label} (casilla {res.n})</div>
            <div className="mt-1 font-mono text-2xl font-semibold sm:text-3xl">{eur(resVal)} €</div>
          </div>
          {res.signo && (
            <Pill tone={resVal > 0 ? 'accent' : resVal < 0 ? 'teal' : 'neutral'}>
              {resVal > 0 ? 'A ingresar' : resVal < 0 ? 'A compensar o devolver' : 'Sin resultado'}
            </Pill>
          )}
        </div>
      )}

      {/* Anexo explicativo solo en impresión */}
      {printMode === 'explicado' && (
        <section className="print-only mt-10">
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Guía casilla a casilla · Modelo {modelo.numero}</h2>
          {[...all.values()].map((c) => (
            <div key={c.n} className="print-break" style={{ borderTop: '1px solid #ccc', padding: '8px 0', fontSize: 11 }}>
              <strong>Casilla {c.n} · {c.label}</strong>
              <p><em>Qué es:</em> <Rich text={c.queEs} /></p>
              <p><em>De dónde sale:</em> <Rich text={c.deDonde} /></p>
              <p><em>Ejemplo:</em> <Rich text={c.ejemplo} /></p>
              {c.redFlags?.map((r) => <p key={r}>⚠ <Rich text={r} /></p>)}
            </div>
          ))}
        </section>
      )}

      <div className="no-print mt-6 flex gap-2 rounded-xl border border-line bg-surface p-4 text-xs text-muted">
        <AlertTriangle className="h-4 w-4 shrink-0 text-warn" />
        Esta réplica tiene fines formativos y no sustituye al formulario oficial. La presentación real se realiza en la Sede Electrónica de la AEAT.
      </div>

      {tip && tipCasilla && (
        <CasillaTooltip
          casilla={tipCasilla}
          anchor={tip.rect}
          pinned={tip.pinned}
          exists={(n) => all.has(n)}
          onJump={(n) => jump(n)}
          onClose={() => setTip(null)}
          onEnter={() => window.clearTimeout(hideTimer.current)}
          onLeave={scheduleHide}
        />
      )}
    </div>
  )
}

function ToolBtn({ onClick, icon, children, primary }: { onClick: () => void; icon: React.ReactNode; children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${primary ? 'bg-accent font-bold text-[#0b2545]' : 'border border-line text-ink hover:bg-surface-2'}`}
    >
      {icon} {children}
    </button>
  )
}

interface BoxProps {
  c: Casilla
  value: number | undefined
  raw: string
  blank: boolean
  active: boolean
  highlight: boolean
  sheet: boolean
  variant: 'box' | 'cell'
  onChange: (v: string) => void
  onEnter: () => void
  onLeave: () => void
  onPin: () => void
}

/** Sección dibujada como el formulario oficial: concepto a la izquierda, columnas fijas a la derecha */
function GridBody({ filas, columns, render }: { filas: FilaModelo[]; columns: string[]; render: (c: Casilla) => React.ReactNode }) {
  const n = columns.length
  const cols = n >= 3 ? 'form-cols-3' : n === 2 ? 'form-cols-2' : 'form-cols-1'

  // Agrupar filas consecutivas con el mismo "grupo" (llave del formulario)
  const chunks: { grupo?: string; filas: FilaModelo[] }[] = []
  for (const f of filas) {
    const last = chunks[chunks.length - 1]
    if (f.grupo && last?.grupo === f.grupo) last.filas.push(f)
    else chunks.push({ grupo: f.grupo, filas: [f] })
  }

  // Colocar las casillas en las columnas: 'gray' = celda sombreada del formulario; null = hueco vacío
  const slots = (f: FilaModelo): (Casilla | 'gray' | null)[] => {
    const cs = f.casillas
    if (cs.length >= n) return cs.slice(0, n)
    if (cs.length === 2 && n === 3) return [cs[0], 'gray', cs[1]]
    return [...Array<null>(n - cs.length).fill(null), ...cs]
  }

  return (
    <div className="px-3 pb-2 sm:px-5">
      {columns.some(Boolean) && (
        <div className="grid gap-x-4 pb-1 pt-3 lg:grid-cols-[minmax(0,17rem)_1fr]">
          <div className="hidden lg:block" />
          <div className={`grid gap-1.5 sm:gap-2 ${cols}`}>
            {columns.map((h, i) => <div key={i} className="truncate text-center text-[10px] font-bold uppercase tracking-wider text-muted sm:text-[11px]">{h}</div>)}
          </div>
        </div>
      )}
      {chunks.map((ch, i) => (
        <div key={i} className="grid gap-x-4 gap-y-2 border-t border-line py-3 first:border-t-0 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-center">
          <div className={`text-sm text-ink ${ch.grupo ? 'font-semibold lg:flex lg:items-center lg:self-stretch lg:rounded-r-xl lg:border-r-2 lg:border-primary/40 lg:pr-3' : 'font-medium'}`}>
            {ch.grupo ?? ch.filas[0].concepto}
          </div>
          <div className="space-y-1.5">
            {ch.filas.map((f) => (
              <div key={f.concepto} className={`grid gap-1.5 sm:gap-2 ${cols}`} title={ch.grupo ? f.concepto : undefined}>
                {slots(f).map((c, j) =>
                  c === 'gray' ? (
                    <div key={`g${j}`} aria-hidden className="min-h-10 rounded-md bg-line/70" />
                  ) : c === null ? (
                    <div key={`e${j}`} aria-hidden />
                  ) : (
                    <Fragment key={c.n}>{render(c)}</Fragment>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const pctOf = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 2 })
/** En móvil, reduce la letra de las cifras largas para que no se corten (en escritorio, tamaño normal) */
const fit = (s: string) => (s.length > 11 ? 'text-[10px]' : s.length > 9 ? 'text-[11px]' : 'text-[13px]') + ' sm:text-sm'

function CasillaBox({ c, value, raw, blank, active, highlight, sheet, variant, onChange, onEnter, onLeave, onPin }: BoxProps) {
  const isText = c.kind === 'text'
  const isInput = c.kind === 'input' || isText
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (focused) inputRef.current?.focus()
  }, [focused])
  // En pantallas estrechas el tipo se muestra compacto ("21 %" en lugar de "21,00 %")
  const pct = (c.rate ?? value ?? 0).toLocaleString('es-ES', { minimumFractionDigits: sheet ? 0 : 2, maximumFractionDigits: 2 })
  // en móvil, sin el símbolo % (la cabecera de la columna ya lo indica)
  const display = c.kind === 'pct' ? (sheet && variant === 'cell' ? pct : `${pct} %`) : blank ? '' : value ? eur(value) : ''
  // Importe escrito: mientras se edita se ve tal cual; al salir, con formato (60.000,00)
  const shown = isText || focused || !raw.trim() || !Number.isFinite(value ?? NaN) ? raw : c.label === 'Tipo %' ? pctOf(value ?? 0) : eur(value ?? 0)
  const wide = c.label.length > 22
  const ring = highlight ? 'border-accent ring-4 ring-accent/40' : active ? 'border-accent ring-2 ring-accent/30' : c.redFlags ? 'border-line hover:border-danger/50' : 'border-line hover:border-primary/50'
  const handlers = {
    id: `cas-${c.n}`,
    'data-casilla': c.n,
    // En pantallas táctiles no hay "hover": la explicación se abre al tocar el número de la casilla
    onMouseEnter: sheet ? undefined : onEnter,
    onMouseLeave: sheet ? undefined : onLeave,
    onClick: (e: React.MouseEvent) => {
      // en móvil, tocar el valor sirve para editarlo; la explicación se abre con el número de casilla
      const t = e.target as HTMLElement
      if (sheet && (t.tagName === 'INPUT' || t.closest('[data-edit]'))) return
      onPin()
    },
  }

  if (variant === 'cell') {
    return (
      <div {...handlers} title={c.label} className={`flex min-h-10 min-w-0 cursor-help items-stretch overflow-hidden rounded-md border bg-surface transition ${ring}`}>
        <span className="flex w-8 shrink-0 flex-col items-center justify-center gap-0.5 bg-[#0b2545] font-mono text-[10.5px] font-semibold text-[#e0bb48] sm:w-9 sm:text-[11px]">
          {c.n}
          {c.redFlags && <AlertTriangle className="h-2.5 w-2.5 text-[#ff8a7e]" aria-label="Tiene red flags" />}
        </span>
        {isInput && !blank && (focused || !raw.trim()) ? (
          <input
            ref={inputRef}
            value={raw}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => { setFocused(true); if (!sheet) onPin() }}
            onBlur={() => setFocused(false)}
            inputMode={isText ? 'text' : 'decimal'}
            aria-label={`Casilla ${c.n}: ${c.label}`}
            placeholder={c.label === 'Tipo %' ? '%' : '0,00'}
            className="w-full min-w-0 bg-transparent px-1.5 text-right font-mono text-[13px] text-ink placeholder:text-muted/50 focus:outline-none sm:px-2 sm:text-sm"
          />
        ) : isInput && !blank ? (
          /* Importe ya escrito: se muestra formateado; al tocarlo pasa a modo edición */
          <button
            type="button"
            data-edit
            onClick={() => setFocused(true)}
            aria-label={`Casilla ${c.n}: ${c.label}, valor ${shown}. Pulsa para editar`}
            className={`flex w-full min-w-0 cursor-text items-center justify-end overflow-hidden whitespace-nowrap px-1.5 font-mono text-ink sm:px-2 ${fit(shown)}`}
          >
            {shown}
          </button>
        ) : (
          <button
            type="button"
            onFocus={onPin}
            aria-label={`Casilla ${c.n}: ${c.label}${display ? `, valor ${display}` : ''}`}
            className={`flex w-full min-w-0 items-center justify-end overflow-hidden whitespace-nowrap px-1.5 font-mono sm:px-2 ${fit(display)} ${c.kind === 'calc' ? 'bg-surface-2 font-semibold text-ink' : 'text-ink'}`}
          >
            {display || ' '}
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      {...handlers}
      className={`group relative flex min-w-[8.5rem] flex-1 cursor-help flex-col rounded-lg border transition ${wide ? 'basis-56' : 'basis-36'} ${ring}`}
    >
      <div className="flex min-h-7 items-center justify-between gap-2 px-2 pt-1.5">
        <span className="min-w-0 truncate text-[11px] font-medium text-muted" title={c.label}>{c.label}</span>
        <span className="flex shrink-0 items-center gap-1">
          {c.redFlags && <AlertTriangle className="h-3 w-3 text-danger" aria-label="Tiene red flags" />}
          <span className="rounded bg-[#0b2545] px-1.5 font-mono text-[11px] font-semibold text-[#e0bb48]">{c.n}</span>
        </span>
      </div>
      {isInput && !blank ? (
        <input
          value={shown}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setFocused(true); if (!sheet) onPin() }}
          onBlur={() => setFocused(false)}
          inputMode={isText ? 'text' : 'decimal'}
          aria-label={`Casilla ${c.n}: ${c.label}`}
          aria-describedby={active ? `tip-${c.n}` : undefined}
          placeholder={isText ? '—' : '0,00'}
          className={`w-full bg-transparent px-2 pb-1.5 pt-0.5 font-mono text-sm text-ink placeholder:text-muted/50 focus:outline-none ${isText ? 'text-left' : 'text-right'}`}
        />
      ) : (
        <button
          type="button"
          onFocus={onPin}
          aria-label={`Casilla ${c.n}: ${c.label}${display ? `, valor ${display}` : ''}`}
          className={`w-full rounded-b-lg px-2 pb-1.5 pt-0.5 text-right font-mono text-sm ${c.kind === 'calc' ? 'bg-surface-2 font-semibold text-ink' : 'text-muted'} ${isInput ? 'min-h-[1.75rem]' : ''}`}
        >
          {display || ' '}
        </button>
      )}
    </div>
  )
}
