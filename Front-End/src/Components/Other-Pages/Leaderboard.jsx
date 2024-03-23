import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import Loader from '../Loader/Loader';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API.GetAllUsers, {
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]); 

  const entriesPerPage = 10;
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const rowData = data.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const maxPageNumberLimit = 5;
  const minPageNumberLimit = 0;
  const [pageNumberLimit, setPageNumberLimit] = useState(maxPageNumberLimit);
  const [minPageNumber, setMinPageNumber] = useState(minPageNumberLimit);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > pageNumberLimit) {
        setPageNumberLimit(pageNumberLimit + maxPageNumberLimit);
        setMinPageNumber(minPageNumber + maxPageNumberLimit);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % maxPageNumberLimit === 0) {
        setPageNumberLimit(pageNumberLimit - maxPageNumberLimit);
        setMinPageNumber(minPageNumber - maxPageNumberLimit);
      }
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const renderedPageNumbers = pages.map((number) => {
    if (number < pageNumberLimit + 1 && number > minPageNumber) {
      return (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`pagination-button ${currentPage === number ? "active" : null}`}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const profileView = (uuid) => {
    navigate(`/profile/${uuid}`);
  };

  return (
    <>
      <button
        style={{
          padding: '10px',
          backgroundColor: '#2d3436',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        onClick={goback}
      >
        Go back
      </button>
      <div className="select-game">
        <h1 style={{ color: 'white' }}>Top 100 Leaderboard</h1>
        <div className="form-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Coins</th>
                    <th>Stats</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((row, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                      <td>{row.username}</td>
                      <td>{row.points}</td>
                      <td className="btn">
                        <button
                          className="stats-btn"
                          onClick={() => profileView(row.uuid)}
                        >
                          See Stats
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderedPageNumbers}
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
    )}
    </div>
  </div>
</>
  );
};

export default Leaderboard;