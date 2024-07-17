import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const useWebSocket = (url, event, sound) => {
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);
  const audio = new Audio(sound);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const socket = io('http://localhost:5000');
    socket.on(event, (message) => {
      setData((prevData) => [message, ...prevData]);
      console.log("=====> te5dem rahi 8ir enta mech")
      setNotification('A new message has been received!');
      audio.play();
      setTimeout(() => {
        setNotification(null);
      }, 10000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { data, notification };
};

export default useWebSocket;
