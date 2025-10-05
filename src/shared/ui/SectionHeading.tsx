import type { ReactNode } from 'react'

type SectionHeadingProps = {
  title: string
  subtitle?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <h2 className="bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-pink-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
    </div>
  )
}


