import React, { useState } from 'react';

function Submit() {
  const [game, setGame] = useState('');

  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  return (
    <>
      <div className="select-game">
        <h2>Choose a game to submit a clip</h2>
        <select className="select" value={game} onChange={handleGameChange}>
          <option value="">-- Select a game --</option>
          <option value="lol">League of Legends</option>
          <option value="val">Valorant</option>
          <option value="csgo">CS:GO</option>
        </select>
        {game === 'lol' && <Form game="league" />}
        {game === 'val' && <Form game="val" />}
        {game === 'csgo' && <Form game="csgo" />}
      </div>
      <div className="text">
        Clips must be submitted in the following format or will be{' '}
        <span style={{ color: 'red' }}>REJECTED</span>
        <ul className="submission-list">
          <li>Must be from a ranked match</li>
          <li>Must be from 30 seconds to 1 min long</li>
          <li>Must Submit Clips from Youtube Only</li>
          <li>No Smurfing</li>
          <li>At least be 720p</li>
        </ul>
      </div>
    </>
  );
}

function Form(props) {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [playerInfo, setPlayerInfo] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handlePlayerInfoChange = (event) => {
    setPlayerInfo(event.target.value);
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      youtubeLink: youtubeLink,
      playerInfo: playerInfo,
      rank: selectedRank,
    };

    try {
      const response = await fetch(
        `https://rr-back-end.onrender.com/form/${props.game}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      alert('Error submitting form. Please try again later.');
    }
  };

  const gameOptions = {
    league: {
      ranks: [
        { value: '', label: 'Select a rank' },
        { value: 'Iron', label: 'Iron' },
        { value: 'Bronze', label: 'Bronze' },
        { value: 'Silver', label: 'Silver' },
        { value: 'Gold', label: 'Gold' },
        { value: 'Platinum', label: 'Platinum' },
        { value: 'Diamond', label: 'Diamond' },
        { value: 'Master', label: 'Master' },
        { value: 'Grandmaster', label: 'Grandmaster' },
        { value: 'Challenger', label: 'Challenger' },
      ],
    },
    val: {
      ranks: [
        { value: '', label: 'Select a rank' },
        { value: 'Iron', label: 'Iron' },
        { value: 'Bronze', label: 'Bronze' },
        { value: 'Silver', label: 'Silver' },
        { value: 'Gold', label: 'Gold' },
        { value: 'Platinum', label: 'Platinum' },
        { value: 'Diamond', label: 'Diamond' },
        { value: 'Immortal', label: 'Immortal' },
        { value: 'Ascendant', label: 'Ascendant' },
        { value: 'Radiant', label: 'Radiant' },
      ],
    },
    csgo: {
      ranks: [
        { value: '', label: 'Select a rank' },
        { value: 'Silver', label: 'Silver' },
        { value: 'Silver Elite', label: 'Silver Elite' },
        { value: 'Gold Nova', label: 'Gold Nova' },
        { value: 'Master Guardian', label: 'Master Guardian' },
        { value: 'Master Guardian Elite', label: 'Master Guardian Elite' },
        {
          value: 'Distinguished Master Guardian',
          label: 'Distinguished Master Guardian',
        },
        { value: 'Legendary Eagle', label: 'Legendary Eagle' },
        {
          value: 'Supreme Master First Class',
          label: 'Supreme Master First Class',
        },
        { value: 'Global Elite', label: 'Global Elite' },
      ],
    },
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label className="form-label" htmlFor="youtubeLink">
            Youtube Link <span style={{ color: '#e34234' }}>*</span>
          </label>
          <input
            className="form-input"
            type="url"
            id="youtubeLink"
            name="youtubeLink"
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="playerInfo" className="form-label">
            Player Info <span style={{ color: '#e34234' }}>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="playerInfo"
            name="playerInfo"
            value={playerInfo}
            onChange={handlePlayerInfoChange}
            required
          />
        </div>
        <div className="form">
          <select
            className="select"
            id="rank"
            name="rank"
            value={selectedRank}
            onChange={handleRankChange}
            required
          >
            {gameOptions[props.game].ranks.map((rank) => (
              <option key={rank.value} value={rank.value}>
                {rank.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form">
          <label
            htmlFor="checkbox"
            style={{ color: 'white', marginLeft: '10px' }}
          >
            I agree to the terms and conditions
          </label>
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            required
          />
        </div>
        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Submit;
