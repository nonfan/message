import ChatModule from '../pages/ChatModule';
import LoginModule from '../pages/LoginModule';

export default [
  {
    path: '/',
    element: <ChatModule />,
  },
  {
    path: '/login',
    element: <LoginModule />,
  },
];
