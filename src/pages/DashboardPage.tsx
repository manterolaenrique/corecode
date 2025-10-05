import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { SectionHeading } from '../shared/ui/SectionHeading'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const modules = [
    { id: 'form', title: 'Formulario Accesible', description: 'RHF + Zod + Framer Motion + Tailwind', to: '/form' },
    { id: 'simpsons', title: 'The Simpsons – API', description: 'Listado de personajes y prácticas de API', to: '/simpsons' },
  ]

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <SectionHeading title="Módulos" subtitle="Explora los contenidos disponibles" align="left" />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.id}>
            <div className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-slate-900">{m.title}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-600">{m.description}</p>
              {m.to !== '#' ? (
                <Link to={m.to} className="mt-3">
                  <Button className="w-full">Ir al módulo</Button>
                </Link>
              ) : (
                <Button className="mt-3 w-full" disabled>
                  Próximamente
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


