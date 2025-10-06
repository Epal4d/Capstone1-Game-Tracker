import './Dashboard.css'

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  
    return (
      <div className="dashboard-content">
        <h1>Welcome to your soccer stat tracker!</h1>
        <div className="user-info">
          <p>
            Hello, {user.firstName} {user.lastName}!
          </p>
          <p>Username: {user.username}</p>
          <p>Team: {user.teamName}</p>
          <p>Position: {user.position}</p>
        </div>
      </div>
    );
  }
  
  export default Dashboard;