import {useEffect, useState} from 'react'
import API from '../../api'

const SpinningCoin = () => {
  const [coins, setCoins] = useState(0)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data)
      setCoins(data.points)
    };
    getOneUser(userId);
  }, [userId]);

  return (
    <div className='coin-container'>
      <div className="spinningasset coin is-sm">
          <div>
            <div></div>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <em></em>
            <em></em>
            <div></div>
          </div>
        </div>
        <div className="ml-2">
          {coins}
        </div>      
    </div> 
  )
}

export default SpinningCoin