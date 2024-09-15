/**
 * 获取token
 * 移除token
 */
function getToken(): string {
  return localStorage.getItem('token') || '';
}

function removeToken() {
  localStorage.removeItem('token');
}

function removeUserInfo() {
  localStorage.removeItem('avatar_image');
  localStorage.removeItem('user');
  localStorage.removeItem('themeColor');
  localStorage.removeItem('userId');
  localStorage.removeItem('imageSrc');
}

function saveUserInfo(info: any) {
  localStorage.setItem('user', JSON.stringify(info))
}

function parseStorageMessage() {
  const list = localStorage.getItem('messageList');

  if (!list) {
    return [];
  }

  const newList = list.split('|').map((item) => {
    return JSON.parse(item);
  });

  return newList;
}

/**
 * 存储消息
 * @param messageList
 * @returns
 */

function storageMessage(messageList: Array<any>) {
  /**BUG 当页面刷新时，useState存储的数据将是空的，故会传递空数组进来 */
  if (messageList.length === 0) {
    return;
  }

  const messageString = messageList
    .map((item) => {
      return JSON.stringify(item);
    })
    .join('|');
  localStorage.setItem('messageList', messageString);
}

/**
 * 存储用户信息
 */
function storageUserInfo(data: any) {
  const { token, user } = data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', user.id);
  localStorage.setItem('user', JSON.stringify(user));
}

function setDarkOrLight(value: boolean) {
  localStorage.setItem('isDark', `${value}`)
}

function setAutoMode(value: boolean) {
  localStorage.setItem('isAutoMode', `${value}`)
}

function getModeOfColor() {
  return localStorage.getItem('isDark') || 'light'
}

function getIsAutoMode() {
  return localStorage.getItem('isAutoMode') || 'false'
}

/**
 * 获取信息
 */

function getUserId() {
  return localStorage.getItem('userId') || ''
}

export {
  getIsAutoMode, getModeOfColor, getToken, getUserId, parseStorageMessage,
  removeToken,
  removeUserInfo,
  saveUserInfo, setAutoMode, setDarkOrLight, storageMessage,
  storageUserInfo
};

