import React from 'react';

const Multiplayer = () => {
  return (
    <div className="multiplayer-container">
      <label className="multiplayer-header">1v1 Multiplayer</label>

      <div className="multiplayer-btn-container">
        <button className="multiplayer-btn">
          Find A Player
        </button>
        <button className="multiplayer-btn">
          Room List
        </button>
        <button className="multiplayer-btn">
          Battle Friend
        </button>
      </div>
    </div>
  );
};

export default Multiplayer;