import { io } from 'socket.io-client';
import { useEffect } from 'react';

export const socket = io(process.env.REACT_APP_DATING_BACKEND_SOCKET);

// export function socketEvent(event, data)