import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8rem',
        gap: '10px',
      }}
    >
      <h1 style={{ fontSize: '4rem', color: '#fff' }}>404-Page not found</h1>
      <p style={{ fontSize: '1.2rem', color: '#fff' }}>
        The page you have requested does not exist
      </p>
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
    </div>
  );
}

export default Error;
