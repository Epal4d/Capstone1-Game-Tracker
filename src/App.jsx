import {
  BrowserRouter as Router,Routes,Route,Navigate,
} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import  Dashboard  from "./components/dashboard/Dashboard.jsx";
import GamesPage from "./components/pages/GamesPage.jsx";
import AddGameForm from "./components/games/AddGameForm.jsx";
import AddStatsForm from "./components/games/AddStatForm.jsx";
import MyStatsPage from "./components/pages/MyStatsPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import './App.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
