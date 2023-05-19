import { NavLink } from 'react-router-dom';
import val from '../../Assets/HomePage-Icons/val.png';
import csgo from '../../Assets/HomePage-Icons/csgo.png';
import league from '../../Assets/HomePage-Icons/league.png';
import valorantImage from '../../Assets/HomePage-Icons/valorantImage.png';
import leagueImage from '../../Assets/HomePage-Icons/leagueImage.png';
import csgoImage from '../../Assets/HomePage-Icons/csgoImage.png';
import ImageLink from './ImageLink';

const Home = () => {
  return (
    <>
      <main className="home-section">
        <div className="home-container">
          <div className="main-container">
            <h1 className="page-heading-1">Choose a game</h1>
            <p className="main-text">
              Head over to{' '}
              <NavLink className="home-text" to="/settings">
                settings
              </NavLink>{' '}
              to set your username
            </p>
            <div className="image-row">
              <ImageLink
                to="/valorant"
                imageSrc={valorantImage}
                overlayImageSrc={val}
                overlayText="Valorant"
              />
              <ImageLink
                to="/league"
                imageSrc={league}
                overlayImageSrc={leagueImage}
                overlayText="League"
              />
              <ImageLink
                to="/csgo"
                imageSrc={csgoImage}
                overlayImageSrc={csgo}
                overlayText="CS:GO"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
