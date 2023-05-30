import { NavLink } from 'react-router-dom';
import val from '../../Assets/HomePage-Icons/val.png';
import csgo from '../../Assets/HomePage-Icons/csgo.png';
import league from '../../Assets/HomePage-Icons/league.png';
import apex from '../../Assets/HomePage-Icons/apex.png';
import overwatch from '../../Assets/HomePage-Icons/overwatch.png';
import valorantImage from '../../Assets/HomePage-Icons/valorantImage.png';
import leagueImage from '../../Assets/HomePage-Icons/leagueImage.png';
import csgoImage from '../../Assets/HomePage-Icons/csgoImage.png';
import ImageLink from './ImageLink';
import overwatchImage from '../../Assets/HomePage-Icons/overwatchImage.png';
import rocket from '../../Assets/HomePage-Icons/rocket.png';
import rocketImage from '../../Assets/HomePage-Icons/rocketImage.png';
import rainbow from '../../Assets/HomePage-Icons/rainbow.png';
import fortnite from '../../Assets/HomePage-Icons/fortnite.png';
import rainbowImage from '../../Assets/HomePage-Icons/rainbowImage.png';

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
                SETTINGS
              </NavLink>{' '}
              to set your username.
            </p>
            <div className="image-row">
              <ImageLink
                to="/valorant"
                imageSrc={valorantImage}
                overlayImageSrc={val}
              />
              <ImageLink
                to="/league"
                imageSrc={league}
                overlayImageSrc={leagueImage}
              />
              <ImageLink
                to="/csgo"
                imageSrc={csgoImage}
                overlayImageSrc={csgo}
              />
              <ImageLink
                to="/"
                imageSrc={rainbowImage}
                overlayImageSrc={rainbow}
                overlayText="COMING SOON"
              />
            </div>
            <div className="image-row margin-right">
              <ImageLink
                to="/apex"
                imageSrc="https://i.gyazo.com/810d909a139fa9b1353bd3848e167ac7.jpg"
                overlayImageSrc={apex}
              />
              <ImageLink
                to="/overwatch"
                imageSrc={overwatchImage}
                overlayImageSrc={overwatch}
              />
              <ImageLink
                to="/rocket"
                imageSrc={rocketImage}
                overlayImageSrc={rocket}
              />
              <ImageLink
                to="/"
                imageSrc="https://i.gyazo.com/6e2d05a6423f905915152bcded55a99f.png"
                overlayImageSrc={fortnite}
                overlayText="COMING SOON"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
