import { inject, observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import Transmit from './Transmit';

function Chat() {
  const [userId, setUserId] = useState<string>('');
  const delimiterRef = useRef(null);
  const chatRef = useRef(null);

  const navigate = useNavigate();

  const goToScrollBottom = () => {
    (delimiterRef.current as any)?.scrollIntoView();
  }

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      // 获取不到用户id，则需要重新登录
      navigate('/login');
    } else {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {

    // 聊天位置最底部
    goToScrollBottom();

    // 切记要注销时间 todo
    (chatRef.current as any).addEventListener('scroll', (e: any) => {
      if (e.target.scrollTop <= 0) {
        // 获取更多的聊天数据
        // props.getMore()
      }
    })
  }, [])

  return (
    <div className='chat-container' ref={chatRef}>
      <MessageList userId={userId} />
      <div ref={delimiterRef} id='delimiter'></div>
      <Transmit goToScrollBottom={goToScrollBottom} />
    </div>
  );
}

const MessageList = inject('messageStore')(observer(List))

function List(props: any) {
  const { userId } = props;

  return (
    <>
      {props.messageStore.messageList?.map((item: any, index: number) => {
        if (!item) return null;
        return (
          <Message item={item} direction={item.userId === userId} key={index} />
        );
      })}
    </>
  );
}

export default inject('messageStore')(observer(Chat));
