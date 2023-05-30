import { NavLink } from 'react-router-dom';

// Common ImageLink component
const ImageLink = ({ to, imageSrc, overlayImageSrc }) => (
  <NavLink to={to} className="width main-images">
    <div className="image-container">
      <img className="width main-images" src={imageSrc} alt="main" />
      <div className="overlay">
        <img width={200} src={overlayImageSrc} alt="main" className='main-overlay'/>
      </div>
    </div>
  </NavLink>
);

export default ImageLink;
