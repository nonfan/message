import { Col, Input, Row, message } from 'antd';
import { useState } from 'react';
import { sendMessageForMainChat } from '../../utils/socket';

function Transmit(props: any) {
  const [value, setValue] = useState('');
  const [messageApi, hoderContext] = message.useMessage();

  function handleSend(value: string) {
    const { username, avatar, id: userId } = JSON.parse(localStorage.getItem('user') || '');

    if (!value) {
      return messageApi.warning('请输入发送内容');
    }

    sendMessageForMainChat({
      userId,
      avatar,
      message: value,
      username,
    });

    setValue('');
    props.goToScrollBottom()
  }
  function handlePressEnter(e: any) {
    handleSend(e.target.value);
  }

  return (
    <>
      {hoderContext}
      <Row className='container-send'>
        <Col className='gutter-row' span={16} offset={4}>
          <Input.Search
            placeholder='聊点啥……'
            allowClear
            enterButton='Enter'
            size='large'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSearch={handleSend}
            onPressEnter={handlePressEnter}
          />
        </Col>
      </Row>
    </>
  );
}

export default Transmit;
