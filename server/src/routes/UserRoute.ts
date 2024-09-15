import { UserController } from '../controllers/UserController';

export const UserRoute = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'getList',
  },
  {
    method: 'get',
    route: '/user/:id',
    controller: UserController,
    action: 'getUserInfo',
  },
  {
    method: 'post',
    route: '/user/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'delete',
    route: '/user/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'put',
    route: '/user/:id',
    controller: UserController,
    action: 'update',
  },
];
