/** Comprueba si un segmento de ruta es un ID de personaje válido. */
export function isValidCharacterRouteId(id: string): boolean {
  const numericId = Number(id)
  return Number.isInteger(numericId) && numericId > 0
}
