import { useState, useEffect } from 'react';

const RoundResults = ({ user, enemy, rank }) => {
  const [countdown1, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown1 === 0) {
      setCountdown(0);
    }
  }, [countdown1]);

  const check =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png';

  return (
    <>
      <div className="result-user-container">
        <h1>
          <u>Round 1 Results</u>
        </h1>
        <div>
          <p>
            {user}:
            <img
              src={check}
              width={50}
              alt="Box"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </p>
          <p>{enemy}:</p>
        </div>
      </div>
    </>
  );
};

export default RoundResults;
