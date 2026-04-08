import { useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const TITLES = {
  '/dashboard':    'Panel General',
  '/contenedores': 'Módulo 1 — Contenedores y Visión',
  '/rutas':        'Módulo 2 — Optimización de Rutas',
  '/reportes':     'Módulo 3 — Reportes Ciudadanos',
  '/vision':       'Módulo 4 — Clasificación IA',
}

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{TITLES[pathname] ?? 'TecniCobro'}</h1>
      <span className={styles.badge}>Riobamba, EC</span>
    </header>
  )
}
