/* eslint-disable no-unused-vars */
import logo from '../../Assets/Nav-Icons/logo.png';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <header>
        <div className="nav-container">
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/" className="nav-link">
                  <svg
                    className="main-svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.35715 6.11902C4.88251 6.11902 6.11906 4.88248 6.11906 3.35712C6.11906 1.83176 4.88251 0.595215 3.35715 0.595215C1.83179 0.595215 0.595245 1.83176 0.595245 3.35712C0.595245 4.88248 1.83179 6.11902 3.35715 6.11902Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M11.6429 6.11902C13.1682 6.11902 14.4048 4.88248 14.4048 3.35712C14.4048 1.83176 13.1682 0.595215 11.6429 0.595215C10.1175 0.595215 8.88095 1.83176 8.88095 3.35712C8.88095 4.88248 10.1175 6.11902 11.6429 6.11902Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.35715 14.4047C4.88251 14.4047 6.11906 13.1681 6.11906 11.6428C6.11906 10.1174 4.88251 8.88086 3.35715 8.88086C1.83179 8.88086 0.595245 10.1174 0.595245 11.6428C0.595245 13.1681 1.83179 14.4047 3.35715 14.4047Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M11.6429 14.4047C13.1682 14.4047 14.4048 13.1681 14.4048 11.6428C14.4048 10.1174 13.1682 8.88086 11.6429 8.88086C10.1175 8.88086 8.88095 10.1174 8.88095 11.6428C8.88095 13.1681 10.1175 14.4047 11.6429 14.4047Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v2H3zM3 9h18v2H3zM3 15h18v2H3zM3 21h18v2H3z" />
                    <path d="M12 3v18m-9-9h18" />
                  </svg>
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/multiplayer" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="6.5" cy="16" r="3" />
                    <circle cx="17.5" cy="16" r="3" />
                    <path d="M8.5 16h-2" />
                    <path d="M15.5 16h2" />
                  </svg>
                  Multiplayer
                </NavLink>
              </li>
              <a href="/">
                <img src={logo} alt="logo" className="logo" />
              </a>
              <li>
                <NavLink to="/submit" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 3H3v18h18V3zm-4 12h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                  Submit Clips
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.5 1.5 0 0 1-1.4 1H18" />
                    <path d="M4.6 15a1.5 1.5 0 0 0 1.4 1H6" />
                    <path d="M19.4 9a1.5 1.5 0 0 0-1.4-1H18" />
                    <path d="M4.6 9a1.5 1.5 0 0 1-1.4-1H2" />
                    <path d="M15 22.4a1.5 1.5 0 0 1 0-2.8V18" />
                    <path d="M9 22.4a1.5 1.5 0 0 0 0-2.8V18" />
                    <path d="M20 4.6a1.5 1.5 0 0 1-2.8 0H15" />
                    <path d="M20 9.4a1.5 1.5 0 0 0-2.8 0H15" />
                  </svg>
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/howto" className="nav-link">
                  <svg
                    className="h-6 w-6"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 15.7379C12.4975 15.7379 15.7381 12.4973 15.7381 8.49981C15.7381 4.50232 12.4975 1.26172 8.5 1.26172C4.50251 1.26172 1.2619 4.50232 1.2619 8.49981C1.2619 12.4973 4.50251 15.7379 8.5 15.7379Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.49998 9.40444V8.49968L9.77932 7.22034C10.1187 6.88107 10.3094 6.42089 10.3095 5.94101V5.78539C10.3095 5.23077 9.99646 4.72411 9.50065 4.4762L9.30884 4.3803C9.05768 4.25479 8.78076 4.18945 8.49998 4.18945C8.21921 4.18945 7.94229 4.25479 7.69113 4.3803L7.59522 4.42825C7.0406 4.70511 6.69046 5.27239 6.69046 5.89215V6.69015"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.50001 13.0234C8.99969 13.0234 9.40477 12.6183 9.40477 12.1186C9.40477 11.6189 8.99969 11.2139 8.50001 11.2139C8.00032 11.2139 7.59525 11.6189 7.59525 12.1186C7.59525 12.6183 8.00032 13.0234 8.50001 13.0234Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Nav;
