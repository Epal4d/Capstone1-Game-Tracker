import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlayerByUsername, getPlayerByEmail } from '../../services/api.jsx'

function LoginForm() {
  const [loginValue, setLoginValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    // Try to find user by username first, then by email
    getPlayerByUsername(loginValue)
      .then(player => {
        if (player) {
          return player
        }
        
        return getPlayerByEmail(loginValue)
      })
      .then(player => {
        if (player) {
          localStorage.setItem('currentUser', JSON.stringify(player))
          navigate('/dashboard')
        } else {
          setError('Player not found. Please check your username/email.')
        }
        setLoading(false)
      })
      .catch(err => {
        setError('Login failed. Please try again.')
        setLoading(false)
        console.error('Login error:', err)
      })
  }

  return (
    <div className="login-container">
      <h2>Soccer Tracker Login</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username or Email:</label>
          <input
            type="text"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
            placeholder="Enter username or email"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !loginValue.trim()}
          className={loading ? 'btn-loading' : 'btn-primary'}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="auth-link">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="link-button"
        >
          Register here
        </button>
      </p>
    </div>
  )
}

export default LoginForm