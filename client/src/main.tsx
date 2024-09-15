import 'animate.css';
import 'antd/dist/reset.css';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store';

document.title = '神秘的Message';

const {themeStore, userStore, messageStore} = store;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider
    store={themeStore}
    userStore={userStore}
    themeStore={themeStore}
    messageStore={messageStore}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
