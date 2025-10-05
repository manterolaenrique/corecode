import { useState, useEffect } from 'react'
import { fetchCharacters, type CharactersResponse } from '../api/characters'
import type { SimpsonsCharacter } from '../types'

type Filters = {
  name: string
  status: string
  occupation: string
  minAge: number | null
  maxAge: number | null
}

type SearchResult = {
  results: SimpsonsCharacter[]
  searchedRange: string
  hasMore: boolean
  isLoading: boolean
  error: string | null
}

const RANGE_SIZE = 5
const MAX_PAGES = 60

function applyFilters(characters: SimpsonsCharacter[], filters: Filters): SimpsonsCharacter[] {
  return characters.filter((c) => {
    const nameOk = filters.name ? c.name.toLowerCase().includes(filters.name) : true
    const statusOk = filters.status ? (c.status || '') === filters.status : true
    const occOk = filters.occupation ? (c.occupation || '').toLowerCase().includes(filters.occupation) : true
    const age = typeof c.age === 'number' ? c.age : null
    const minOk = filters.minAge != null ? (age != null ? age >= filters.minAge : false) : true
    const maxOk = filters.maxAge != null ? (age != null ? age <= filters.maxAge : false) : true
    return nameOk && statusOk && occOk && minOk && maxOk
  })
}

export function useProgressiveSearch(filters: Filters): SearchResult {
  const [results, setResults] = useState<SimpsonsCharacter[]>([])
  const [searchedRange, setSearchedRange] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchInRanges = async () => {
      setIsLoading(true)
      setError(null)
      setResults([])
      setSearchedRange('')
      setHasMore(true)

      try {
        for (let startPage = 1; startPage <= MAX_PAGES; startPage += RANGE_SIZE) {
          const endPage = Math.min(startPage + RANGE_SIZE - 1, MAX_PAGES)
          
          // Cargar rango de páginas
          const pages: CharactersResponse[] = await Promise.all(
            Array.from({ length: endPage - startPage + 1 }, (_, i) => 
              fetchCharacters(startPage + i)
            )
          )
          
          // Combinar resultados y filtrar
          const allResults = pages.flatMap(p => p.results)
          const filtered = applyFilters(allResults, filters)
          
          if (filtered.length > 0) {
            setResults(filtered)
            setSearchedRange(`${startPage}-${endPage}`)
            setHasMore(endPage < MAX_PAGES)
            setIsLoading(false)
            return
          }
          
          setSearchedRange(`${startPage}-${endPage}`)
        }
        
        // No se encontraron resultados en ninguna página
        setResults([])
        setSearchedRange('1-60')
        setHasMore(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error en la búsqueda')
      } finally {
        setIsLoading(false)
      }
    }

    searchInRanges()
  }, [filters.name, filters.status, filters.occupation, filters.minAge, filters.maxAge])

  return {
    results,
    searchedRange,
    hasMore,
    isLoading,
    error
  }
}
