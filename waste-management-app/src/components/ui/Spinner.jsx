export default function Spinner({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, margin: '40px auto',
      border: '3px solid var(--color-border)',
      borderTop: '3px solid var(--color-primary)',
      borderRadius: '50%', animation: 'spin 0.7s linear infinite',
    }} />
  )
}
