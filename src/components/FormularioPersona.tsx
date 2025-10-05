import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from './Field'
import { SuccessBanner } from './SuccessBanner'

const schema = z.object({
  id: z
    .string()
    .trim()
    .min(1, 'El ID es requerido')
    .regex(/^\d+$/, 'El ID debe ser un número entero')
    .refine((v) => Number(v) >= 1, {
      message: 'El ID debe ser mayor o igual a 1',
    }),
  nombre: z
    .string()
    .trim()
    .min(1, 'El nombre es requerido')
    .max(50, 'Máximo 50 caracteres'),
  apellido: z
    .string()
    .trim()
    .min(1, 'El apellido es requerido')
    .max(50, 'Máximo 50 caracteres'),
  domicilio: z.string().trim().min(1, 'El domicilio es requerido'),
  telefono: z
    .string()
    .trim()
    .min(1, 'El teléfono es requerido')
    .regex(/^\d+$/, 'Solo se permiten dígitos'),
  email: z.string().trim().min(1, 'El email es requerido').email('Formato de email inválido'),
})

type FormValues = z.infer<typeof schema>

export function FormularioPersona() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      id: '',
      nombre: '',
      apellido: '',
      domicilio: '',
      telefono: '',
      email: '',
    },
  })

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 2000)
  }

  const inputBase = useMemo(
    () =>
      'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-70',
    []
  )

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <div className="mb-6 text-center">
        <h1 className="bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-pink-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">Formulario de Persona</h1>
        <p className="mt-1 text-sm text-slate-600">Completa tus datos y presiona Enviar</p>
      </div>
      <SuccessBanner show={submitted} />

      <div className="animate-[cardIn_.5s_ease-out] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur-md sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="id" label="ID" required error={errors.id?.message}>
              <input
                id="id"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-invalid={Boolean(errors.id)}
                aria-describedby={errors.id ? 'id-error' : undefined}
                className={`${inputBase} ${errors.id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('id')}
              />
            </Field>

            <Field id="nombre" label="Nombre" required error={errors.nombre?.message}>
              <input
                id="nombre"
                type="text"
                aria-invalid={Boolean(errors.nombre)}
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                className={`${inputBase} ${errors.nombre ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('nombre')}
              />
            </Field>

            <Field id="apellido" label="Apellido" required error={errors.apellido?.message}>
              <input
                id="apellido"
                type="text"
                aria-invalid={Boolean(errors.apellido)}
                aria-describedby={errors.apellido ? 'apellido-error' : undefined}
                className={`${inputBase} ${errors.apellido ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('apellido')}
              />
            </Field>

            <Field id="domicilio" label="Domicilio" required error={errors.domicilio?.message}>
              <input
                id="domicilio"
                type="text"
                aria-invalid={Boolean(errors.domicilio)}
                aria-describedby={errors.domicilio ? 'domicilio-error' : undefined}
                className={`${inputBase} ${errors.domicilio ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('domicilio')}
              />
            </Field>

            <Field id="telefono" label="Teléfono" required error={errors.telefono?.message}>
              <input
                id="telefono"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-invalid={Boolean(errors.telefono)}
                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                className={`${inputBase} ${errors.telefono ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('telefono')}
              />
            </Field>

            <Field id="email" label="Email" required error={errors.email?.message}>
              <input
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`${inputBase} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('email')}
              />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


