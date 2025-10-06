import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPerformance, getAllGames } from '../../services/api.jsx'
import Navbar from '../layout/Navbar.jsx'

function AddStatsForm() {
  const { gameId } = useParams() //gets game id from url resolves json problem
  const [game, setGame] = useState(null)
  const [formData, setFormData] = useState({
    didPlay: '',
    goals: '',
    assists: '',
    minutesPlayed: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  //Get specific game 
  useEffect(() => {
    getAllGames()
      .then(games => {
        const foundGame = games.find(g => g.id.toString() === gameId)
        if (foundGame) {
          setGame(foundGame)
        } else {
          setError('Game not found')
        }
      })
      .catch(err => {
        setError('Failed to load game information')
        console.error('Error loading game:', err)
      })
  }, [gameId])

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

    const performanceData = {
      userId: parseInt(currentUser.id),
      gameId: parseInt(gameId),
      didPlay: formData.didPlay === 'true',
      goals: formData.didPlay === 'true' ? parseInt(formData.goals) || 0 : 0,
      assists: formData.didPlay === 'true' ? parseInt(formData.assists) || 0 : 0,
      minutesPlayed: formData.didPlay === 'true' ? parseInt(formData.minutesPlayed) || 0 : 0
    }

    createPerformance(performanceData)
      .then(() => {
        navigate('/games')
      })
      .catch(err => {
        setError('Failed to add stats. Please try again.')
        setLoading(false)
        console.error('Error creating performance:', err)
      })
  }

  if (!game) {
    return (
      <div className="add-stats-page">
        <Navbar />
        <div className="page-content">
          <div className="loading">Loading game information...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="add-stats-page">  
      <div className="page-content">
        <div className="page-header">
          <button onClick={() => navigate('/games')} className="back-button">
            ← Back to Games
          </button>
          <h2>Add My Stats</h2>
          <div className="game-info">
            <h3>{game.gameDate} vs {game.opponent}</h3>
            <p>{game.location} ({game.homeAway})</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="stats-form">
          <div className="form-group">
            <label>Did you play in this game?*</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="didPlay"
                  value="true"
                  checked={formData.didPlay === 'true'}
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="didPlay"
                  value="false"
                  checked={formData.didPlay === 'false'}
                  onChange={handleChange}
                  required
                />
                No
              </label>
            </div>
          </div>

          {formData.didPlay === 'true' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Goals Scored:</label>
                  <input
                    type="number"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Assists:</label>
                  <input
                    type="number"
                    name="assists"
                    value={formData.assists}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Minutes Played:</label>
                <input
                  type="number"
                  name="minutesPlayed"
                  value={formData.minutesPlayed}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  placeholder="90"
                />
              </div>
            </>
          )}

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
              {loading ? 'Adding Stats...' : 'Add My Stats'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStatsForm