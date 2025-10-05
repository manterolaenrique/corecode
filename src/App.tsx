import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { AppLayout } from './widgets/AppLayout'
import { FormularioPersona } from './components/FormularioPersona'
import { SimpsonsPage } from './pages/SimpsonsPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/form" element={<FormularioPersona />} />
          <Route path="/simpsons" element={<SimpsonsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
