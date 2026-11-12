import { AlertTriangle, BookMarked, BookOpen, CornerDownLeft, FileStack, Hash, Search, Wrench, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search, type Group } from '../lib/searchIndex'

const icons: Record<Group, React.ReactNode> = {
  Lecciones: <BookOpen className="h-4 w-4" />,
  Casillas: <Hash className="h-4 w-4" />,
  Modelos: <FileStack className="h-4 w-4" />,
  Glosario: <BookMarked className="h-4 w-4" />,
  'Red flags': <AlertTriangle className="h-4 w-4" />,
  Herramientas: <Wrench className="h-4 w-4" />,
}

const sugerencias = ['casilla 59', 'fraude carrusel', 'cuenta 551', 'titular real', '347 efectivo', 'ratios']

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const results = useMemo(() => search(q), [q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setIdx(0)
      window.setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])
  useEffect(() => setIdx(0), [q])
  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${idx}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [idx])

  const go = (url: string) => {
    setOpen(false)
    setQ('')
    nav(url)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[idx]) go(results[idx].url)
  }

  let lastGroup: Group | null = null

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted hover:border-primary/40 sm:max-w-sm"
        aria-label="Buscar en toda la plataforma">
        <Search className="h-4 w-4" />
        <span className="flex-1 truncate text-left">Buscar lecciones, casillas, términos…</span>
        <kbd className="hidden rounded border border-line bg-surface-2 px-1.5 font-mono text-[10px] sm:inline">Ctrl K</kbd>
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[10vh]" onMouseDown={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Búsqueda global">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl animate-fade-up" onMouseDown={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-5 w-5 text-muted" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
                placeholder="¿Qué es la casilla 27 del 303? ¿Qué es un loan-back?…"
                role="combobox" aria-expanded={results.length > 0} aria-controls="search-results" aria-activedescendant={results[idx] ? `sr-${idx}` : undefined}
                className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none" />
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-muted hover:text-ink"><X className="h-5 w-5" /></button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!q && (
                <div className="p-4">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Prueba con</div>
                  <div className="flex flex-wrap gap-2">
                    {sugerencias.map((s) => <button key={s} onClick={() => setQ(s)} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-ink hover:bg-primary-soft">{s}</button>)}
                  </div>
                </div>
              )}
              {q && !results.length && <p className="p-6 text-center text-sm text-muted">Sin resultados para "{q}".</p>}
              <ul id="search-results" ref={listRef} role="listbox">
                {results.map((r, i) => {
                  const header = r.group !== lastGroup
                  lastGroup = r.group
                  return (
                    <li key={r.url + r.title} role="presentation">
                      {header && <div className="sticky top-0 bg-surface-2 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">{r.group}</div>}
                      <button id={`sr-${i}`} data-i={i} role="option" aria-selected={i === idx}
                        onMouseEnter={() => setIdx(i)} onClick={() => go(r.url)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${i === idx ? 'bg-accent-soft' : ''}`}>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${r.group === 'Red flags' ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary'}`}>{icons[r.group]}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">{r.title}</span>
                          <span className="block truncate text-xs text-muted">{r.subtitle}</span>
                        </span>
                        {i === idx && <CornerDownLeft className="h-4 w-4 text-muted" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
