import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import useMessage from 'antd/es/message/useMessage';
import {inject, observer} from 'mobx-react';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {uploadImage} from '../../../apis/upload';
import {putUserInfo} from '../../../apis/user';
import {createInputElement, handleGetUserInfo} from '../../../utils';
import {
  removeToken,
  removeUserInfo,
  saveUserInfo,
} from '../../../utils/localStorage';
import InfoModal from './InfoModal';

function User(props: any) {
  const {userStore, themeStore} = props;
  const [user, setUser] = useState<any>();
  const [messageApi, holderContext] = useMessage();

  const key = 'User_Update';

  const infoModalRef = useRef<HTMLDivElement>(null);

  const navigator = useNavigate();

  const handleModifyUserInfo = () => {
    (infoModalRef.current as any).open(user);
  };

  const handleUploadAvatar = () => {
    const input = createInputElement();

    input.addEventListener('change', async (e: any) => {
      messageApi.open({
        key,
        type: 'loading',
        content: '正在更换头像……',
        duration: 0,
      });

      const {data} = await uploadImage(e.target.files[0]);

      if (data.code !== 200) {
        return messageApi.open({
          key,
          type: 'warning',
          content: data.msg,
        });
      }

      const result = await putUserInfo(user.id, {
        avatar: data.url,
      });

      setUser(result.data.user);
      saveUserInfo(result.data.user);
      messageApi.destroy(key);
    });

    input.click();
  };

  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    navigator('/login');
  };

  useEffect(() => {
    const user = handleGetUserInfo();
    setUser(user);
  }, []);
  const render = () => (
    <div className='user-container'>
      {holderContext}
      <div className='white-block user-info'>
        {user.avatar ? (
          <img src={user.avatar} alt='' />
        ) : (
          <Avatar shape='square' size={36} icon={<UserOutlined />} />
        )}

        <div className='right'>
          <span>{userStore.username}</span>
          <span>{userStore.email}</span>
        </div>
      </div>

      <div
        style={{color: themeStore.primaryColor}}
        className='white-block pointer'
        onClick={handleUploadAvatar}
      >
        上传头像
      </div>

      <div
        style={{color: themeStore.primaryColor}}
        className='white-block pointer'
        onClick={handleModifyUserInfo}
      >
        修改信息
      </div>

      <div
        className='white-block pointer'
        onClick={handleLogout}
        style={{color: 'red'}}
      >
        退出登录
      </div>

      {/* 修改信息的弹窗 */}
      <InfoModal ref={infoModalRef} />
    </div>
  );

  return user ? render() : null;
}

export default inject('themeStore', 'userStore')(observer(User));
