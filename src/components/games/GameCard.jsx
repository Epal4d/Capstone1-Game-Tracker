import { useNavigate } from 'react-router-dom'

function GameCard({ game, hasUserStats }) {
  const navigate = useNavigate()

  const handleAddStats = () => {
    navigate(`/add-stats/${game.id}`)
  }

  return (
    <div className="game-card">
      <div className="game-info">
        <h3>{game.gameDate}</h3>
        <p className="opponent">vs {game.opponent}</p>
        <p className="location">{game.location} ({game.homeAway})</p>
        {game.teamScore !== null && game.opponentScore !== null && (
          <p className="score">
            Score: {game.teamScore} - {game.opponentScore}
          </p>
        )}
      </div>
      <div className="game-actions">
        {hasUserStats ? (
          <div className="stats-status">
            <span className="stats-recorded">✓ Stats Recorded</span>
            <button 
              onClick={() => navigate('/my-stats')} 
              className="btn-secondary"
            >
              View My Stats
            </button>
          </div>
        ) : (
          <button 
            onClick={handleAddStats} 
            className="btn-success"
          >
            Add My Stats
          </button>
        )}
      </div>
    </div>
  )
}

export default GameCard