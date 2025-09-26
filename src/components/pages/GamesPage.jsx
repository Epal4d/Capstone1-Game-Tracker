import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllGames, getPerformancesByUserId } from '../../services/api.jsx'
import GameCard from '../games/GameCard.jsx'
import Navbar from '../layout/Navbar.jsx'

function GamesPage() {
  const [games, setGames] = useState([])
  const [userPerformances, setUserPerformances] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
//get games and player performances
  useEffect(() => {
    Promise.all([
      getAllGames(),
      getPerformancesByUserId(currentUser.id)
    ])
      .then(([gamesData, performanceData]) => {
        setGames(gamesData)
        setUserPerformances(performanceData)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load games')
        setLoading(false)
        console.error('Error loading games:', err)
      })
  }, [currentUser.id])

  const hasUserStats = (gameId) => {
    return userPerformances.some(perf => perf.gameId === gameId)
  }

  const handleCreateGame = () => {
    navigate('/create-game')
  }

  if (loading) return <div className="loading">Loading games...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="games-page">
      <Navbar currentPage="games" />

      <div className="page-content">
        <div className="page-header">
          <h2>All Games</h2>
          <button onClick={handleCreateGame} className="btn-primary">
            Create New Game
          </button>
        </div>

        {games.length === 0 ? (
          <div className="empty-state">
            <p>No games yet. Be the first to create one!</p>
          </div>
        ) : (
          <div className="games-list">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                hasUserStats={hasUserStats(game.id)}
                userPerformances={userPerformances}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GamesPage