import { useEffect, useState } from 'react'
import type { SimpsonsCharacter } from '../types'
import { fetchCharacters, type CharactersResponse } from '../api/characters'

export function useCharacters(page = 1) {
  const [data, setData] = useState<SimpsonsCharacter[]>([])
  const [pages, setPages] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancel = false
    setLoading(true)
    setError(null)
    fetchCharacters(page)
      .then((res: CharactersResponse) => {
        if (!cancel) {
          setData(res.results)
          setPages(res.pages)
        }
      })
      .catch((e: Error) => {
        if (!cancel) setError(e.message || 'Error')
      })
      .finally(() => {
        if (!cancel) setLoading(false)
      })
    return () => {
      cancel = true
    }
  }, [page])

  return { data, loading, error, pages }
}


