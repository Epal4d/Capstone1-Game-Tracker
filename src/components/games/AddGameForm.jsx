import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../services/api.jsx'
import './AddGameForm.css'

function AddGameForm() {
  const [formData, setFormData] = useState({
    opponent: '',
    gameDate: '',
    homeAway: '',
    teamScore: '',
    opponentScore: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

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

    const gameData = {
      ...formData,
      creatorUserId: parseInt(currentUser.id),
      teamScore: formData.teamScore ? parseInt(formData.teamScore) : null,
      opponentScore: formData.opponentScore ? parseInt(formData.opponentScore) : null
    }

    createGame(gameData)
      .then(() => {
        navigate('/games')
      })
      .catch(err => {
        setError('Failed to create game. Please try again.')
        setLoading(false)
        console.error('Error creating game:', err)
      })
  }

  return (
    <div className="add-game-page">
      
      
      <div className="page-content">
        <div className="page-header">
          <button onClick={() => navigate('/games')} className="back-button">
            ← Back to Games
          </button>
          <h2>Create New Game</h2>
        </div>

        <form onSubmit={handleSubmit} className="game-form">
          <div className="form-group">
            <label>Opponent Team*:</label>
            <input
              type="text"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
              required
              placeholder="Enter opponent team name"
            />
          </div>

          <div className="form-group">
            <label>Game Date*:</label>
            <input
              type="date"
              name="gameDate"
              value={formData.gameDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Home or Away*:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="homeAway"
                  value="home"
                  checked={formData.homeAway === 'home'}
                  onChange={handleChange}
                  required
                />
                Home
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="homeAway"
                  value="away"
                  checked={formData.homeAway === 'away'}
                  onChange={handleChange}
                  required
                />
                Away
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Location*:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter game location"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Our Team Score:</label>
              <input
                type="number"
                name="teamScore"
                value={formData.teamScore}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Opponent Score:</label>
              <input
                type="number"
                name="opponentScore"
                value={formData.opponentScore}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/games')} 
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={loading ? 'btn-loading' : 'btn-primary'}
            >
              {loading ? 'Creating Game...' : 'Create Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGameForm