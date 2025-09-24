const Base_Api = "http://localhost:3001";

//Player/Auth function
export const getAllPlayers = () => {
  return fetch(`${Base_Api}/players`).then((res) => res.json());
};

export const getPlayerByUsername = (username) => {
  return fetch(`${Base_Api}/players?username=${username}`)
    .then((res) => res.json())
    .then((players) => players[0] || null);
};

export const getPlayerByEmail = (email) => {
  return fetch(`${Base_Api}/players?email=${email}`)
    .then((res) => res.json())
    .then((players) => players[0] || null);
};

export const createPlayer = (playerData) => {
  return fetch(`${Base_Api}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerData),
  }).then((res) => res.json());
};

// Game functions
export const getAllGames = () => {
  return fetch(`${Base_Api}/games`).then((res) => res.json());
};

export const createGame = (gameData) => {
  return fetch(`${Base_Api}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  }).then((res) => res.json());
};

// Performance functions
export const getPerformancesByUserId = (userId) => {
  return fetch(`${Base_Api}/playerPerformance?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const getPerformancesByGameId = (gameId) => {
  return fetch(`${Base_Api}/playerPerformance?gameId=${gameId}`).then(
    (res) => res.json()
  );
};

export const createPerformance = (performanceData) => {
  return fetch(`${Base_Api}/playerPerformance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(performanceData),
  }).then((res) => res.json());
};

export const deletePerformance = (id) => {
    return fetch(`${Base_Api}/playerPerformance/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.ok);
  };
