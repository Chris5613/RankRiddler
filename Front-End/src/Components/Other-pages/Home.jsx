import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);
  return (
    <>
      <div className="gamecard">
        <div>
          {loggedIn ? (
            <>
              <a href="/valorant">
                <img
                  className="main-images"
                  src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/valtall_1200x1600-300d8e4cb9bee9dbb1166b574b3bdc93"
                  alt="valorant"
                />
              </a>
              <a href="/league">
                <img
                  className="main-images"
                  src="https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LoL_1200x1600-15ad6c981af8d98f50e833eac7843986"
                  alt="league"
                />
              </a>
              <a href="/csgo">
                <img
                  className="main-images"
                  src="https://downloadwap.com/thumbs4/games/preview/2020j/img/133656_counter-st_1.jpg"
                  alt="csgo"
                />
              </a>
            </>
          ) : (
            <>
              <h1 style={{ color: 'white' }}>
                Login or Signup to get started.
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
