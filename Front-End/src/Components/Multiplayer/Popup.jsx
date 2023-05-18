import React, { useEffect, useState } from "react";

const Popup = ({ onClose }) => {
  const [countdown, setCountdown] = useState(100);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdown((prevCountdown) => prevCountdown - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     onClose();
  //   }
  // }, [countdown, onClose]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>Most correct answers wins</h2>
        </div>
        <div className="popup-content">
          <div className="user1">
            <p>User 1</p>
            <p>1-0</p>
          </div>
          <img width={120} src="https://png.pngtree.com/png-vector/20220721/ourmid/pngtree-vs-or-versus-text-logo-grunge-style-transparent-png-png-image_6022263.png" alt="" />
          <div className="user2">
            <p>User 2</p>
            <p>0-4</p>
          </div>
        </div>
        <div className="popup-footer">
          <p>Battle will begin {countdown} seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
