import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io(process.env.REACT_APP_DATING_BACKEND_SOCKET);

export const emitEvent = (event, data, onEvent = () => {}) =>
    useEffect(() => {
        socket.on(event, (data) => onEvent(data));
        return () => {
            socket.off(event, (data) => onEvent(data));
        };
    }, []);

export const request = async (event, data) => socket.emitWithAck(event, data);
