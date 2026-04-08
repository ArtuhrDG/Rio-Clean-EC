import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import DashboardPage    from '../pages/Dashboard/DashboardPage'
import ContenedoresPage from '../pages/Contenedores/ContenedoresPage'
import RutasPage        from '../pages/Rutas/RutasPage'
import ReportesPage     from '../pages/Reportes/ReportesPage'
import VisionPage       from '../pages/Vision/VisionPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"    element={<DashboardPage />} />
        <Route path="contenedores" element={<ContenedoresPage />} />
        <Route path="rutas"        element={<RutasPage />} />
        <Route path="reportes"     element={<ReportesPage />} />
        <Route path="vision"       element={<VisionPage />} />
      </Route>
    </Routes>
  )
}