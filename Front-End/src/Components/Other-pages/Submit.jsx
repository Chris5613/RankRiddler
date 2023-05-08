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
        {game === 'lol' && <LeagueOfLegendsForm />}
        {game === 'val' && <ValorantForm />}
        {game === 'csgo' && <CSGOForm />}
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

function LeagueOfLegendsForm() {
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
      const response = await fetch('https://rr-back-end.onrender.com/form/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      alert('Error submitting form. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="url"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <br />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Iron">Iron</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Immortal">Master</option>
          <option value="Radiant">Grandmaster</option>
          <option value="Challenger">Challenger</option>
        </select>
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />

        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

function ValorantForm() {
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
      const response = await fetch('https://rr-back-end.onrender.com/form/val', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      alert('Error submitting form. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="url"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          required
        />
        <br />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} required onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Iron">Iron</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Immortal">Immortal</option>
          <option value="Radiant">Radiant</option>
        </select>
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          required
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />

        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

function CSGOForm() {
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
      const response = await fetch('https://rr-back-end.onrender.com/form/csgo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      alert('Error submitting form. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          YouTube link: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="url"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <br />
        <br />

        <label className="form-label">
          Player info: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea value={playerInfo} onChange={handlePlayerInfoChange} />
        <br />

        <label className="form-label">
          {' '}
          Select a rank: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <select value={selectedRank} onChange={handleRankChange}>
          <option value="">Select a rank</option>
          <option value="Silver">Silver</option>
          <option value="Silver Elite">Silver Elite</option>
          <option value="Gold Nova">Gold Nova</option>
          <option value="aster Guradian">Master Guradian</option>
          <option value="Master Guardian Elite">Master Guardian Elite</option>
          <option value="DMG">DMG</option>
          <option value="Legendary Eagle">Legendary Eagle</option>
          <option value="Supreme">Supreme</option>
          <option value="Global Elite">Global Elite</option>
        </select>
        <br />

        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-label">
          I agree to the terms and conditions
        </label>
        <br />
        <br />
        <button type="submit" disabled={!isChecked}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Submit;
