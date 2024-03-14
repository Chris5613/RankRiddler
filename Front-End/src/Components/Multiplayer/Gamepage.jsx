import { useSocket } from '../SocketContext';
import {useEffect,useState} from 'react';


const Gamepage = () => {
  const [opponent, setOpponent] = useState('');
  const socket = useSocket();

    useEffect(() => {
    socket.on('matchFound', (data) => {
      setOpponent(data.opponent)
    }); 
    return () => {
      socket.off('matchFound');
    };
  }, [socket]);

  console.log(opponent)
  return (
    <div>{opponent}</div>
  )
}

export default Gamepage