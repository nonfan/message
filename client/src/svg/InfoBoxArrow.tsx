import {inject, observer} from 'mobx-react';

interface IProps {
  direction: boolean;
  themeStore?: any;
}

function InfoBoxArrow(props: IProps) {
  const {direction, themeStore} = props;
  return (
    <svg
      className={direction ? 'svg-right' : 'svg'}
      width='10'
      height='10'
      viewBox='-50 -50 300 300'
    >
      <polygon
        className={direction ? 'triangle-right' : 'triangle'}
        strokeLinejoin='round'
        fill={direction ? themeStore.primaryColor : '#fff'}
        stroke={direction ? themeStore.primaryColor : '#fff'}
        points='100,0 0,200 200,200'
      />
    </svg>
  );
}

export default inject('themeStore')(observer(InfoBoxArrow));
