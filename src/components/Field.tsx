import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FieldProps = {
  id: string
  label: string
  children: ReactNode
  error?: string
  required?: boolean
}

export function Field({ id, label, children, error, required }: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <div className="mt-1">
        {children}
      </div>
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={describedBy}
            role="alert"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}


