import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import {inject, observer} from 'mobx-react';
import {useRoutes} from 'react-router-dom';
import routes from './routes';

function App({store}) {
  const element = useRoutes(routes);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: store.primaryColor,
        },
      }}
    >
      <div className='app-container'>{element}</div>
    </ConfigProvider>
  );
}

export default inject('store')(observer(App));
