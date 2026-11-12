import { Fragment } from 'react'

/** Renderiza texto con **negritas** sin usar HTML crudo. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}

// useGrouping 'always': en español Intl no agrupa los números de 4 cifras (1050,00) salvo que se fuerce
const fmt = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: 'always',
} as unknown as Intl.NumberFormatOptions)

export const eur = (n: number) => fmt.format(n)
