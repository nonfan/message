import useMessage from 'antd/es/message/useMessage';
import {inject, observer} from 'mobx-react';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {uploadImage} from '../../apis/upload';
import {putUserInfo} from '../../apis/user';
import {createInputElement, handleGetUserInfo} from '../../utils';
import {saveUserInfo} from '../../utils/localStorage';
import './index.scss';

const BackgroundImage = forwardRef<HTMLDivElement>((props: any, ref: any) => {
  const {themeStore} = props;

  const [messageApi, holderContext] = useMessage();
  const [wallpaper, setWallpaper] = useState<string>();
  const [userId, setUserId] = useState<string>('');

  const key = 'updatable';

  useImperativeHandle(ref, () => ({
    upload: handleUpdateBgImage,
  }));

  const handleUpdateBgImage = () => {
    const input = createInputElement();

    input.addEventListener('change', async (e: any) => {
      messageApi.open({
        key,
        type: 'loading',
        content: '正在更换壁纸……',
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

      const result = await putUserInfo(userId, {
        wallpaper: data.url,
      });

      setWallpaper(data.url);
      saveUserInfo(result.data.user);
      messageApi.destroy(key);
    });
    input.click();
  };

  useEffect(() => {
    const user = handleGetUserInfo();
    setWallpaper(user.wallpaper);
    setUserId(user.id);
  }, []);

  return (
    <div
      className='background-image-container transition'
      ref={ref}
      style={{filter: `blur(${themeStore.filter}px)`}}
    >
      {holderContext}
      {wallpaper ? <img src={wallpaper} alt='墙纸' /> : ''}

      <div className='mask' style={{opacity: themeStore.opacity}}></div>
    </div>
  );
});

export default inject('themeStore')(observer(BackgroundImage));
