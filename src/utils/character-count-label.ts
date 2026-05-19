/**
 * Texto del contador de personajes para listados y vistas relacionadas.
 *
 * @param count - Total devuelto por la API (`characters.info.count`).
 * @returns Cadena en español con singular/plural correcto.
 */
export function formatCharacterCountLabel(count: number): string {
  if (count === 1) {
    return '1 personaje encontrado'
  }

  return `${count} personajes encontrados`
}
