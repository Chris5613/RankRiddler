import React, { useState } from 'react';

const Leaderboard = () => {
  const [selection, setSelection] = useState('');

  const handleGameChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div className="leaderboard-container select-game">
      <h2>Choose a Leaderboard to view top players</h2>
      <select className ="select" value={selection} onChange={handleGameChange}>
        <option value="">-- Select a board --</option>
        <option value="alltime">All Time</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      {selection === 'alltime' && <AllTime />}
      {selection === 'weekly' && <Weekly />}
      {selection === 'monthly' && <Monthly />}
    </div>
  );
};

function AllTime() {
  const mockData = [
    { username: 'John', score: 200 },
    { username: 'Jane', score: 150 },
    { username: 'Bob', score: 100 },
    { username: 'Alice', score: 50 },
    { username: 'Alice', score: 50 },
  ];
  return (
    <div className='form-container'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Weekly() {
  const mockData = [
    { username: 'John', score: 200 },
    { username: 'Jane', score: 150 },
    { username: 'Bob', score: 100 },
    { username: 'Alice', score: 50 },
  ];
  return (
    <div className='form-container'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Monthly() {
  const mockData = [
    { username: 'John', score: 200 },
    { username: 'Jane', score: 150 },
    { username: 'Bob', score: 100 },
    { username: 'Alice', score: 50 },
  ];
  return (
    <div className='form-container'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
