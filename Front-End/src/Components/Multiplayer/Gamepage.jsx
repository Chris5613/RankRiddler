import { useSocket } from '../SocketContext';
import {useEffect,useState} from 'react';
import Loader from '../Loader/Loader';


const Gamepage = () => {
  const [opponent, setOpponent] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

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
      {loading ? (
            <Loader />
          ) : (
            <>
              {opponent}
            </>
          )}
    </div>
  )
}

export default Gamepage