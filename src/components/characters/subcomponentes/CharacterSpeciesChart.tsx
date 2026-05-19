'use client'

import { useMemo } from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/primitives'
import { cn } from '@/lib/cn'

import type { Character } from '@/types/rick-and-morty'

type CharacterSpeciesChartProps = {
  /** Personajes de la página actual; se agrupan por `species`. */
  characters: Character[]
}

type SpeciesDatum = {
  species: string
  count: number
  percentage: number
}

const BAR_COLORS = [
  '#059669',
  '#10b981',
  '#34d399',
  '#6ee7b7',
  '#14b8a6',
  '#2dd4bf',
]

function buildSpeciesData(characters: Character[]): SpeciesDatum[] {
  const total = characters.length
  if (total === 0) return []

  const speciesCounts = characters.reduce<Record<string, number>>(
    (acc, character) => {
      const species = character.species.trim() || 'Desconocido'
      acc[species] = (acc[species] ?? 0) + 1
      return acc
    },
    {}
  )

  return Object.entries(speciesCounts)
    .map(([species, count]) => ({
      species,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}

type SpeciesTooltipProps = {
  active?: boolean
  payload?: { payload: SpeciesDatum }[]
}

function SpeciesTooltip({ active, payload }: SpeciesTooltipProps) {
  if (!active || !payload?.length) return null

  const item = payload[0].payload

  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-md'
      )}
    >
      <p className="font-semibold text-zinc-900">{item.species}</p>
      <p className="mt-0.5 text-sm text-zinc-600">
        {item.count} {item.count === 1 ? 'personaje' : 'personajes'} ·{' '}
        {item.percentage}% del total
      </p>
    </div>
  )
}

/**
 * Gráfico de barras horizontal con la distribución por especie en la página actual.
 * No renderiza nada si no hay personajes.
 *
 * @param props.characters - Resultados de la página activa del listado.
 */
export function CharacterSpeciesChart({
  characters,
}: CharacterSpeciesChartProps) {
  const data = useMemo(() => buildSpeciesData(characters), [characters])
  const total = characters.length
  const topSpecies = data[0]
  const chartHeight = Math.max(200, data.length * 40)

  if (data.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">
            Distribución por especie
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Página actual · {total} {total === 1 ? 'personaje' : 'personajes'}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Especies distintas
            </dt>
            <dd className="mt-1 text-2xl font-bold text-zinc-900">
              {data.length}
            </dd>
          </div>
          {topSpecies ? (
            <>
              <div>
                <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Especie más común
                </dt>
                <dd className="mt-1 text-lg font-bold text-emerald-700">
                  {topSpecies.species}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Representación
                </dt>
                <dd className="mt-1 text-2xl font-bold text-zinc-900">
                  {topSpecies.percentage}%
                  <span className="ml-1 text-sm font-normal text-zinc-500">
                    ({topSpecies.count})
                  </span>
                </dd>
              </div>
            </>
          ) : null}
        </dl>
      </CardHeader>
      <CardContent>
        <div style={{ height: chartHeight }} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 14, right: 14, left: 14, bottom: 14 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-zinc-200"
                horizontal={false}
              />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 12, fill: '#52525b' }}
                axisLine={{ stroke: '#e4e4e7' }}
              />
              <YAxis
                type="category"
                dataKey="species"
                tick={{ fontSize: 12, fill: '#3f3f46' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              <Tooltip
                content={<SpeciesTooltip />}
                cursor={{ fill: 'rgb(16 185 129 / 0.08)' }}
              />
              <Bar dataKey="count" name="Personajes" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={entry.species}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  className="fill-zinc-700 text-xs font-medium"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Cada barra muestra cuántos personajes de esa especie aparecen en esta
          página. Los valores entre paréntesis en el tooltip indican el
          porcentaje sobre el total de la página.
        </p>
      </CardContent>
    </Card>
  )
}
