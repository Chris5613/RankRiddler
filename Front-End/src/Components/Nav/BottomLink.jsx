import { NavLink } from 'react-router-dom';

const BottomLink = ({ imgSrc, altText, linkText, to, onClick }) => (
  <li className="bottom-links">
    <img src={imgSrc} alt={altText} width={50} className="bottom-img" />
    <NavLink className="links" to={to} onClick={onClick}>
      {linkText}
    </NavLink>
  </li>
);

export default BottomLink;
