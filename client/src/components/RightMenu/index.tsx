import {useEffect, useState} from 'react';
import './index.scss';

interface Props {
  clientXY: any[];
  isShow: boolean;
  menu: any[];
}

function RightMenu(props: Props) {
  const [left, top] = props.clientXY as any;
  const [style, setStyle] = useState<any>();

  useEffect(() => {
    let newLeft = left;
    let newTop = top;

    if (document.body.clientWidth - left <= 160) {
      newLeft = document.body.clientWidth - 160;
    }

    const menuHight = props.menu.length * 30 + 20;
    if (document.body.clientHeight - top <= menuHight) {
      newTop = document.body.clientHeight - menuHight;
    }

    setStyle({
      left: newLeft,
      top: newTop,
    });
  }, [left, top]);
  const renderContentMenu = () => (
    <div className='right-menu-container menu-list' style={style}>
      {props.menu.map((item) => {
        return (
          <div
            className='menu'
            onClick={() => {
              item.clickFunction();
            }}
            key={item.name}
          >
            <span>{item.name}</span>
            <span>{item.icon}</span>
          </div>
        );
      })}
    </div>
  );
  return props.isShow ? renderContentMenu() : null;
}

export default RightMenu;
