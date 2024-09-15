import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCode } from '../../apis/common';
import { postLogin } from '../../apis/user';
import store from '../../store';
import { storageUserInfo } from '../../utils/localStorage';
import { emailRules, mailValidator } from '../../utils/validate';
import './index.scss';

function LoginModule() {
  const [codeBtnText, setCodeBtnText] = useState<string | number>('发送验证码');
  const [email, setEmail] = useState<string>();
  const { themeStore } = store;

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  async function handleGetCode() {
    if (!email) {
      return messageApi.warning('请先填写邮箱地址');
    }

    try {
      // 修复登录Login发送验证码的BUG
      await mailValidator('', email);
      await getCode(email);
      // 处理验证码倒计时
      customeInterval(60, setCodeBtnText);
    } catch (error) { }
  }

  const handleLogin = async (value: any) => {
    const { email, code } = value;

    try {
      const { data } = await postLogin(email, code);
      storageUserInfo(data);
      navigate('/');
    } catch (error) { }
  };
  return (
    <div className='login-container'>
      {contextHolder}
      <div className='left'></div>
      <div className='login'>
        <Form onFinish={handleLogin} autoComplete='off'>
          <Form.Item name='email' rules={emailRules}>
            <Input
              placeholder='输入邮箱账号'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name='code'
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input.Search
              placeholder='输入验证码'
              enterButton={codeBtnText}
              size='large'
              onSearch={handleGetCode}
              loading={codeBtnText !== '发送验证码'}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ boxShadow: `${themeStore.primaryColor} 0px 7px 29px 0px` }}
              type='primary'
              className='submit-btn'
              htmlType='submit'
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginModule;

// 自定义发送验证码定时器
function customeInterval(time: number, setCodeBtnText: any) {
  setCodeBtnText(time);
  const timer = setInterval(() => {
    if (time <= 0) {
      setCodeBtnText('发送验证码');
      clearInterval(timer);
      return;
    }

    setCodeBtnText(--time);
  }, 1000);
}
