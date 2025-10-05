import { useCharacters } from '../../simpsons/hooks/useCharacters'
import { useProgressiveSearch } from '../../simpsons/hooks/useProgressiveSearch'
import { CharacterCard } from './CharacterCard'

type Filters = {
  name: string
  status: string
  occupation: string
  minAge: number | null
  maxAge: number | null
}

type Props = {
  filters: Filters
  hasActiveFilters: boolean
  page: number
  setPage: (page: number) => void
}

export function CharactersList({ filters, hasActiveFilters, page, setPage }: Props) {
  // Modo paginación normal (sin filtros)
  const { data: paginatedData, loading: paginatedLoading, error: paginatedError, pages } = useCharacters(page)
  
  // Modo búsqueda progresiva (con filtros)
  const { results: searchResults, searchedRange, hasMore, isLoading: searchLoading, error: searchError } = useProgressiveSearch(filters)

  if (hasActiveFilters) {
    // Modo búsqueda progresiva
    if (searchLoading) {
      return (
        <div className="space-y-4">
          <div className="text-center text-sm text-slate-600">
            Buscando en páginas {searchedRange || '1-5'}...
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />
            ))}
          </div>
        </div>
      )
    }
    
    if (searchError) {
      return <div className="text-sm text-red-600">Error: {searchError}</div>
    }
    
    if (searchResults.length === 0) {
      return (
        <div className="text-center text-sm text-slate-600">
          No se encontraron personajes en las páginas {searchedRange}.
          {hasMore && <div className="mt-1">Búsqueda completa realizada.</div>}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-slate-600">
          Encontrado en páginas {searchedRange} ({searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''})
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((c) => (
            <CharacterCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    )
  }

  // Modo paginación normal
  if (paginatedLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button disabled className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 opacity-50">
            Anterior
          </button>
          <span className="text-xs text-slate-700">
            Página {page} de {pages}
          </span>
          <button disabled className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 opacity-50">
            Siguiente
          </button>
        </div>
      </div>
    )
  }
  
  if (paginatedError) {
    return <div className="text-sm text-red-600">Error: {paginatedError}</div>
  }
  
  if (!paginatedData || paginatedData.length === 0) {
    return <div className="text-sm text-slate-600">No hay personajes.</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map((c) => (
          <CharacterCard key={c.id} c={c} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page <= 1 || paginatedLoading}
        >
          Anterior
        </button>
        <span className="text-xs text-slate-700">
          Página {page} de {pages}
        </span>
        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage(Math.min(pages, page + 1))}
          disabled={page >= pages || paginatedLoading}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}