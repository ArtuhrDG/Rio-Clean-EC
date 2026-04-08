// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Layout          from '../components/layout/Layout'
import LoginPage       from '../pages/Login/LoginPage'
import DashboardPage   from '../pages/Dashboard/DashboardPage'
import ContenedoresPage from '../pages/Contenedores/ContenedoresPage'
import RutasPage       from '../pages/Rutas/RutasPage'
import ReportesPage    from '../pages/Reportes/ReportesPage'
import VisionPage      from '../pages/Vision/VisionPage'

// Componente guardián: si no hay sesión, manda al login
function PrivateRoute({ children }) {
  const { usuario } = useAuth()
  return usuario
    ? children
    : <Navigate to="/login" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
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