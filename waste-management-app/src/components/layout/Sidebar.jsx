import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Trash2, Route, AlertTriangle, ScanLine } from 'lucide-react'
import styles from './Sidebar.module.css'

const links = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/contenedores', icon: Trash2,          label: 'Contenedores' },
  { to: '/rutas',        icon: Route,           label: 'Rutas' },
  { to: '/reportes',     icon: AlertTriangle,   label: 'Reportes' },
  { to: '/vision',       icon: ScanLine,        label: 'Visión IA' },
]

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.dot} />
        <span>TecniCobro</span>
      </div>
      <nav className={styles.nav}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
