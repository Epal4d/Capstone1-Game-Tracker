import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPlayer, getPlayerByUsername, getPlayerByEmail } from '../../services/api.jsx'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    jerseyNumber: '',
    position: '',
    teamName: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    // Check if username or email already exists
    getPlayerByUsername(formData.username)
      .then(existingUser => {
        if (existingUser) {
          throw new Error('Username already exists')
        }
        return getPlayerByEmail(formData.email)
      })
      .then(existingUser => {
        if (existingUser) {
          throw new Error('Email already exists')
        }
        
        
        const playerData = {
          ...formData,
          jerseyNumber: parseInt(formData.jerseyNumber)
        }
        
        return createPlayer(playerData)
      })
      .then(newPlayer => {
        // Save user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(newPlayer))
        
        navigate('/dashboard')
      })
      .catch(err => {
        setError(err.message || 'Registration failed. Please try again.')
        setLoading(false)
      })
  }

  return (
    <div className="register-container">
      <h2>Register New Player</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username*:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email*:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name*:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name*:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Jersey Number*:</label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleChange}
              required
              min="1"
              max="99"
            />
          </div>
          <div className="form-group">
            <label>Position*:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Team Name*:</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={loading ? 'btn-loading' : 'btn-success'}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <p className="auth-link">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="link-button"
        >
          Login here
        </button>
      </p>
    </div>
  )
}

export default RegisterForm