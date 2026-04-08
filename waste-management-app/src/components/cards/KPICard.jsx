import styles from './KPICard.module.css'

export default function KPICard({ icon: Icon, label, value, sub, color = 'var(--color-primary)' }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={{ background: `${color}22`, color }}>
        <Icon size={20} />
      </div>
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value} style={{ color }}>{value}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
    </div>
  )
}
