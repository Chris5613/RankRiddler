import { NavLink } from 'react-router-dom';

const ImageLink = ({ to, imageSrc, overlayImageSrc, overlayText }) => (
  <NavLink to={to} className="width main-images">
    <div className="image-container">
      <img className="width main-images" src={imageSrc} alt="main" />
      <div className="overlay">
        <img
          width={200}
          src={overlayImageSrc}
          alt="main"
          className="main-overlay"
        />
        <h2 className="overlayText">{overlayText}</h2>
      </div>
    </div>
  </NavLink>
);

export default ImageLink;
