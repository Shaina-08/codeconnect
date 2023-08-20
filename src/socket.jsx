import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      reject(new Error('WebSocket connection timed out'));
    }, options.timeout);

    // Replace the REACT_APP_BACKEND_URL with your desired URL
    const socket = io('https://localhost:5000', options);

    socket.on('connect', () => {
      clearTimeout(timeoutId);
      resolve(socket);
    });

    socket.on('connect_error', (error) => {
      clearTimeout(timeoutId);
      reject(error);
    });
  });
};
