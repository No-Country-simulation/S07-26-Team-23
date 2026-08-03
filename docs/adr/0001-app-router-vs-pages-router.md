# ADR 0001: App Router vs Pages Router y definición de arquitectura

- **Estado:** Aceptada
- **Fecha:** 2026-08-03
- **Alcance:** Spike técnico (Tarea 2) — elegir el router de Next.js para PhysaFlow y dejar definida la arquitectura del proyecto.

## Contexto

PhysaFlow es un reporte web (Stranded Capacity Index) construido con Next.js 16.2.12 y React 19.2.4. Al iniciar este spike, el repo ya tenía **dos aplicaciones Next.js paralelas**, ambas usando App Router (no existe ni una sola carpeta `pages/` en todo el repo):

- `src/app` en la raíz del repositorio: prototipo con el diseño visual ya resuelto (tipografía, colores, `TableOfContents` con scroll-spy, `LayerBadge`), pero sin conexión a datos reales y fuera del pipeline de CI.
- `frontend/app`: la app que realmente construye y lintea `.github/workflows/ci.yml`. Tiene la capa de datos (`frontend/lib/data.ts`, `frontend/lib/types.ts`), contenido en Markdown por sección (`frontend/content/*.md`, aún vacíos) y dependencias orientadas a un reporte descargable (`react-pdf`, `zod`, `gray-matter`).

Además, `backend/data/*.json` no es un servidor: son archivos estáticos (`citations.json`, `methodology.json`, `palette.json`, `taxonomy.json`) que se leen por filesystem. No hay ningún proceso de backend independiente en el repo.

El `AGENTS.md` del proyecto advierte que esta versión de Next.js puede tener cambios de ruptura respecto a lo que un modelo entrenado antes conocería, y pide revisar `node_modules/next/dist/docs/` antes de escribir código. Se revisó esa documentación empaquetada (Next 16.2.12) como fuente de verdad para este spike.

## Comparación: App Router vs Pages Router

| | **App Router** (`app/`) | **Pages Router** (`pages/`) |
|---|---|---|
| Estado en Next 16 | Router recomendado, con las features nuevas | Sigue soportado, en modo mantenimiento/mejoras incrementales |
| Versión de React | React canary embebido (RSC, Suspense, Server Functions) | La que declares en `package.json` |
| Componentes por defecto | Server Components (no envían JS al cliente salvo `"use client"`) | Todo es Client Component |
| Layouts anidados | Nativos (`layout.tsx` por segmento, se preservan entre navegaciones) | Manuales, vía `_app.tsx` / composición a mano |
| Data fetching en servidor | `async` directo en Server Components (`fs`, `gray-matter`, etc. sin exponer al cliente) | `getStaticProps` / `getServerSideProps` por página |
| Backend endpoints propios | Route Handlers (`app/api/**/route.ts`) | API Routes (`pages/api/**`) |
| Streaming / carga parcial | Soportado de forma nativa con `Suspense` | Limitado |
| Ecosistema/migraciones | Es hacia donde migra el ecosistema (Vercel, docs, ejemplos) | Next.js documenta el Pages Router como "el router original", ya no el foco de features nuevas |

Fuente: `node_modules/next/dist/docs/index.md` y `node_modules/next/dist/docs/02-pages/index.md` de este mismo repo — cita textual: *"Before Next.js 13, the Pages Router was the main way to create routes in Next.js. It's still supported [...] but we recommend migrating to the new App Router."*

## Decisión

**Usar App Router.** No es una migración: es formalizar lo que ya está en la práctica — las dos apps del repo ya usan `app/`. Ningún caso de uso identificado (reporte con contenido en Markdown, exportación a PDF, datos estáticos por `fs`) requiere algo que solo el Pages Router resuelva mejor; al contrario, Server Components encajan naturalmente con leer `content/*.md` y `backend/data/*.json` en el servidor sin mandar ese código al cliente.

## Definición de arquitectura

1. **Una sola app Next.js, no dos.** `frontend/` es la candidata a ser la única: es la que construye CI y la que tiene la capa de datos real. `src/app` (raíz) queda identificada como duplicado a resolver — su diseño visual y componentes (`TableOfContents`, `LayerBadge`) ya se portaron a `frontend/` como parte de la Tarea 1 (ruta `/reporte`). **No se borra en este spike**: eliminar código es una acción que requiere confirmación explícita aparte; queda como recomendación y siguiente paso.
2. **Server Components por defecto.** Las páginas que leen contenido (`content/*.md` vía `gray-matter`, `backend/data/*.json` vía `fs`) se mantienen como Server Components async. `"use client"` se reserva para lo que necesita interactividad en el navegador: `TableOfContents` (usa `IntersectionObserver` + estado), y en el futuro `InteractiveTaxonomyChart`.
3. **`backend/data/` sigue siendo estático, no un servicio HTTP.** Mientras no haya mutaciones ni autenticación, no se justifica un backend separado: se sigue leyendo por filesystem desde Server Components/Route Handlers. Si en el futuro se necesita (por ejemplo, un endpoint consumido por un tercero), se resuelve con un Route Handler (`app/api/**/route.ts`) sin salir de la misma app Next.js.
4. **Exportación a PDF (`react-pdf`, `scripts/generate-pdf.mjs`, hoy vacío).** Se recomienda implementarlo como Route Handler que genera el PDF on-demand a partir del mismo `content/`, en vez de un script de build separado — reutiliza la misma fuente de datos que ya renderiza `/reporte` y corre en Node por defecto en App Router.
5. **Validación de contenido (`scripts/validate-content.mjs`, hoy vacío).** Debería incorporarse al job de CI existente (`.github/workflows/ci.yml`) junto a la validación de JSON de `backend/data`, para no permitir que se mergee contenido Markdown con frontmatter roto.

## Consecuencias

- Queda un ADR versionado en `docs/adr/` para futuras decisiones de arquitectura del equipo.
- Pendiente (fuera de este spike, requiere decisión del equipo): qué hacer con `src/app` en la raíz — deprecarlo/eliminarlo una vez confirmado que `frontend/` cubre todo lo que tenía.
- Pendiente: decidir si `scripts/build-metadata.mjs`, `generate-pdf.mjs` y `validate-content.mjs` (hoy stubs vacíos) se implementan como Route Handlers/scripts de Node dentro de `frontend/`, siguiendo el punto 4 y 5 de arriba.
