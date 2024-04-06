import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate('/selection');
  };

  return (
    <div>
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
};

export default BackButton;
