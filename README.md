# Prueba técnica Front-end — Didacteca

Aplicación **Rick and Morty** con Next.js App Router. Este repositorio contiene el **scaffold** (stack y tooling); las features se desarrollan en ramas.

## Stack

| Tecnología                      | Uso                            |
| ------------------------------- | ------------------------------ |
| **Next.js 16** + **TypeScript** | Framework y tipado             |
| **Tailwind CSS 4**              | Estilos                        |
| **Apollo Client**               | Cliente GraphQL                |
| **Zustand**                     | Estado global                  |
| **Recharts**                    | Gráficos                       |
| **Framer Motion**               | Animaciones                    |
| **tailwind-merge**              | Utilidad `cn` para class names |

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

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura base

```
src/
├── app/                    # App Router, iconos, estilos globales
├── components/providers/   # ApolloProvider
└── lib/
    ├── apollo-client.ts    # Cliente Apollo
    └── cn.ts               # Clases Tailwind (tailwind-merge)
```

## Ramas (features)

Desde `main`, una rama por feature:

| Rama                    | Ruta              | Descripción                |
| ----------------------- | ----------------- | -------------------------- |
| `feat/page`             | `/`               | Listado / página principal |
| `feat/favorites`        | `/favorites`      | Favoritos                  |
| `feat/character-detail` | `/character/[id]` | Detalle de personaje       |

```bash
git checkout -b feat/page
```

## Calidad de código

| Herramienta            | Rol                                                       |
| ---------------------- | --------------------------------------------------------- |
| **Prettier**           | Formato + orden de clases (`prettier-plugin-tailwindcss`) |
| **ESLint**             | Next.js Core Web Vitals, TypeScript, Prettier             |
| **better-tailwindcss** | Clases Tailwind válidas y consistentes                    |
| **import**             | Orden y agrupación de imports (resolver TypeScript)       |
| **sonarjs**            | Mantenibilidad (reglas en `warn`)                         |
| **Commitlint**         | Commits convencionales (`commitlint.config.cjs`)          |
| **Husky**              | Ver abajo (`pre-commit` + `commit-msg`)                   |

**Hook `pre-commit`** (bloquea el commit si falla):

1. **lint-staged** — Prettier + ESLint `--fix` en archivos staged (y los vuelve a añadir al stage).
2. **precommit:verify** — `format:check` + `lint` + `typecheck` en todo el proyecto.

Si falla el formato: `npm run format` y vuelve a hacer `git add`. Para build completo antes de push: `npm run validate`.

**Hook `commit-msg`** — Commitlint (mensaje convencional).

### Commits

Scopes permitidos: convencionales (`components`, `config`, `deps`, …) y de la app (`page`, `favorites`, `character`, `graphql`, `store`, `charts`, `providers`). Ver `commitlint.config.cjs`.

```text
feat(page): add character grid
chore(config): add eslint plugins
```

### TSDoc

Documenta exports públicos con bloques `/** … */`. No se usa `eslint-plugin-tsdoc` (solo validaría sintaxis de comentarios).

### Framer Motion

Solo en Client Components:

```tsx
'use client'

import { motion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  )
}
```

### Utilidad `cn`

```tsx
import { cn } from '@/lib/cn'
;<div className={cn('px-4', isActive && 'bg-green-500')} />
```

## Scripts

| Comando                    | Descripción                            |
| -------------------------- | -------------------------------------- |
| `npm run dev`              | Desarrollo                             |
| `npm run build`            | Build de producción                    |
| `npm run start`            | Servidor de producción                 |
| `npm run lint`             | ESLint                                 |
| `npm run lint:fix`         | ESLint con autofix                     |
| `npm run format`           | Prettier (escribe)                     |
| `npm run format:check`     | Prettier (solo verifica)               |
| `npm run typecheck`        | TypeScript sin emitir                  |
| `npm run precommit:verify` | Chequeo del hook pre-commit            |
| `npm run validate`         | precommit:verify + build (manual / CI) |

## API

- GraphQL: `https://rickandmortyapi.com/graphql` (ver `.env.example`)
- Docs: [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)
