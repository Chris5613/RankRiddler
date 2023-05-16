import { NavLink } from 'react-router-dom';
import val from '../../Assets/HomePage-Icons/val.png';
import csgo from '../../Assets/HomePage-Icons/csgo.png';
import league from '../../Assets/HomePage-Icons/league.png';
import valorantImage from '../../Assets/HomePage-Icons/valorantImage.png';
import leagueImage from '../../Assets/HomePage-Icons/leagueImage.png';
import csgoImage from '../../Assets/HomePage-Icons/csgoImage.png';

const Home = () => {
  return (
    <>
      <main className='home-section'>
        <div className='home-container'>
          <div className='main-container'>      
            <h1 className='page-heading-1'>Choose a game</h1>
            <p className='main-text'>Head over to{' '}
            <NavLink className="home-text" to="/settings">
              settings
            </NavLink>{' '}
            to set your username
          </p>
          <div className='image-row'>
            <NavLink to="/valorant">
              <div className="image-container">
                <img className="width main-images" src={valorantImage} alt="valorant" />
                <div className="overlay">
                  <img src={val} alt="valorant"style={{ height: "70px", width: "80px" }} />
                  <h2 className='val-text'>Valorant</h2>
                </div>
              </div>
            </NavLink>
            <NavLink to="/league" className="width main-images">
              <div className="image-container">
                <img  className="width main-images" src={league} alt="league" />
                <div className="overlay">
                  <img src={leagueImage} alt="league-icon" style={{ height: "70px", width: "120px" }} />
                  <h2 className='val-text'>League</h2>
                </div>
              </div>
            </NavLink>
            <NavLink to="/csgo" className="width main-images">
              <div className="image-container">
                <img className="width main-images" src={csgoImage} alt="csgo" />
                <div className="overlay">
                  <img src={csgo} alt="csgo-img"style={{ height: "70px", width: "100px" }} />
                  <h2 className='val-text'>CS:GO</h2>
                </div>
              </div>
            </NavLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
