import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl border border-white/60 bg-white/90 p-5 shadow-xl ring-1 ring-black/5 backdrop-blur-md ${className}`}>
      {children}
    </div>
  )
}


