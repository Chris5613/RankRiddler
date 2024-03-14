import { useSocket } from '../SocketContext';
import {useEffect,useState} from 'react';
import Loader from '../Loader/Loader';
import {useSelector } from 'react-redux';
import API from '../../api';

const Gamepage = () => {
  
  const [opponent, setOpponent] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const userId = useSelector((state) => state.settings.userId);
  const [username, setUsername] = useState('')

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsername(data.username)
    };
    getOneUser(userId);
  }, [userId])

    useEffect(() => {
    socket.on('matchFound', (data) => {
      setOpponent(data.opponent)
      setLoading(false)
    }); 
    return () => {
      socket.off('matchFound');
    };
  }, [socket]);

  console.log(opponent)
  return (
    <div>
      <div >
        {loading ? (
        <div className='loading'>
          <Loader />      
        </div>
        ) : (
          <>
            {username} vs {opponent}
          </>
        )}
      </div>  
    </div>
  )
}

export default Gamepage