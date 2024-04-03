import React from 'react'

const GameStatBox = ({src,game}) => {
  return (
  <div className="stat-box">
    <img  src={src} alt="valorant_logo" />
    <p><b>{game}</b></p>
    <div className='game-stat-container'>
      <div className='game-stats'>
        <h3>Rounds</h3>
        <h3>5</h3>
      </div>
      <div className='game-stats'>
        <h3>Accuracy</h3>
        <h3>5</h3>
      </div>
    </div>
  </div>
  )
}

export default GameStatBox