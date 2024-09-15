import { EmailController } from '../controllers/EmailController';

export const EmailRoute = [
  {
    method: 'post',
    route: '/email',
    controller: EmailController,
    action: 'getCode',
  },
];
