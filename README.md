# Prueba técnica Front-end — Didacteca

Aplicación web de **Rick and Morty** construida con Next.js App Router. Consulta la [API GraphQL oficial](https://rickandmortyapi.com/graphql), muestra personajes con búsqueda y paginación, gestiona favoritos persistentes y ofrece una vista de detalle por personaje.

## Funcionalidades

### Listado (`/`)

- Búsqueda por nombre con `useDeferredValue` (evita peticiones en cada tecla).
- Paginación sobre los resultados de la API.
- Vista **tarjeta** o **lista** (`ViewToggle`).
- Gráfico de distribución por **especie** (Recharts) según la página actual.
- Tarjetas con imagen, estado, especie y botón de **favoritos**.
- Enlace al detalle en `/character/[id]`.
- Estados de carga, error y sin resultados con transiciones (Framer Motion).

### Favoritos (`/favorites`)

- Hasta **5** personajes favoritos (`MAX_FAVORITES`).
- Persistencia del **orden** en `localStorage` (Zustand + `persist`).
- Reordenamiento con flechas arriba/abajo.
- Carga de datos con `charactersByIds` respetando el orden del store.
- Vista tarjeta o lista, igual que el listado principal.
- Aviso al alcanzar el máximo: al añadir otro desde el listado se elimina el último del orden.

### Detalle (`/character/[id]`)

- Datos adicionales: **origen**, **ubicación** y **número de episodios**.
- Imagen, nombre, especie, género y badge de estado.
- Botón de favoritos integrado con el mismo store global.
- Validación de ID y pantalla de personaje no encontrado.

## Stack

| Tecnología                      | Uso                                        |
| ------------------------------- | ------------------------------------------ |
| **Next.js 16** + **TypeScript** | App Router, rutas y metadatos              |
| **React 19**                    | UI                                         |
| **Tailwind CSS 4**              | Estilos                                    |
| **Apollo Client 4**             | Cliente GraphQL                            |
| **Zustand**                     | Favoritos (orden + persistencia)           |
| **Recharts**                    | Gráfico de especies en el listado          |
| **Framer Motion**               | Animaciones de entrada y cambios de estado |
| **tailwind-merge**              | Utilidad `cn` para combinar clases         |

## Requisitos

- Node.js **20+**
- npm

## Instalación

```bash
npm install
```

Variables de entorno (obligatorio antes de usar Apollo):

```bash
# macOS / Linux
cp .env.example .env.local

# Windows (PowerShell)
Copy-Item .env.example .env.local
```

Contenido de `.env.example`:

```env
NEXT_PUBLIC_GRAPHQL_URL=https://rickandmortyapi.com/graphql
```

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
src/
├── app/                          # App Router
│   ├── page.tsx                  # Listado principal (/)
│   ├── favorites/page.tsx        # Favoritos (/favorites)
│   ├── character/[id]/page.tsx   # Detalle (/character/[id])
│   ├── layout.tsx                # Layout raíz (header, footer, providers)
│   └── globals.css
├── components/
│   ├── characters/               # Listado, filtros, gráfico, hooks
│   │   ├── subcomponentes/
│   │   └── hooks/
│   ├── characters-detail/        # Vista de detalle
│   │   ├── subcomponentes/       # CharacterDetailCard
│   │   └── hooks/
│   ├── favorites/                # Listado de favoritos y reordenamiento
│   │   ├── subcomponentes/
│   │   └── hooks/
│   ├── layout/                   # SiteHeader, SiteNav, SiteFooter, ScrollToTop
│   ├── providers/                # ApolloProvider, Providers
│   └── ui/
│       ├── primitives/           # Button, Card, Badge, Spinner, etc.
│       └── compounds/            # CardItem, ListItem, ViewToggle
├── constants/                    # favoritos, animaciones
├── graphql/queries/              # GET_CHARACTERS, GET_CHARACTERS_BY_IDS, GET_CHARACTER
├── lib/                          # apollo-client, cn
├── store/                        # useFavoritesStore (Zustand)
├── types/                        # rick-and-morty.ts
└── utils/                        # async-content-key, character-status, etc.
```

## Rutas

| Ruta              | Descripción                                      |
| ----------------- | ------------------------------------------------ |
| `/`               | Listado con búsqueda, paginación y gráfico       |
| `/favorites`      | Favoritos ordenables (máx. 5)                    |
| `/character/[id]` | Detalle: origen, ubicación, episodios, favoritos |

## Estrategias de renderizado (Next.js App Router)

Cada ruta combina **shell en servidor** (SSG/ISR) con **islas cliente** (CSR) donde hace falta interactividad o `localStorage`.

| Ruta              | Shell (servidor) | Datos / UI interactiva  | Estrategia                                                            |
| ----------------- | ---------------- | ----------------------- | --------------------------------------------------------------------- |
| `/`               | SSG              | CSR — Apollo, búsqueda  | `dynamic = 'force-static'` + `CharacterList` (`'use client'`)         |
| `/favorites`      | SSG              | CSR — Zustand + Apollo  | `dynamic = 'force-static'`; favoritos solo en navegador               |
| `/character/[id]` | ISR (1 h)        | CSR — Apollo en detalle | `revalidate = 3600`, `generateStaticParams` (IDs 1–20), `loading.tsx` |

- **SSG**: `/` y `/favorites` se prerenderizan en build; el HTML inicial incluye layout, cabecera y textos estáticos.
- **ISR**: `/character/[id]` regenera metadatos y rutas pregeneradas cada hora (`revalidate = 3600` en `src/app/character/[id]/page.tsx`). IDs fuera del rango inicial se sirven bajo demanda (`dynamicParams = true`).
- **CSR**: listados, filtros, favoritos y detalle consumen GraphQL con Apollo Client en el cliente (`src/components/providers/`).
- **SSR / streaming**: `src/app/character/[id]/loading.tsx` muestra spinner mientras resuelve el segmento dinámico.

Peticiones GraphQL en servidor (metadatos, ISR): `src/lib/graphql-server.ts`. En cliente: Apollo (`src/lib/apollo-client.ts`).

## GraphQL

Queries en `src/graphql/queries/`:

| Query                | Uso                                             |
| -------------------- | ----------------------------------------------- |
| `GetCharacters`      | Listado paginado con filtro opcional por nombre |
| `GetCharactersByIds` | Personajes favoritos por lista de IDs           |
| `GetCharacter`       | Detalle por ID (origen, ubicación, episodios)   |

Documentación de la API: [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)

### Caché (Apollo Client)

Un único cliente en `ApolloProvider` comparte la caché entre todas las rutas (`cache-first` por defecto).

| Campo / query          | Clave de caché                                     | Comportamiento                                                     |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| `characters` (listado) | `page` + `filter` (búsqueda)                       | Cada página y filtro es una entrada; volver atrás reutiliza datos. |
| `character` (detalle)  | `id`                                               | Mismo personaje no repite red al revisitar la ruta.                |
| `charactersByIds`      | IDs **ordenados** (mismo conjunto = misma entrada) | Reordenar favoritos no dispara refetch; añadir o quitar sí.        |

Políticas en `src/lib/apollo-cache.ts`. Los personajes se normalizan por `id` entre listado, favoritos y detalle cuando la API devuelve `__typename`.

## Estado global (favoritos)

El store `useFavoritesStore` (`src/store/useFavoritesStore.ts`) expone:

- `toggleFavorite(id)` — añadir o quitar favorito.
- `isFavorite(id)` — comprobar si está en la lista.
- `moveFavoriteUp` / `moveFavoriteDown` — reordenar en `/favorites`.
- Persistencia en `localStorage` bajo la clave `rick-morty-favorites`.

## Calidad de código

| Herramienta            | Rol                                                       |
| ---------------------- | --------------------------------------------------------- |
| **Prettier**           | Formato + orden de clases (`prettier-plugin-tailwindcss`) |
| **ESLint**             | Next.js Core Web Vitals, TypeScript, Prettier             |
| **better-tailwindcss** | Clases Tailwind válidas y consistentes                    |
| **import**             | Orden y agrupación de imports (resolver TypeScript)       |
| **sonarjs**            | Mantenibilidad (reglas en `warn`)                         |
| **Commitlint**         | Commits convencionales (`commitlint.config.cjs`)          |
| **Husky**              | `pre-commit` + `commit-msg`                               |

**Hook `pre-commit`** (bloquea el commit si falla):

1. **lint-staged** — Prettier + ESLint `--fix` en archivos staged.
2. **precommit:verify** — `format:check` + `lint` + `typecheck` en todo el proyecto.

Si falla el formato: `npm run format` y vuelve a hacer `git add`. Para build completo antes de push: `npm run validate`.

**Hook `commit-msg`** — Commitlint (mensaje convencional).

### Commits

Scopes permitidos: convencionales (`components`, `config`, `deps`, …) y de la app (`page`, `favorites`, `character`, `graphql`, `store`, `charts`, `providers`). Ver `commitlint.config.cjs`.

```text
feat(page): add character grid
feat(character): add detail route with origin and location
fix(favorites): preserve order after rehydration
```

### TSDoc

Documenta exports públicos con bloques `/** … */`.

### Framer Motion

Solo en Client Components (`'use client'`). Constantes compartidas en `src/constants/animations/`.

### Utilidad `cn`

```tsx
import { cn } from '@/lib/cn'
;<div className={cn('px-4', isActive && 'bg-emerald-500')} />
```

## Scripts

| Comando                    | Descripción                            |
| -------------------------- | -------------------------------------- |
| `npm run dev`              | Servidor de desarrollo                 |
| `npm run build`            | Build de producción                    |
| `npm run start`            | Servidor de producción                 |
| `npm run lint`             | ESLint                                 |
| `npm run lint:fix`         | ESLint con autofix                     |
| `npm run format`           | Prettier (escribe)                     |
| `npm run format:check`     | Prettier (solo verifica)               |
| `npm run typecheck`        | TypeScript sin emitir                  |
| `npm run precommit:verify` | Chequeo del hook pre-commit            |
| `npm run validate`         | precommit:verify + build (manual / CI) |

## Desarrollo por ramas (referencia)

El proyecto se organizó originalmente en ramas de feature desde `main`:

| Rama                    | Contenido                    |
| ----------------------- | ---------------------------- |
| `feat/page`             | Listado principal            |
| `feat/favorites`        | Página de favoritos          |
| `feat/character-detail` | Detalle en `/character/[id]` |

## Notas para agentes / IA

Este repo usa **Next.js 16** con APIs que pueden diferir de versiones anteriores. Antes de modificar código de Next, revisa la guía en `node_modules/next/dist/docs/` y `AGENTS.md`.
