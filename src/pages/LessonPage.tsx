import { ArrowLeft, ArrowRight, ChevronRight, Clock } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { findLesson } from '../data/courses'
import { useProgress } from '../lib/progress'
import BlockRenderer from '../components/BlockRenderer'
import Quiz from '../components/Quiz'
import { Pill } from '../components/ui'

export default function LessonPage() {
  const { courseId = '', lessonId = '' } = useParams()
  const found = findLesson(courseId, lessonId)
  const { completeLesson, completed } = useProgress()
  if (!found) return <Navigate to={`/curso/${courseId}`} replace />
  const { course, module, lesson, prev, next } = found

  return (
    <article key={lesson.id} className="mx-auto max-w-3xl animate-fade-up">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted" aria-label="Migas de pan">
        <Link to="/" className="hover:text-ink">Inicio</Link><ChevronRight className="h-4 w-4" />
        <Link to={`/curso/${course.id}`} className="hover:text-ink">{course.code}</Link><ChevronRight className="h-4 w-4" />
        <span className="text-ink">{module.title}</span>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Pill tone={course.color === 'teal' ? 'teal' : 'accent'}>{course.title}</Pill>
          <Pill><Clock className="h-3 w-3" /> {lesson.minutes} min</Pill>
          {completed[lesson.id] && <Pill tone="ok">Completada</Pill>}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{lesson.title}</h1>
        <p className="mt-3 text-lg text-muted">{lesson.summary}</p>
      </header>

      <BlockRenderer blocks={lesson.blocks} />

      <Quiz questions={lesson.quiz} onFinish={(s, t) => { if (s / t >= 0.5) completeLesson(lesson.id, s, t) }} />

      <div className="mt-10 flex justify-between gap-4 border-t border-line pt-6">
        {prev ? (
          <Link to={`/curso/${course.id}/${prev.id}`} className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">{prev.title}</span><span className="sm:hidden">Anterior</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/curso/${course.id}/${next.id}`} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface dark:text-[#0a1220]">
            <span className="hidden sm:inline">{next.title}</span><span className="sm:hidden">Siguiente</span> <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link to={`/curso/${course.id}`} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface dark:text-[#0a1220]">Volver al curso</Link>
        )}
      </div>
    </article>
  )
}
