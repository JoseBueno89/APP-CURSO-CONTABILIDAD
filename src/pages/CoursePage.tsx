import { CheckCircle2, ChevronRight, Clock, Hourglass, PlayCircle } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCourse } from '../data/courses'
import { useProgress } from '../lib/progress'
import { CourseIcon, Pill, ProgressBar } from '../components/ui'
import ResetCourse from '../components/ResetCourse'

export default function CoursePage() {
  const { courseId = '' } = useParams()
  const course = getCourse(courseId)
  const { courseProgress, completed } = useProgress()
  if (!course) return <Navigate to="/" replace />
  const p = courseProgress(course.id)
  const firstPending = course.modules.flatMap((m) => m.lessons).find((l) => !completed[l.id])
  const iconBox = course.color === 'teal' ? 'bg-teal-soft text-teal' : 'bg-primary-soft text-primary'

  return (
    <div className="animate-fade-up">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted" aria-label="Migas de pan">
        <Link to="/" className="hover:text-ink">Inicio</Link><ChevronRight className="h-4 w-4" /><span className="text-ink">{course.code}</span>
      </nav>

      <header className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${iconBox}`}><CourseIcon icon={course.icon} className="h-8 w-8" /></div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Curso {course.code.slice(1)}</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{course.title}</h1>
          <p className="mt-2 text-muted">{course.description}</p>
          <div className="mt-4 max-w-md">
            <div className="mb-1.5 flex justify-between text-xs text-muted"><span>{p.done} de {p.total} lecciones disponibles completadas</span><span>{p.pct}%</span></div>
            <ProgressBar value={p.pct} tone={course.color === 'teal' ? 'teal' : 'accent'} />
          </div>
        </div>
        {firstPending && (
          <Link to={`/curso/${course.id}/${firstPending.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-[#0b2545] shadow">
            <PlayCircle className="h-5 w-5" /> {p.done ? 'Continuar' : 'Empezar'}
          </Link>
        )}
      </header>

      <ol className="mt-8 space-y-4">
        {course.modules.map((m, i) => (
          <li key={m.id} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 font-mono text-sm font-semibold text-ink">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-ink">{m.title}</h2>
                  {m.lessons.length === 0 && <Pill tone="warn"><Hourglass className="h-3 w-3" /> En preparación</Pill>}
                </div>
                <p className="mt-1 text-sm text-muted">{m.description}</p>
                {m.lessons.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {m.lessons.map((l) => {
                      const c = completed[l.id]
                      return (
                        <li key={l.id}>
                          <Link to={`/curso/${course.id}/${l.id}`} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 transition hover:border-primary/40 hover:bg-surface-2">
                            {c ? <CheckCircle2 className="h-5 w-5 shrink-0 text-ok" /> : <PlayCircle className="h-5 w-5 shrink-0 text-primary" />}
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-ink">{l.title}</div>
                              <div className="text-xs text-muted">{l.summary}</div>
                            </div>
                            <span className="hidden items-center gap-1 text-xs text-muted sm:flex"><Clock className="h-3.5 w-3.5" /> {l.minutes} min</span>
                            {c && <Pill tone="ok">{c.score}/{c.total}</Pill>}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {course.modules[0]?.lessons[0] && (
        <ResetCourse courseId={course.id} startUrl={`/curso/${course.id}/${course.modules[0].lessons[0].id}`} />
      )}
    </div>
  )
}
