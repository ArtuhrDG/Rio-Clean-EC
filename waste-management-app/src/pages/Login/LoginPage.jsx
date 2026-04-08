// src/pages/Login/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const { login }    = useAuth()
  const navigate     = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const rol = await login(form.username, form.password)
      // Redirige según el rol
      navigate('/dashboard')
    } catch (err) {
      setError('Usuario o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)',
    }}>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 36px',
        width: '100%', maxWidth: 380,
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2rem' }}>♻️</span>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: 8 }}>
            Rio-Clean-EC
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem' }}>
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Usuario</label>
            <input
              type="text"
              placeholder="admin / recolector / ciudadano"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{
              color: '#ef4444', fontSize: '0.82rem',
              background: 'rgba(239,68,68,.08)',
              border: '1px solid rgba(239,68,68,.2)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px', margin: 0,
            }}>
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '11px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            <LogIn size={16} />
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        {/* Usuarios de prueba */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 14,
          fontSize: '0.75rem',
          color: 'var(--color-muted)',
        }}>
          <p style={{ marginBottom: 6, fontWeight: 600 }}>👤 Usuarios de prueba:</p>
          {[
            { user: 'admin',       rol: 'ADMIN' },
            { user: 'recolector',  rol: 'RECOLECTOR' },
            { user: 'ciudadano',   rol: 'CIUDADANO' },
          ].map(({ user, rol }) => (
            <p
              key={user}
              onClick={() => setForm({ username: user, password: '123456' })}
              style={{ cursor: 'pointer', marginBottom: 3 }}
            >
              <code style={{ color: 'var(--color-primary)' }}>{user}</code>
              {' / '}<code>123456</code>
              {' — '}{rol}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}