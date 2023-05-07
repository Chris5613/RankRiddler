import { NavLink } from "react-router-dom";

const GameLink = ({ imgSrc, altText, linkText, to }) => (
    <li className="game-link">
      <img className="images" src={imgSrc} alt={altText} />
      <NavLink className="links" to={to}>
        {linkText}
      </NavLink>
    </li>
  );

  
export default GameLink;    