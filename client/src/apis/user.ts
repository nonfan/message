import request from '../utils/request';

function getUserInfo(id: string) {
  return request({
    url: `/user/${id}`,
    method: 'GET',
  });
}

function postLogin(email: string, code: string) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      email,
      code,
    },
  });
}

function putUserInfo(id: string, info: any) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: info,
  });
}

function getMessageList(page?: number, size?: number) {
  return request({
    url: '/messages',
    method: 'get',
    params: {
      page,
      size
    }
  });
}

export { getMessageList, getUserInfo, postLogin, putUserInfo };

