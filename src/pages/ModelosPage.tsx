import { ArrowRight, CheckCircle2, FileText, Hourglass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { modelos } from '../data/modelos'
import { curso3Meta } from '../data/curso2-iva'
import { useProgress } from '../lib/progress'
import { PageHeader, Pill } from '../components/ui'
import ResetCourse from '../components/ResetCourse'

export default function ModelosPage() {
  const { modelosVistos } = useProgress()
  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Curso 3" title={curso3Meta.title}>
        {curso3Meta.description} Pasa el ratón (o pulsa) sobre cualquier casilla para ver qué significa, de dónde sale el dato y qué puede revelar en una investigación.
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modelos.map((m) => {
          const inner = (
            <>
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-[#0b2545] px-3 py-2 font-mono text-lg font-semibold text-[#e0bb48]">{m.numero}</div>
                {m.disponible ? (
                  modelosVistos.includes(m.id) ? <Pill tone="ok"><CheckCircle2 className="h-3 w-3" /> Explorado</Pill> : <Pill tone="accent">Disponible</Pill>
                ) : (
                  <Pill tone="warn"><Hourglass className="h-3 w-3" /> En preparación</Pill>
                )}
              </div>
              <h2 className="mt-4 font-bold text-ink">{m.nombre}</h2>
              <p className="mt-1 text-xs font-medium text-muted">{m.impuesto} · {m.periodicidad}</p>
              <p className="mt-3 flex-1 text-sm text-ink/80">{m.descripcion}</p>
              {m.disponible && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  <FileText className="h-4 w-4" /> Abrir modelo interactivo <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </>
          )
          const cls = 'flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm'
          return m.disponible ? (
            <Link key={m.id} to={`/modelos/${m.id}`} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-lg`}>{inner}</Link>
          ) : (
            <div key={m.id} className={`${cls} opacity-80`}>{inner}</div>
          )
        })}
      </div>

      <ResetCourse courseId="modelos" startUrl="/modelos/303" />
    </div>
  )
}
