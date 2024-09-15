import { CloudUploadOutlined, SettingOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { getMessageList } from '../../apis/user';
import Auth from '../../components/Auth';
import BackgroundImage from '../../components/BackgroundImage';
import RightMenu from '../../components/RightMenu';
import { addEventListenerOfRightMenu, removeEventListenerOfRightMenu } from '../../utils';
import { connectMainChat } from '../../utils/socket';
import SettingModule from '../SettingModule';
import Chat from './Chat';
import './index.scss';

function ChatModule(props: any) {
  const [clientXY, setClientXY] = useState<any[]>([-1000, -1000]);
  const [isShowRightMenu, setIsShowRightMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<any[]>([]);

  const { page, size } = props.messageStore;

  const settingRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);

  async function handleRightMenu(e: any) {
    e.preventDefault();
    await setIsShowRightMenu(false);
    await setClientXY([e.clientX, e.clientY]);
    await setIsShowRightMenu(true);
  }

  async function getMessages() {
    const { data } = await getMessageList(page, size)
    props.messageStore.pushManyMessages(data.data)
  }

  useEffect(() => {
    getMessages()

    connectMainChat((message: any) => {
      props.messageStore.pushMessage(message)
    });

    setMenu([
      {
        name: '换壁纸',
        clickFunction: () => {
          (backgroundImageRef.current as any).upload();
        },
        icon: <CloudUploadOutlined />,
      },
      {
        name: '设置',
        clickFunction: () => {
          (settingRef.current as any)?.open();
        },
        icon: <SettingOutlined />,
      },
    ]);

    addEventListenerOfRightMenu(handleRightMenu, setIsShowRightMenu)
    return () => {
      removeEventListenerOfRightMenu(handleRightMenu, setIsShowRightMenu)
    };
  }, []);

  return (
    <Auth>
      <div className='chatmodule-container'>
        <BackgroundImage ref={backgroundImageRef} />
        <Chat />
        <SettingModule ref={settingRef} />
        <RightMenu clientXY={clientXY} isShow={isShowRightMenu} menu={menu} />
      </div>
    </Auth>
  );
}

export default inject('messageStore')(observer(ChatModule));
