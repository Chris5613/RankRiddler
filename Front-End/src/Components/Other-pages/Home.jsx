import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="gamecard">
        <div>
          <NavLink to="/valorant">
            <img
              className="main-images"
              src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/valtall_1200x1600-300d8e4cb9bee9dbb1166b574b3bdc93"
              alt="valorant"
            />
          </NavLink>
          <NavLink to="/league">
            <img
              className="main-images"
              src="https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LoL_1200x1600-15ad6c981af8d98f50e833eac7843986"
              alt="league"
            />
          </NavLink>
          <NavLink to="/csgo">
            <img
              className="main-images"
              src="https://downloadwap.com/thumbs4/games/preview/2020j/img/133656_counter-st_1.jpg"
              alt="csgo"
            />
          </NavLink>
        </div>
      </div>
      <div className="home-container">
        <div className="home-instrutions-container">
          <p>
            Head over to{' '}
            <NavLink className="home-text" to="/settings">
              settings
            </NavLink>{' '}
            to set your username
          </p>
          <br />
          <p>
            Submit your clips{' '}
            <NavLink className="home-text" to="/submit">
              here
            </NavLink>
          </p>
          <br />
          <p>
            Report bugs,errors, or feedback{' '}
            <NavLink className="home-text" to="/bug">
              here
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
