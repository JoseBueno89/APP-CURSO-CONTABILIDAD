# Academia Fiscal · Formación para investigación financiera

Webapp de formación en contabilidad, IVA y modelos tributarios para equipos de investigación de blanqueo de capitales.

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # versión estática en /dist (se puede abrir desde cualquier servidor web)
```

## Publicación (GitHub Pages)

Cada `push` a la rama `main` compila y publica la app automáticamente
(`.github/workflows/deploy.yml`). Dirección pública:

**https://josebueno89.github.io/APP-CURSO-CONTABILIDAD/**

Requisito único: en GitHub → *Settings → Pages → Source* = **GitHub Actions**.

## Instalar en el móvil (PWA)

- **Android (Chrome):** abrir la dirección → menú ⋮ → *Instalar aplicación*.
- **iPhone / iPad (Safari):** abrir la dirección → botón *Compartir* → *Añadir a pantalla de inicio*.

Una vez abierta con conexión, funciona también sin conexión. El progreso se guarda en cada dispositivo.

## Historial de versiones

- **1.01** — Tooltips de casillas recolocados (escritorio) y como panel inferior (móvil); diagrama del
  fraude carrusel sin solapamientos y con versión móvil; corrección del desplazamiento horizontal en
  móvil y del botón de modo oscuro; buscador global a pantalla completa; las lecciones exigen acertar
  al menos la mitad del quiz; separador de miles uniforme; versión visible en el menú.
  Botón "Reiniciar curso" al final de cada curso; fraude carrusel como círculo de sociedades con
  flechas animadas; modelo 303 con la disposición del formulario oficial (filas Base | Tipo | Cuota,
  casillas 150-170, 123-124, 62-63, 74-75, 76, 108, 109 y fórmulas oficiales de 27, 64, 69 y 71);
  390 en columnas Base | Cuota; importes formateados al salir de la casilla.
- **1.0** — Versión inicial.

## Estructura

```
src/
  data/                     ← TODO el contenido (editable sin tocar componentes)
    curso1-contabilidad.ts  ← lecciones, bloques y quizzes del Curso 1
    curso2-iva.ts           ← Curso 2 + metadatos del Curso 3
    modelos/m303.ts         ← casillas, tooltips y motor de cálculo del 303
    modelos/index.ts        ← catálogo de modelos
    glosario.ts, redflags.ts
  components/
    interactive/            ← PGC, simulador de asientos, balance, cadena IVA
    CasillaTooltip.tsx      ← tooltip de casilla
  pages/                    ← Inicio, Curso, Lección, Modelos, Glosario, Red Flags
```

### Añadir una lección
Añade un objeto `Lesson` en el módulo correspondiente de `src/data/curso*.ts`. Los bloques admiten
`p`, `h`, `list`, `table`, `callout` (info | analogia | investigacion | redflag | ejemplo) e `interactive`.
Usa `**texto**` para negritas.

### Añadir un modelo
Crea `src/data/modelos/mXXX.ts` siguiendo `m303.ts`, regístralo en `modelos/index.ts` (con `disponible: true`)
y, si tiene casillas calculadas, añade su función a `computeFns`.

> Las casillas reproducen la estructura del modelo vigente con fines didácticos. Revisa cada ejercicio
> contra las instrucciones oficiales de la AEAT.
