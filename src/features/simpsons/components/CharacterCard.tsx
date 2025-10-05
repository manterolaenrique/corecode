import type { SimpsonsCharacter } from '../../simpsons/types'
import { resolvePortrait } from '../../simpsons/api/characters'

export function CharacterCard({ c }: { c: SimpsonsCharacter }) {
  const portrait = resolvePortrait(c.portrait_path)
  const isAlive = (c.status || '').toLowerCase() === 'alive'

  return (
    <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow ring-1 ring-black/5 backdrop-blur-md">
      <div className="flex gap-4">
        {portrait ? (
          <img
            src={portrait}
            alt={c.name}
            className="h-20 w-20 rounded-lg object-cover ring-1 ring-black/10"
            loading="lazy"
          />
        ) : (
          <div className="h-20 w-20 rounded-lg bg-slate-200" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">{c.name}</h3>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${isAlive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
              {c.status || 'Unknown'}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600">{c.occupation || 'Ocupación desconocida'}</p>
          <p className="mt-0.5 text-xs text-slate-600">{c.age != null ? `Edad: ${c.age}` : 'Edad no disponible'}</p>
        </div>
      </div>
    </div>
  )
}


