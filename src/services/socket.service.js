import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_DATING_BACKEND_SOCKET);

export const stream = async (event, ongoing, handler) =>
    new Promise((resolve) => {
        function eventHandler(data) {
            if (data.type === ongoing) {
                handler(data);
            } else if (data.type === 'end') {
                socket.off(event, eventHandler);
                resolve();
            }
        }
        socket.on(event, eventHandler);
    });

export const send = (event, data) => socket.emit(event, data);

export const request = async (event, data) => socket.emitWithAck(event, data);
