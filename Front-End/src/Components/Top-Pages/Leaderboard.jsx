import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { leaderboardActions } from '../../store/LeaderboardSlice';

const Leaderboard = () => {
  const selection = useSelector((state) => state.leaderboard.selection);
  const dispatch = useDispatch();

  // const [selection, setSelection] = useState('');
  const handleGameChange = (event) => {
    dispatch(leaderboardActions.setSelection(event.target.value));
    // setSelection(event.target.value);
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
        Leaderboard refreshes in real time. Only shows top 10 players.
      </div>
    </>
  );
};

function AllTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://rr-back-end.onrender.com/allusers',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
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
          {data &&
            data.map((data, index) => (
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
  return (
    <>
      <h2>In Progress</h2>
    </>
  );
}

function Monthly() {
  return (
    <>
      <h2>In Progress</h2>
    </>
  );
}

export default Leaderboard;
