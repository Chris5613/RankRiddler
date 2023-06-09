import React from 'react';

const Main = () => {
  return (
    <div id="main-h1">
      <h6>1v1 Multiplayer</h6>

      <div className='multiplayer-btn-container'>
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

export default Main;
