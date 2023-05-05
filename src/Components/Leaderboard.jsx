import React from 'react';

const Leaderboard = () => {
  const mockData = [
    { username: 'John', score: 200 },
    { username: 'Jane', score: 150 },
    { username: 'Bob', score: 100 },
    { username: 'Alice', score: 50 },
  ];

  return (
    <div className="leaderboard-container">
      <table className='alltime'>
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
};

export default Leaderboard;
