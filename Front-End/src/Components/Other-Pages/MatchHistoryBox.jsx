import { useEffect, useState } from 'react';
import API from '../../api';

const MatchHistoryBox = ({ username, toggle }) => {
  const [matchStats, setMatchStats] = useState([]);
  const [userWins, setUserWins] = useState([]);

  const gameImageUrls = {
    valorant: require('../../Assets/Match-History-Icons/tiny_val_logo.png'), 
    league: require('../../Assets/Match-History-Icons/lol.png'), 
    overwatch: require('../../Assets/Match-History-Icons/ow.png'), 
    cs2: require('../../Assets/Match-History-Icons/cs2.png'), 
  };

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await fetch(`${API.UserMatchHistory}/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let data = await response.json();
        data.forEach(match => {
          switch(match.game) {
            case "Valorant":
              match.gameDisplayName = "valorant";
              break;
            case "CSGO":
              match.gameDisplayName = "cs2";
              break;
            case "Overwatch":
              match.gameDisplayName = "overwatch";
              break;
            case "League":
              match.gameDisplayName = "league";
              break;
            default:
              match.gameDisplayName = "n/a"; 
          }
          match.opponent = match.player1 === username ? match.player2 : match.player1;
        });
        const sortedMatches = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
        setMatchStats(sortedMatches);
      } catch (error) {
        console.error("Failed to fetch match history:", error);
      }
    };
    fetchMatchHistory();
  }, [username]);

  useEffect(() => {
    const fetchUserWins = async () => {
      try {
        const response = await fetch(`${API.UserWins}/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const sortedMatches = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
        setUserWins(sortedMatches);
      } catch (error) {
        console.error("Failed to fetch match history:", error);
      }
    }
    fetchUserWins()
  }, [username]);

  return (
    <>
      {toggle ? (
        <>
          {userWins.length > 0 ? (
            userWins.map((match, index) => (
              <div key={index} className='match-box'>
                <div className='match-participant'>
                  <h2>Vs</h2>
                  <h2>{match.player1 === username ? match.player2 : match.player1}</h2>
                </div>
                <img src={gameImageUrls[match.game]} alt={`${match.game} logo`} width={100}/>
                <div className='match-result'>
                  <h2 style={{ color: 'green' }}>WIN</h2>
                </div>
              </div>
            ))
          ) : (
            <h2 className='stats-h2'>User has no wins.</h2>
          )}
        </>
      ) : (
        <>
          {matchStats.length > 0 ? (
            matchStats.map((match, index) => (
              <div key={index} className='match-box'>
                <div className='match-participant'>
                  <h2>Vs</h2>
                  <h2>{match.player1 === username ? match.player2 : match.player1}</h2>
                </div>
                <img src={gameImageUrls[match.game]} alt={`${match.game} logo`} width={100}/>
                <div className='match-result'>
                  <h2 style={{ color: match.winner === username ? 'green' : 'red' }}>
                    {match.winner === username ? 'WIN' : 'LOSS'}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <h2 className='stats-h2'>User has no history.</h2>
          )}
        </>
      )}
    </>
  );
}

export default MatchHistoryBox;
