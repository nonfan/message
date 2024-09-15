import { CommonRoute } from './CommonRoute';
import { EmailRoute } from './EmailRoute';
import { MessageRoute } from './MessageRoute';
import { UserRoute } from './UserRoute';

interface IRoutes {
  method: string;
  route: string;
  controller: any;
  action: string;
}

export const routes: IRoutes[] = [...UserRoute, ...EmailRoute, ...MessageRoute, ...CommonRoute];
