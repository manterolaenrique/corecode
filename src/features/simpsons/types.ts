export type SimpsonsCharacter = {
  id: number
  name: string
  age?: number | null
  occupation?: string | null
  status?: 'Alive' | 'Deceased' | string
  portrait_path?: string | null
  phrases?: string[]
}


