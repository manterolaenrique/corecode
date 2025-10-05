import { SectionHeading } from '../shared/ui/SectionHeading'
import { CharactersToolbar } from '../features/simpsons/components/CharactersToolbar'
import { CharactersList } from '../features/simpsons/components/CharactersList'
import { useMemo } from 'react'
import { useDebouncedValue } from '../shared/hooks/useDebouncedValue'
import { useSearchParams } from 'react-router-dom'

export function SimpsonsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const name = searchParams.get('name') || ''
  const status = searchParams.get('status') || ''
  const occupation = searchParams.get('occupation') || ''
  const minAge = searchParams.get('minAge') || ''
  const maxAge = searchParams.get('maxAge') || ''
  const page = Number(searchParams.get('page')) || 1

  const debouncedName = useDebouncedValue(name, 300)
  
  const updateParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      // Reset page when filters change
      if (key !== 'page') {
        newParams.delete('page')
      }
      return newParams
    })
  }
  
  const setName = (value: string) => updateParam('name', value)
  const setStatus = (value: string) => updateParam('status', value)
  const setOccupation = (value: string) => updateParam('occupation', value)
  const setMinAge = (value: string) => updateParam('minAge', value)
  const setMaxAge = (value: string) => updateParam('maxAge', value)
  const setPage = (value: number) => updateParam('page', value.toString())

  const filters = useMemo(
    () => ({
      name: debouncedName.trim().toLowerCase(),
      status,
      occupation: occupation.trim().toLowerCase(),
      minAge: Number(minAge) || null,
      maxAge: Number(maxAge) || null,
    }),
    [debouncedName, status, occupation, minAge, maxAge]
  )
  
  const hasActiveFilters = Boolean(filters.name || filters.status || filters.occupation || filters.minAge != null || filters.maxAge != null)

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
          The Simpsons – Módulo de API
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-700">
          Trabajamos con <a className="underline" href="https://thesimpsonsapi.com/">The Simpsons API</a> para listar personajes y practicar consumo de APIs.
        </p>
      </div>

      <SectionHeading title="Personajes" subtitle="Listado con filtros" />
      <CharactersToolbar
        name={name}
        setName={setName}
        status={status}
        setStatus={setStatus}
        occupation={occupation}
        setOccupation={setOccupation}
        minAge={minAge}
        setMinAge={setMinAge}
        maxAge={maxAge}
        setMaxAge={setMaxAge}
        onClearFilters={() => {
          setSearchParams(new URLSearchParams())
        }}
      />
      <div id="characters">
        <CharactersList 
          filters={filters} 
          hasActiveFilters={hasActiveFilters}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  )
}


