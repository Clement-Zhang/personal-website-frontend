import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_DATING_BACKEND_SOCKET);

export default socket;
