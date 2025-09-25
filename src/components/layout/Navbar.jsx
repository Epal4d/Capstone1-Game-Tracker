import { useNavigate } from 'react-router-dom'

function Navbar({ currentPage }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Soccer Tracker</h1>
      </div>
      <div className="nav-links">
        <button 
          onClick={() => navigate('/dashboard')} 
          className={currentPage === 'dashboard' ? 'nav-button active' : 'nav-button'}
        >
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/games')} 
          className={currentPage === 'games' ? 'nav-button active' : 'nav-button'}
        >
          Games
        </button>
        <button 
          onClick={() => navigate('/my-stats')} 
          className={currentPage === 'my-stats' ? 'nav-button active' : 'nav-button'}
        >
          My Stats
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar