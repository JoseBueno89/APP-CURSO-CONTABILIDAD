import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../lib/progress'

interface Props {
  courseId: string
  /** Ruta a la que ir tras reiniciar (normalmente, la primera lección) */
  startUrl: string
  compact?: boolean
}

/** Bloque "Reiniciar curso" con confirmación en dos pasos */
export default function ResetCourse({ courseId, startUrl, compact }: Props) {
  const { resetCourse } = useProgress()
  const [confirm, setConfirm] = useState(false)
  const nav = useNavigate()

  const doReset = () => {
    resetCourse(courseId)
    setConfirm(false)
    nav(startUrl)
  }

  return (
    <section className={`no-print rounded-2xl border border-line bg-surface shadow-sm ${compact ? 'p-4' : 'mt-8 p-5 sm:p-6'}`} aria-live="polite">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><RotateCcw className="h-5 w-5" /></div>
          <div>
            <h2 className="font-bold text-ink">¿Quieres empezar de nuevo?</h2>
            <p className="text-sm text-muted">
              {confirm
                ? 'Se borrará el progreso y las puntuaciones de este curso (y su insignia). Esta acción no se puede deshacer.'
                : 'Reinicia el curso para repasarlo desde la primera lección.'}
            </p>
          </div>
        </div>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            <RotateCcw className="h-4 w-4" /> Reiniciar curso
          </button>
        ) : (
          <div className="flex shrink-0 gap-2">
            <button onClick={() => setConfirm(false)} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">Cancelar</button>
            <button onClick={doReset} className="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white dark:text-[#0a1220]">Sí, reiniciar</button>
          </div>
        )}
      </div>
    </section>
  )
}
