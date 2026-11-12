import { Award, CheckCircle2, Download, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { courses } from '../data/courses'
import { curso3Meta } from '../data/curso2-iva'
import { modelos } from '../data/modelos'
import { useProgress } from '../lib/progress'
import { PageHeader, ProgressBar } from '../components/ui'

interface CertDef { id: string; title: string; detail: string; pct: number; horas: number }

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0).toString(36).toUpperCase().padStart(7, '0')
}

export default function CertificadoPage() {
  const { courseProgress, modelosVistos, completed, nombre, setNombre } = useProgress()

  const disponibles = modelos.filter((m) => m.disponible)
  const vistos = disponibles.filter((m) => modelosVistos.includes(m.id)).length
  const pctModelos = disponibles.length ? Math.round((vistos / disponibles.length) * 100) : 0

  const minutos = (cid: string) => courses.find((c) => c.id === cid)!.modules.reduce((s, m) => s + m.lessons.reduce((x, l) => x + l.minutes, 0), 0)
  const certs: CertDef[] = [
    ...courses.map((c) => ({ id: c.id, title: c.title, detail: `${c.modules.length} módulos`, pct: courseProgress(c.id).pct, horas: Math.ceil(minutos(c.id) / 60) + 1 })),
    { id: 'modelos', title: curso3Meta.title, detail: `${disponibles.length} modelos interactivos`, pct: pctModelos, horas: 2 },
  ]
  const total = Math.round(certs.reduce((s, c) => s + c.pct, 0) / certs.length)
  certs.push({ id: 'programa', title: 'Programa completo: Contabilidad e Impuestos para la Investigación Financiera', detail: 'Los tres cursos', pct: total, horas: certs.reduce((s, c) => s + c.horas, 0) })

  const [sel, setSel] = useState(certs[0].id)
  const cert = certs.find((c) => c.id === sel)!
  const unlocked = cert.pct === 100
  const canPrint = unlocked && nombre.trim().length > 2

  const fechas = Object.values(completed).map((c) => c.date).sort()
  const fecha = new Date(fechas[fechas.length - 1] ?? Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  const codigo = `AF-${hash(nombre.trim().toLowerCase() + cert.id)}`

  return (
    <div className="animate-fade-up">
      <style>{`@page { size: A4 landscape; margin: 0; }`}</style>
      <div>
        <div className="no-print">
          <PageHeader eyebrow="Logros" title="Certificados">
            Completa un curso para desbloquear su certificado y descárgalo en PDF. Escribe tu nombre tal y como quieres que aparezca.
          </PageHeader>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] print:block">
          <div className="no-print space-y-3">
            <label className="block rounded-2xl border border-line bg-surface p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Nombre completo</span>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellidos"
                className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none" />
            </label>
            {certs.map((c) => (
              <button key={c.id} onClick={() => setSel(c.id)} aria-pressed={sel === c.id}
                className={`w-full rounded-2xl border p-4 text-left transition ${sel === c.id ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-primary/40'}`}>
                <div className="flex items-start gap-3">
                  {c.pct === 100 ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ok" /> : <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted" />}
                  <div className="flex-1">
                    <div className="text-sm font-semibold leading-snug text-ink">{c.title}</div>
                    <div className="mb-2 mt-0.5 text-xs text-muted">{c.detail} · {c.pct}%</div>
                    <ProgressBar value={c.pct} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div>
            <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">{unlocked ? (nombre.trim().length > 2 ? 'Certificado listo para descargar.' : 'Escribe tu nombre para poder descargarlo.') : 'Vista previa: completa el curso para desbloquearlo.'}</p>
              <button onClick={() => window.print()} disabled={!canPrint}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#0b2545] shadow disabled:cursor-not-allowed disabled:opacity-40">
                <Download className="h-4 w-4" /> Descargar PDF
              </button>
            </div>
            <p className="no-print mb-3 text-xs text-muted">En el diálogo de impresión, elige <strong className="text-ink">"Guardar como PDF"</strong> y activa los <strong className="text-ink">gráficos de fondo</strong>.</p>

      {/* Certificado (visible en pantalla e impresión) */}
      <div>
        <div className={`cert relative mx-auto aspect-[297/210] w-full overflow-hidden bg-white text-[#0b2545] shadow-xl print:aspect-auto print:h-[209mm] print:w-[297mm] print:shadow-none ${unlocked ? '' : 'print:hidden'}`}
          style={{ containerType: 'inline-size' }}>
          <div className="absolute inset-[2.5cqw] border-[0.35cqw] border-[#0b2545]" />
          <div className="absolute inset-[3.4cqw] border-[0.15cqw] border-[#c9a227]" />
          <div className="absolute left-0 top-0 h-[18cqw] w-[18cqw] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#0b2545]" />
          <div className="absolute bottom-0 right-0 h-[18cqw] w-[18cqw] translate-x-1/2 translate-y-1/2 rotate-45 bg-[#c9a227]" />

          <div className="relative flex h-full flex-col items-center justify-center px-[10cqw] text-center">
            <div className="flex items-center gap-[1cqw]">
              <div className="flex h-[5cqw] w-[5cqw] items-center justify-center rounded-[1cqw] bg-[#0b2545] text-[#c9a227]"><ShieldCheck className="h-[3.2cqw] w-[3.2cqw]" /></div>
              <div className="text-left leading-tight">
                <div className="text-[2cqw] font-extrabold">Academia Fiscal</div>
                <div className="text-[1.1cqw] uppercase tracking-[0.2em] text-[#5a6b82]">Investigación financiera</div>
              </div>
            </div>
            <div className="mt-[3cqw] text-[1.3cqw] font-bold uppercase tracking-[0.35em] text-[#c9a227]">Certificado de aprovechamiento</div>
            <div className="mt-[2.2cqw] text-[1.5cqw] text-[#5a6b82]">Se certifica que</div>
            <div className="mt-[0.8cqw] min-h-[4.5cqw] border-b-[0.15cqw] border-[#c9a227] px-[3cqw] text-[3.8cqw] font-extrabold leading-tight">{nombre.trim() || 'Nombre del alumno'}</div>
            <div className="mt-[2cqw] text-[1.5cqw] text-[#5a6b82]">ha completado satisfactoriamente</div>
            <div className="mt-[0.8cqw] max-w-[70cqw] text-[2.2cqw] font-bold leading-snug">{cert.title}</div>
            <div className="mt-[1cqw] text-[1.3cqw] text-[#5a6b82]">{cert.detail} · Duración estimada: {cert.horas} horas</div>

            <div className="mt-[4cqw] grid w-full grid-cols-3 items-end text-[1.15cqw]">
              <div className="text-left"><div className="font-semibold">{fecha}</div><div className="mt-[0.3cqw] text-[#5a6b82]">Fecha</div></div>
              <div className="flex justify-center"><div className="flex h-[7cqw] w-[7cqw] items-center justify-center rounded-full border-[0.3cqw] border-[#c9a227] bg-[#fbf3d9]"><Award className="h-[4cqw] w-[4cqw] text-[#c9a227]" /></div></div>
              <div className="text-right"><div className="font-mono font-semibold">{codigo}</div><div className="mt-[0.3cqw] text-[#5a6b82]">Código de certificado</div></div>
            </div>
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <span className="rotate-[-12deg] rounded-[1cqw] border-[0.4cqw] border-[#c0392b] px-[3cqw] py-[1cqw] text-[4cqw] font-extrabold uppercase text-[#c0392b]">Pendiente</span>
            </div>
          )}
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  )
}
