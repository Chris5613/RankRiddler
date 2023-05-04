import React from 'react';
import Iron from '../Assets/Val-Ranks/Iron.png';
import Bronze from '../Assets/Val-Ranks/Bronze.png';
import Silver from '../Assets/Val-Ranks/Sliver.png';
import Gold from '../Assets/Val-Ranks/Gold.png';
import Platinum from '../Assets/Val-Ranks/Plat.png';
import Diamond from '../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../Assets/Val-Ranks/Immortal.png';
import Radiant from '../Assets/Val-Ranks/Radiant.png';


const Valorant = () => {
  return (
    <>
      <div>
        <iframe
          className="video"
          width="1000"
          height="550"
          src="https://www.youtube.com/embed/04z2QXTbFMU"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className='ranks'>
        <img className='rank iron' src={Iron} alt="Iron"/>
        <img className='rank bronze ' src={Bronze} alt="Bronze" />
        <img className='silver' width={100} src={Silver} alt="Silver" />
        <img width={60} src={Gold} alt="Gold" className='gold' />
        <img className='rank plat' src={Platinum} alt="Platinum" />
        <img className='rank diamond' src={Diamond} alt="Diamond" />
        <img className='rank asc' src={Ascendant} alt="Ascendant" />
        <img className="immortal" width={60} src={Immortal} alt="Immortal" />
        <img width={80} src={Radiant} alt="Radiant"  className="radiant"/>
      </div>
    </>
  );
};

export default Valorant;
