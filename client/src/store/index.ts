import { makeAutoObservable } from 'mobx';
import { getIsAutoMode, getModeOfColor } from '../utils/localStorage';
import { primaryColor } from '../utils/theme';

class ThemeStore {
  _primaryColor: string = primaryColor;
  _opacity: number = 0;
  _filter: number = 0;
  _isDark: boolean = false;
  _isAutoMode: boolean = false;
  _store: any;
  constructor(store: any) {
    const themeColor = localStorage.getItem('themeColor');
    const isDark = getModeOfColor()
    const isAutoMode = getIsAutoMode()
    if (themeColor) {
      this._primaryColor = themeColor;
    }

    if (isDark) {
      this._isDark = isDark === 'true';
      document.body.className = this.isDark ? 'dark' : 'light'
    }

    if (isAutoMode) {
      this._isAutoMode = isAutoMode === 'true'
    }

    this._store = store;
    makeAutoObservable(this);
  }
  get primaryColor() {
    return this._primaryColor;
  }
  get opacity() {
    return this._opacity
  }
  get filter() {
    return this._filter
  }
  get isDark() {
    return this._isDark;
  }
  get isAutoMode() {
    return this._isAutoMode
  }
  setDark(value: boolean) {
    this._isDark = value
    document.body.className = value ? 'dark' : 'light'
  }
  setAutoMode(value: boolean) {
    this._isAutoMode = value
  }
  modifyPrimaryColor(color: string) {
    this._primaryColor = color;
  }
  modifyOpacity(num: number) {
    this._opacity = num;
  }
  modifyFilter(num: number) {
    this._filter = num;
  }
}

class UserStore {
  _username = 'messager';
  _email = 'xxx@xxx.com';
  _store: any;
  constructor(store: any) {
    let user = localStorage.getItem('user');
    if (user) {
      this._username = JSON.parse(user).username;
      this._email = JSON.parse(user).email;
    }

    this._store = store;
    makeAutoObservable(this);
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  modifyUser(username: string, email: string) {
    this._username = username;
    this._email = email;
  }
}

interface IMessage {
  userId: string;
  message: string;
  username: string;
  avatar: string;
}

class MessageStore {
  _page: number = 0;
  _size: number = 20;
  _store: any;
  _messageList: IMessage[] = [];

  constructor(store: any) {
    this._store = store;
    makeAutoObservable(this);
  }

  get page() {
    return this._page;
  }

  get size() {
    return this._size;
  }

  get messageList() {
    return this._messageList;
  }

  pushMessage(message: any) {
    this._messageList.push(message)
  }

  pushManyMessages(messages: any[]) {
    this._messageList = messages;
  }
}

class Store {
  themeStore: ThemeStore;
  userStore: UserStore;
  messageStore: MessageStore;
  constructor() {
    this.themeStore = new ThemeStore(this);
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
  }
}

export default new Store();
