import React, { useState,useEffect } from 'react';

// Refactor in the future when weekly and monthly leaderboards are implemented

const Leaderboard = () => {
  const [selection, setSelection] = useState('');
  const handleGameChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <>
      <div className="leaderboard-container select-game">
        <h2>Choose a Leaderboard to view top players</h2>
        <select
          className="select"
          value={selection}
          onChange={handleGameChange}
        >
          <option value="">-- Select a board --</option>
          <option value="alltime">All Time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {selection === 'alltime' && <AllTime />}
        {selection === 'weekly' && <Weekly />}
        {selection === 'monthly' && <Monthly />}
      </div>
      <div className="text">
        Leaderboard refreshes every 10 minutes. Only shows top 10 players.
      </div>
    </>
  );
};

function AllTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/allusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="form-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Weekly() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch('http://localhost:3001/weeklyscores', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const scoresData = await response.json();
      setScores(scoresData);
    }
    fetchScores();
  }, []);

  console.log(scores)

  scores.sort((a, b) => b.score - a.score);

  return (
    <>
    <h2>In Progress</h2>
    {/* <div className="form-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
    </>
  );
};

function Monthly() {
  return (
    <>
    <h2>In Progress</h2>
    {/* <div className="form-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
    </>
  );
}

export default Leaderboard;
