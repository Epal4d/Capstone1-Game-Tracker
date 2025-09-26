import { useState } from 'react'

function PerformanceCard({ performance, game, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  // Store temporary edit data while user makes changes
  const [editData, setEditData] = useState({
    didPlay: performance.didPlay,
    goals: performance.goals,
    assists: performance.assists,
    minutesPlayed: performance.minutesPlayed
  })

  const startEdit = () => {
    setIsEditing(true)
    setEditData({
      didPlay: performance.didPlay,
      goals: performance.goals,
      assists: performance.assists,
      minutesPlayed: performance.minutesPlayed
    })
  }
  const cancelEdit = () => {
    setIsEditing(false)
    setEditData({
      didPlay: performance.didPlay,
      goals: performance.goals,
      assists: performance.assists,
      minutesPlayed: performance.minutesPlayed
    })
  }

  const saveEdit = () => {
    const updatedData = {
      ...performance, 
      didPlay: editData.didPlay,
      // If didn't play, set stats to 0
      goals: editData.didPlay ? parseInt(editData.goals) || 0 : 0,
      assists: editData.didPlay ? parseInt(editData.assists) || 0 : 0,
      minutesPlayed: editData.didPlay ? parseInt(editData.minutesPlayed) || 0 : 0
    }

    // Call parent component's update function
    onUpdate(performance.id, updatedData)
    setIsEditing(false)
  }

  //delete function
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete these stats?')) {
      onDelete(performance.id)
    }
  }

  
  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="performance-card">
      <div className="game-details">
        <h4>{game ? `${game.gameDate} vs ${game.opponent}` : 'Game Info Unavailable'}</h4>
        {game && <p>{game.location} ({game.homeAway})</p>}
      </div>

      {/* show either edit form or show display stats */}
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label>Did Play:</label>
            <select 
              value={editData.didPlay}
              onChange={(e) => handleEditChange('didPlay', e.target.value === 'true')}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          
          {editData.didPlay && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Goals:</label>
                  <input
                    type="number"
                    value={editData.goals}
                    onChange={(e) => handleEditChange('goals', e.target.value)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Assists:</label>
                  <input
                    type="number"
                    value={editData.assists}
                    onChange={(e) => handleEditChange('assists', e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Minutes Played:</label>
                <input
                  type="number"
                  value={editData.minutesPlayed}
                  onChange={(e) => handleEditChange('minutesPlayed', e.target.value)}
                  min="0"
                  max="120"
                />
              </div>
            </>
          )}

          {/* Edit form buttons */}
          <div className="form-action-buttons">
            <button onClick={cancelEdit} className="btn-secondary">
              Cancel
            </button>
            <button onClick={saveEdit} className="btn-primary">
              Save
            </button>
          </div>
        </div>
      ) : (
        //  show current stats
        <div className="performance-stats">
          <div className="stat-item">
            <span className="label">Played:</span>
            <span className="value">{performance.didPlay ? 'Yes' : 'No'}</span>
          </div>
          
          
          {performance.didPlay && (
            <>
              <div className="stat-item">
                <span className="label">Goals:</span>
                <span className="value">{performance.goals}</span>
              </div>
              <div className="stat-item">
                <span className="label">Assists:</span>
                <span className="value">{performance.assists}</span>
              </div>
              <div className="stat-item">
                <span className="label">Minutes:</span>
                <span className="value">{performance.minutesPlayed}</span>
              </div>
            </>
          )}
          
        
          <div className="performance-actions">
            <button onClick={startEdit} className="btn-secondary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceCard