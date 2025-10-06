import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Soccer Tracker
      </div>
      
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/games" className="nav-link">
          Games
        </Link>
        <Link to="/my-stats" className="nav-link">
          My Stats
        </Link>
      </div>

      <div className="navbar-user">
        <span className="user-name">{user.firstName} {user.lastName}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;