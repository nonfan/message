import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import InfoBoxArrow from '../../svg/InfoBoxArrow';

interface IProps {
  direction: boolean;
  item: any;
  themeStore?: any;
}

function Message(props: IProps) {
  const { direction } = props;
  const { avatar } = props.item;

  return (
    <div className='message-container'>
      <Space
        wrap
        className='container-space'
        style={{ flexDirection: direction ? 'row-reverse' : 'initial' }}
      >
        {avatar ? (
          <img src={avatar} className='avatar-image' />
        ) : (
          <Avatar shape='square' size='large' icon={<UserOutlined />} />
        )}
        <ContextContent {...props} />
      </Space>
    </div>
  );
}

const ContextContent = inject('themeStore')(observer(Content));

function Content(props: IProps) {
  const { direction, themeStore } = props;
  const { message, username } = props.item;

  return (
    <>
      <div
        className='title'
        style={{
          textAlign: direction ? 'right' : 'left',
        }}
      >
        {username}
      </div>
      <div
        style={{ backgroundColor: direction ? themeStore.primaryColor : '#fff' }}
        className={['content', direction ? 'text-bg' : null].join(' ')}
      >
        {message}
        <InfoBoxArrow direction={direction} />
      </div>
    </>
  );
}

export default Message;
