import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { leaderboardActions } from '../store/LeaderboardSlice';
import API from '../../api';
import Loader from '../Loader/Loader';

const Leaderboard = () => {
  const selection = useSelector((state) => state.leaderboard.selection);
  const dispatch = useDispatch();

  const handleGameChange = (event) => {
    dispatch(leaderboardActions.setSelection(event.target.value));
  };

  return (
    <>
      <div className="leaderboard-container select-game">
        <h1 style={{ color: 'white' }}>Point Leaderboard</h1>
        <select
          className="select"
          value={selection}
          onChange={handleGameChange}
        >
          <option value="">-- Select a board --</option>
          <option value="alltime">All Time</option>
        </select>
        {selection === 'alltime' && <AllTime />}
      </div>
    </>
  );
};

function AllTime() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          API.GetAllUsers,
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const profileView = (index) => {
    const username = data[index].username;
    navigate('/profile/'  + username);
  };

  const entriesPerPage = 10;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const rowData = data.slice(startIndex, endIndex);
  const maxDisplayedPages = 10;
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const startPage = currentPage - Math.floor(maxDisplayedPages / 2);
  const endPage = currentPage + Math.floor(maxDisplayedPages / 2);
  const displayedPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (page) => page >= startPage && page <= endPage && page <= totalPages
  );

  return (
    <div className="form-container">
      {loading ? (
        <Loader />
      ) : (
        <>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={startIndex + index}>
                <td>{startIndex + index + 1}</td>
                <td>{row.username}</td>
                <td>{row.points}</td>
                <td><button id='stats-btn' onClick={() => profileView(index)}>See Stats</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='button-container'>
            {displayedPages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
                }}
                className='pagination-button margin-right'
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
