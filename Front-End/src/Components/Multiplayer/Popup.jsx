/* eslint-disable no-unused-vars */
import React, { useEffect,useState,useMemo } from "react";
import Jett from "../../Assets/Val-Battle/Jett.png";
import Phoenix from "../../Assets/Val-Battle/Phoenix.png";
import Renya from "../../Assets/Val-Battle/Renya.png";
import Sage from "../../Assets/Val-Battle/Sage.png";
import Sova from "../../Assets/Val-Battle/Sova.png";
import Viper from "../../Assets/Val-Battle/Viper.png"
import Yoru from "../../Assets/Val-Battle/Yoru.png";
import Breach from "../../Assets/Val-Battle/Breach.png";
import Brim from "../../Assets/Val-Battle/Brim.png";
import Cypher from "../../Assets/Val-Battle/Cypher.png";
import Killjoy from "../../Assets/Val-Battle/Killjoy.png";
import Omen from "../../Assets/Val-Battle/Omen.png";
import Raze from "../../Assets/Val-Battle/Raze.png";
import Skye from "../../Assets/Val-Battle/Skye.png";


const Popup = ({ onClose,user1,user2 }) => {
  const [countdown, setCountdown] = useState(15);
  const [valAgents , setValAgents] = useState([Jett,Phoenix,Renya,Sage,Sova,Viper,Yoru,Breach,Brim,Cypher,Killjoy,Omen,Raze,Skye]);

  const randomAgents = useMemo(() => {
    let agent1, agent2;
  
    do {
      agent1 = valAgents[Math.floor(Math.random() * valAgents.length)];
      agent2 = valAgents[Math.floor(Math.random() * valAgents.length)];
    } while (agent1 === agent2);
  
    return { agent1, agent2 };
  }, [valAgents]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>Most correct answers wins</h2>
        </div>
        <div className="popup-content">
          <div className="user1">
            <img width={400} src={randomAgents.agent1} alt="randomAgent1" />
            <h1>{user1}</h1>
            <h2>1 - 5</h2>
          </div>
          <div className="user2">
            <img width={400} src={randomAgents.agent2} alt="randomAgent2" />
            <h1>{user2}</h1>
            <h2>7 - 2</h2>
          </div>
        </div>
        <div className="popup-footer">
          <p>Battle will begin {countdown} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
