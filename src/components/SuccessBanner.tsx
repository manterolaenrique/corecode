import { motion, AnimatePresence } from 'framer-motion'

type SuccessBannerProps = {
  show: boolean
  message?: string
}

export function SuccessBanner({ show, message = 'Formulario enviado correctamente' }: SuccessBannerProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          role="status"
          aria-live="polite"
          className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-800"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}


