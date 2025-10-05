import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white hover:brightness-110 focus:ring-fuchsia-500',
    ghost: 'text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}


