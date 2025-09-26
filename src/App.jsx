import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import GamesPage from "./components/pages/GamesPage.jsx";
import AddGameForm from "./components/games/AddGameForm.jsx";
import AddStatsForm from "./components/games/AddStatForm.jsx";
import MyStatsPage from './components/pages/MyStatsPage.jsx';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => (window.location.href = "/games")}>Games</button>
        <button onClick={() => (window.location.href = "/my-stats")}>
          My Stats
        </button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome to Dashboard!</h1>
      <p>
        Hello, {user.firstName} {user.lastName}!
      </p>
      <p>Username: {user.username}</p>
      <p>Team: {user.teamName}</p>
      <p>Position: {user.position}</p>
    </div>
  );
};

const MyStats = () => (
  <div>
    <h1>My Stats - Coming Soon!</h1>
    <button onClick={() => (window.location.href = "/games")}>
      Back to Games
    </button>
  </div>
);

const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/add-stats/:gameId"
            element={
              <ProtectedRoute>
                <AddStatsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <GamesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-game"
            element={
              <ProtectedRoute>
                <AddGameForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-stats"
            element={
              <ProtectedRoute>
                <MyStatsPage />
              </ProtectedRoute>
            }
          />

          {}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
