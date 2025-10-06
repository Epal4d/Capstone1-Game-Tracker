import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPerformancesByUserId, getAllGames, updatePerformance, deletePerformance } from '../../services/api.jsx'
import PerformanceCard from '../games/PerformanceCard.jsx'
import './MyStatsPage.css'

function MyStatsPage() {
  const [performances, setPerformances] = useState([])
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // get user from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  useEffect(() => {
    Promise.all([
      getPerformancesByUserId(currentUser.id),
      getAllGames()
    ])
      .then(([performanceData, gamesData]) => {
        setPerformances(performanceData)
        setGames(gamesData)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load your stats')
        setLoading(false)
        console.error('Error loading stats:', err)
      })
  }, [currentUser.id])

  // Find game by ID
  const getGameInfo = (gameId) => {
    return games.find(game => game.id.toString() === gameId.toString())
  }

  const calculateTotals = () => {
    return performances.reduce((acc, perf) => {
      return {
        gamesPlayed: acc.gamesPlayed + (perf.didPlay ? 1 : 0),
        totalGoals: acc.totalGoals + perf.goals,
        totalAssists: acc.totalAssists + perf.assists,
        totalMinutes: acc.totalMinutes + perf.minutesPlayed
      }
    }, { gamesPlayed: 0, totalGoals: 0, totalAssists: 0, totalMinutes: 0 })
  }

  const handleUpdate = (performanceId, updatedData) => {
    updatePerformance(performanceId, updatedData)
      .then(() => {
        // update local state 
        setPerformances(prev => 
          prev.map(p => p.id === performanceId ? updatedData : p)
        )
      })
      .catch(err => {
        setError('Failed to update stats')
        console.error('Error updating performance:', err)
      })
  }

  const handleDelete = (performanceId) => {
    deletePerformance(performanceId)
      .then(success => {
        if (success) {
          // Remove from local state
          setPerformances(prev => prev.filter(p => p.id !== performanceId))
        } else {
          setError('Failed to delete stats')
        }
      })
      .catch(err => {
        setError('Failed to delete stats')
        console.error('Error deleting performance:', err)
      })
  }

  if (loading) return <div className="loading">Loading your stats...</div>
  if (error) return <div className="error">{error}</div>

  const totals = calculateTotals()

  return (
    <div className="my-stats-page">

      <div className="page-content">
        <div className="page-header">
          <h2>My Statistics</h2>
        </div>

        {/* Summary stats cards */}
        <div className="stats-summary">
          <div className="stat-card">
            <h3>Games Played</h3>
            <p className="stat-number">{totals.gamesPlayed}</p>
          </div>
          <div className="stat-card">
            <h3>Total Goals</h3>
            <p className="stat-number">{totals.totalGoals}</p>
          </div>
          <div className="stat-card">
            <h3>Total Assists</h3>
            <p className="stat-number">{totals.totalAssists}</p>
          </div>
          <div className="stat-card">
            <h3>Minutes Played</h3>
            <p className="stat-number">{totals.totalMinutes}</p>
          </div>
        </div>

        {performances.length === 0 ? (
          <div className="empty-state">
            <p>No stats recorded yet.</p>
            <button onClick={() => navigate('/games')} className="btn-primary">
              Go to Games to Add Stats
            </button>
          </div>
        ) : (
          <div className="performances-list">
            <h3>Game by Game Performance</h3>
            {/* Render each performance using PerformanceCard component */}
            {performances.map(performance => (
              <PerformanceCard
                key={performance.id}
                performance={performance}
                game={getGameInfo(performance.gameId)}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyStatsPage