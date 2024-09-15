import {CheckOutlined} from '@ant-design/icons';
import {Button, ColorPicker, Slider, Switch} from 'antd';
import useMessage from 'antd/es/message/useMessage';
import {inject, observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {uploadImage} from '../../../apis/upload';
import {putUserInfo} from '../../../apis/user';
import {createInputElement, handleGetUserInfo} from '../../../utils';
import {
  saveUserInfo,
  setAutoMode,
  setDarkOrLight,
} from '../../../utils/localStorage';

const Theme = (props: any) => {
  const {themeStore} = props;
  const [currentThemeColor, setCurrentThemeColor] = useState<string>(
    themeStore.primaryColor
  );

  const handleModifyColor = (color: string) => {
    themeStore.modifyPrimaryColor(color);
    setCurrentThemeColor(color);
    localStorage.setItem('themeColor', color);
  };

  const handleChangeColor = (value: any, hex: string) => {
    handleModifyColor(hex);
  };

  const [messageApi, holderContext] = useMessage();
  const [wallpaper, setWallpaper] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const key = 'updatable';

  const handleUpdateBgImage = () => {
    const input = createInputElement();

    input.addEventListener('change', async (e: any) => {
      messageApi.open({
        key,
        type: 'loading',
        content: '正在上传壁纸……',
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

  function onChangeOfOpacity(value: number) {
    themeStore.modifyOpacity(value / 100);
  }

  function onChangeOfFilter(value: number) {
    themeStore.modifyFilter(value);
  }

  function onChangeForDark(value: boolean) {
    themeStore.setDark(value);
    setDarkOrLight(value);
  }

  function autoModeListener(e: any) {
    if (e.matches === true) return (document.body.className = 'dark');
    document.body.className = 'light';
  }

  function onChangeAutoMode(value: boolean) {
    themeStore.setAutoMode(value);
    setAutoMode(value);
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    if (value) {
      onChangeForDark(false);
      mediaQueryList.addEventListener('change', autoModeListener);
    } else {
      mediaQueryList.removeEventListener('change', autoModeListener);
    }
  }

  function downloadWallpaper() {
    const a = document.createElement('a');
    a.href = wallpaper;
    a.target = '_blank';
    a.click();
  }

  useEffect(() => {
    const user = handleGetUserInfo();
    setWallpaper(user.wallpaper);
    setUserId(user.id);
  }, []);

  return (
    <div className='theme-container'>
      {holderContext}
      <div className='white-block'>
        <div className='mode'>
          <div className='item'>
            <span>深色模式</span>
            <Switch
              disabled={themeStore.isAutoMode}
              checked={themeStore.isDark}
              onChange={onChangeForDark}
            />
          </div>
          <div className='item'>
            <span>跟随系统</span>
            <Switch
              checked={themeStore.isAutoMode}
              onChange={onChangeAutoMode}
            />
          </div>
        </div>

        <div className='primary'>
          <div className='title'>
            <span>主题色</span>
            <ColorPicker
              placement={'top'}
              value={currentThemeColor}
              onChange={handleChangeColor}
            />
          </div>

          <div className='color-group'>
            {presetColors.map((item) => {
              return (
                <div className='item' key={item}>
                  <div
                    style={{backgroundColor: item}}
                    onClick={() => handleModifyColor(item)}
                  >
                    {currentThemeColor === item ? (
                      <CheckOutlined className='icon' style={{color: '#fff'}} />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='white-block wallpaper'>
        <span>壁纸</span>
        <div className='img' style={{backgroundImage: `url(${wallpaper})`}}>
          <Button
            className='btn'
            style={{color: themeStore.primaryColor}}
            onClick={handleUpdateBgImage}
          >
            上传壁纸
          </Button>
          <Button
            className='btn'
            style={{color: themeStore.primaryColor}}
            onClick={downloadWallpaper}
          >
            下载壁纸
          </Button>
        </div>
        <div className='slider'>
          <div className='title'>遮罩浓度</div>
          <Slider
            value={themeStore.opacity * 100}
            style={{width: '100%'}}
            onChange={onChangeOfOpacity}
          />
        </div>
        <div className='slider'>
          <div className='title'>模糊度</div>
          <Slider
            value={themeStore.filter}
            style={{width: '100%'}}
            onChange={onChangeOfFilter}
            max={40}
          />
        </div>
      </div>
    </div>
  );
};

const presetColors = [
  '#1681ff',
  '#fbbe23',
  '#fc4548',
  '#2ecc71',
  '#33c5c5',
  '#9b59b6',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
];

export default inject('themeStore')(observer(Theme));
