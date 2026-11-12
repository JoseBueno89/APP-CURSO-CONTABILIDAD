import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { courses } from '../data/courses'

interface ProgressState {
  completed: Record<string, { score: number; total: number; date: string }>
  modelosVistos: string[]
  nombre: string
}

interface ProgressApi extends ProgressState {
  completeLesson: (id: string, score: number, total: number) => void
  markModelo: (id: string) => void
  setNombre: (n: string) => void
  /** Borra el progreso de un curso ('modelos' = biblioteca de modelos) */
  resetCourse: (courseId: string) => void
  courseProgress: (courseId: string) => { done: number; total: number; pct: number }
  reset: () => void
}

const KEY = 'academia-progress-v1'
const empty: ProgressState = { completed: {}, modelosVistos: [], nombre: '' }

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...empty, ...JSON.parse(raw) } : empty
  } catch {
    return empty
  }
}

const Ctx = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [state])

  const completeLesson = useCallback((id: string, score: number, total: number) => {
    setState((s) => {
      const prev = s.completed[id]
      if (prev && prev.score >= score) return s
      return { ...s, completed: { ...s.completed, [id]: { score, total, date: new Date().toISOString() } } }
    })
  }, [])

  const markModelo = useCallback((id: string) => {
    setState((s) => (s.modelosVistos.includes(id) ? s : { ...s, modelosVistos: [...s.modelosVistos, id] }))
  }, [])

  const courseProgress = useCallback(
    (courseId: string) => {
      const c = courses.find((x) => x.id === courseId)
      const ids = c ? c.modules.flatMap((m) => m.lessons.map((l) => l.id)) : []
      const done = ids.filter((id) => state.completed[id]).length
      return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 }
    },
    [state.completed],
  )

  const setNombre = useCallback((nombre: string) => setState((s) => ({ ...s, nombre })), [])

  const resetCourse = useCallback((courseId: string) => {
    if (courseId === 'modelos') {
      setState((s) => ({ ...s, modelosVistos: [] }))
      return
    }
    const c = courses.find((x) => x.id === courseId)
    if (!c) return
    const ids = new Set(c.modules.flatMap((m) => m.lessons.map((l) => l.id)))
    setState((s) => ({ ...s, completed: Object.fromEntries(Object.entries(s.completed).filter(([k]) => !ids.has(k))) }))
  }, [])

  const reset = useCallback(() => setState(empty), [])

  const api = useMemo(
    () => ({ ...state, completeLesson, markModelo, setNombre, resetCourse, courseProgress, reset }),
    [state, completeLesson, markModelo, setNombre, resetCourse, courseProgress, reset],
  )
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useProgress() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useProgress fuera de ProgressProvider')
  return v
}
