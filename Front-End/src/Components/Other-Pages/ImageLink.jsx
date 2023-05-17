import { NavLink } from 'react-router-dom';

// Common ImageLink component
const ImageLink = ({ to, imageSrc, overlayImageSrc, overlayText }) => (
  <NavLink to={to} className="width main-images">
    <div className="image-container">
      <img className="width main-images" src={imageSrc} alt={overlayText} />
      <div className="overlay">
        <img width={100} src={overlayImageSrc} alt={overlayText} />
        <h2 className="val-text">{overlayText}</h2>
      </div>
    </div>
  </NavLink>
);

export default ImageLink;
