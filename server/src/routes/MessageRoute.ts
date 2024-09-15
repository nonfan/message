import { MessageController } from '../controllers/MessageController';

export const MessageRoute = [
  {
    method: 'get',
    route: '/messages',
    controller: MessageController,
    action: 'getMessageList',
  },
];
