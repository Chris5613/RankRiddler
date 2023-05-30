import { NavLink } from 'react-router-dom';

const ImageLink = ({ to, imageSrc, overlayImageSrc ,text}) => (
  <NavLink to={to} className="width main-images">
    <div className="image-container">
      <img className="width main-images" src={imageSrc} alt="main" />
      <div className="overlay">
        <img width={200} src={overlayImageSrc} alt="main" className='main-overlay'/>
        <h2>{text}</h2>
      </div>
    </div>
  </NavLink>
);

export default ImageLink;
