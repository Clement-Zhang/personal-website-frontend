import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io(process.env.REACT_APP_DATING_BACKEND_SOCKET);

export const useOnEvent = (event, handleData) =>
    useEffect(() => {
        socket.on(event, handleData);
        return () => {
            socket.off(event, handleData);
        };
    }, []);

export const request = async (event, data) => socket.emitWithAck(event, data);
