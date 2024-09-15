import {Drawer} from 'antd';
import {inject, observer} from 'mobx-react';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import HeaderAvater from './HeaderAvatar';
import './index.scss';
import handleGetListForSetting from './settingList';

interface IList {
  key: string;
  name: string;
  icon: any;
  component: any;
  description: string;
}

const SettingModule = forwardRef<HTMLDivElement>((props: any, ref: any) => {
  const {themeStore} = props;

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string>('user');
  const [list, setList] = useState<IList[]>([]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const onClose = () => {
    setOpen(false);
  };

  const handleItemClick = (name: string) => {
    setCurrentItem(name);
  };

  useEffect(() => {
    const list = handleGetListForSetting();
    setList(list);
  }, []);

  return (
    <div ref={ref}>
      <Drawer
        closable={false}
        placement='right'
        onClose={onClose}
        open={open}
        width={450}
        className='setting-module-container transition'
      >
        <header>
          <aside>
            <HeaderAvater />
          </aside>
          {list.map((item) => {
            if (item.key === currentItem) {
              return (
                <div className='title' key={item.key}>
                  <span>{item.name}</span>
                  <span>{item.description}</span>
                </div>
              );
            }

            return null;
          })}
        </header>
        <main>
          <aside>
            {list.map((item) => {
              return (
                <div
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  style={{
                    color:
                      item.key === currentItem ? themeStore.primaryColor : null,
                  }}
                  className={[
                    'item',
                    item.key === currentItem ? 'active' : '',
                  ].join(' ')}
                >
                  <item.icon
                    color={
                      item.key === currentItem ? themeStore.primaryColor : ''
                    }
                    className={item.key === currentItem ? '' : 'item-icon'}
                  />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </aside>
          <div className='content transition'>
            {list.map((item) => {
              if (item.key === currentItem) {
                return <item.component key={item.key} />;
              }
              return null;
            })}
          </div>
        </main>

        {/* 关闭图标 */}
        <div className='close-icon' onClick={onClose}>
          <div className='icon'></div>
        </div>
      </Drawer>
    </div>
  );
});

export default inject('themeStore')(observer(SettingModule));
