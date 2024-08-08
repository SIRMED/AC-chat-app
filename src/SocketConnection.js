import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:8000/');
export default socket