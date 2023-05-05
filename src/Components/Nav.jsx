import { NavLink } from 'react-router-dom';
import logo from '../Assets/Nav-Icons/logo.png';
import lol from '../Assets/Nav-Icons/LoL.png';
import val from '../Assets/Nav-Icons/valorant.png';
import csgo from '../Assets/Nav-Icons/csgo.png';
import submit from '../Assets/Nav-Icons/submit.png';
import leader from '../Assets/Nav-Icons/leaderboard.png';
import profile from '../Assets/Nav-Icons/Profile.png';

const Nav = () => {

  // const logout = async () => {
  //   const url = `${process.env.REACT_APP_POSTS_API_HOST}/token`;
  //   const response = await fetch(url, {
  //     method: "DELETE",
  //     credentials: "include",
  //   });
  //   if (response.ok) {
  //     navigate("/");
  //     setLoggedIn(false);
  //   }
  // };
  return (
    <>
      <div className="app">
        <div className="sidebar active">
          <ul>
            <li className="game-link">
              <img className="images" src={val} alt="Valorant" />
              <NavLink className="links" to="/valorant">
                Valorant
              </NavLink>
            </li>
            <li className="game-link">
              <img className="images" src={lol} alt="league" />
              <NavLink className="links" to="/league">
                League
              </NavLink>
            </li>
            <li className="game-link">
              <img className="images" src={csgo} alt="csgo" />
              <NavLink className="links" to="/csgo">
                CSGO
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="bottom-links">
              <img src={submit} alt="movie-logo" width={50} />
              <NavLink className="links nav-text" to="/submit">
                Submit a Clip
              </NavLink>
            </li>
            <li className="bottom-links">
              <img src={leader} alt="movie-logo" width={50} />
              <NavLink className="links" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="bottom-links">
              <img src={profile} alt="movie-logo" width={45} />
              <NavLink className="links" to="/login">
                Login/Signup
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/"
                onClick={logout}
              >
                Logout
              </NavLink> */}
            </li>
          </ul>
          <hr />
          <ul>
            <li className="bottom-links other-links">
              <a href="/tos">Terms Of Services</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/bug">Report a Bug</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
    </>
  );
};

export default Nav;
