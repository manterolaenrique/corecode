import type { SimpsonsCharacter } from '../types'

const API_BASE = 'https://thesimpsonsapi.com/api'

export type CharactersResponse = {
  count: number
  next: string | null
  prev: string | null
  pages: number
  results: SimpsonsCharacter[]
}

export async function fetchCharacters(page = 1): Promise<CharactersResponse> {
  const res = await fetch(`${API_BASE}/characters?page=${page}`)
  if (!res.ok) throw new Error('No se pudieron obtener los personajes')
  const json: CharactersResponse = await res.json()
  return json
}

export function resolvePortrait(path?: string | null): string | undefined {
  return path ? `https://cdn.thesimpsonsapi.com/500${path}` : undefined
}


