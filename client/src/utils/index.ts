function handleLocalImageCovertBase64(file: any, callback: Function) {
  const reader = new FileReader();
  reader.onloadend = function (e: any) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

function createInputElement() {
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  input.accept = '.jpeg,.jpg,.png';
  document.body.appendChild(input);

  return input;
}

function handleGetUserInfo() {
  const user = localStorage.getItem('user');

  if (!user) return {};

  return JSON.parse(user);
}

// 菜单事件的注册和注销
function addEventListenerOfRightMenu(
  handleRightMenu: any,
  setIsShowRightMenu: any
) {
  document.addEventListener('contextmenu', handleRightMenu);
  document.addEventListener('click', () => setIsShowRightMenu(false), false);
  document.addEventListener('scroll', () => setIsShowRightMenu(false), true);
}

function removeEventListenerOfRightMenu(
  handleRightMenu: any,
  setIsShowRightMenu: any
) {
  document.removeEventListener('contextmenu', handleRightMenu);
  document.removeEventListener('click', () => setIsShowRightMenu(false), false);
  document.removeEventListener(
    'scroll',
    () => () => setIsShowRightMenu(false),
    true
  );
}

export {
  addEventListenerOfRightMenu,
  createInputElement,
  handleGetUserInfo,
  handleLocalImageCovertBase64,
  removeEventListenerOfRightMenu
};

