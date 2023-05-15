import React from 'react';

function RankImage(props) {
  const { rank, selectedRank, handleRankClick } = props;
  const isSelected = selectedRank === rank;

  return (
    <img
      className={`rank ${isSelected ? 'selected' : ''}`}
      src={props.src}
      alt={rank}
      onClick={() => handleRankClick(rank)}
    />
  );
}

export default RankImage;
