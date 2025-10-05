type Props = {
  name: string
  setName: (v: string) => void
  status: string
  setStatus: (v: string) => void
  occupation: string
  setOccupation: (v: string) => void
  minAge: string
  setMinAge: (v: string) => void
  maxAge: string
  setMaxAge: (v: string) => void
  onClearFilters: () => void
}

export function CharactersToolbar({ name, setName, status, setStatus, occupation, setOccupation, minAge, setMinAge, maxAge, setMaxAge, onClearFilters }: Props) {
  return (
    <div role="region" aria-label="Filtros de personajes" className="mb-4 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="f-name" className="block text-xs font-medium text-slate-700">Nombre</label>
          <input id="f-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Homer" />
        </div>
        <div>
          <label htmlFor="f-status" className="block text-xs font-medium text-slate-700">Estado</label>
          <select id="f-status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Deceased">Deceased</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-occupation" className="block text-xs font-medium text-slate-700">Ocupación</label>
          <input id="f-occupation" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Safety Inspector" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="f-min-age" className="block text-xs font-medium text-slate-700">Edad mín.</label>
            <input id="f-min-age" type="number" inputMode="numeric" value={minAge} onChange={(e) => setMinAge(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="f-max-age" className="block text-xs font-medium text-slate-700">Edad máx.</label>
            <input id="f-max-age" type="number" inputMode="numeric" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          onClick={onClearFilters}
          className="text-xs text-slate-600 hover:text-slate-800 underline"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}


