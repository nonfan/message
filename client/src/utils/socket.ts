import { io } from 'socket.io-client';
import { url } from './config';

const socket = io(url, {
  transports: ['websocket'],
});

function connectMainChat(callback: Function) {
  socket.on('main_chat', (data: any) => {
    callback(data);
  });
}

interface IMessage {
  userId: string;
  message: string;
  username: string;
  avatar: string;
}

function sendMessageForMainChat(message: IMessage) {
  socket.emit('main_chat', message);
}

export { connectMainChat, sendMessageForMainChat };

