import { useState } from 'react'
import { Award, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import type { QuizQuestion } from '../types'

export default function Quiz({ questions, onFinish }: { questions: QuizQuestion[]; onFinish: (score: number, total: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)
  const score = answers.filter((a, i) => a === questions[i].correct).length
  const allAnswered = answers.every((a) => a !== null)

  const submit = () => {
    setSubmitted(true)
    onFinish(score, questions.length)
  }

  return (
    <section className="mt-12 rounded-2xl border border-line bg-surface p-6 shadow-sm" aria-labelledby="quiz-title">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft"><Award className="h-5 w-5 text-accent" /></div>
        <div>
          <h2 id="quiz-title" className="text-lg font-bold text-ink">Autoevaluación</h2>
          <p className="text-sm text-muted">Acierta al menos la mitad para completar la lección.</p>
        </div>
      </div>

      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={i}>
            <p className="mb-3 font-semibold text-ink">{i + 1}. {q.q}</p>
            <div className="grid gap-2" role="radiogroup">
              {q.options.map((o, j) => {
                const chosen = answers[i] === j
                const right = submitted && j === q.correct
                const wrong = submitted && chosen && j !== q.correct
                return (
                  <button
                    key={j}
                    role="radio"
                    aria-checked={chosen}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => a.map((x, k) => (k === i ? j : x)))}
                    className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition ${
                      right ? 'border-ok bg-ok-soft' : wrong ? 'border-danger bg-danger-soft' : chosen ? 'border-primary bg-primary-soft' : 'border-line hover:border-primary/40'
                    }`}
                  >
                    <span className="text-ink">{o}</span>
                    {right && <CheckCircle2 className="h-4 w-4 text-ok" />}
                    {wrong && <XCircle className="h-4 w-4 text-danger" />}
                  </button>
                )
              })}
            </div>
            {submitted && <p className="mt-2 rounded-lg bg-surface-2 p-3 text-sm text-ink/90 animate-fade-up">{q.explanation}</p>}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!submitted ? (
          <button disabled={!allAnswered} onClick={submit} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-[#0b2545] shadow disabled:cursor-not-allowed disabled:opacity-40">
            Corregir y completar
          </button>
        ) : (
          <>
            <div className="text-lg font-bold text-ink">Resultado: {score}/{questions.length}</div>
            <span className={`text-sm font-semibold ${score / questions.length >= 0.5 ? 'text-ok' : 'text-danger'}`}>
              {score / questions.length >= 0.5 ? 'Lección completada' : 'Necesitas acertar al menos la mitad para completar la lección'}
            </span>
            <button onClick={() => { setSubmitted(false); setAnswers(questions.map(() => null)) }} className="flex items-center gap-1 text-sm text-muted hover:text-ink">
              <RotateCcw className="h-4 w-4" /> Repetir
            </button>
          </>
        )}
      </div>
    </section>
  )
}
