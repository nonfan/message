import {Form, Input, Modal} from 'antd';
import {inject, observer} from 'mobx-react';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {getUserInfo, putUserInfo} from '../../../apis/user';
import {emailRules} from '../../../utils/validate';

const InfoModal = forwardRef<HTMLDivElement>((props: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState<string>('');

  useImperativeHandle(ref, () => ({
    open: (user: any) => {
      setIsModalOpen(true);

      form.setFieldsValue({
        username: props.userStore.username,
        email: props.userStore.email,
      });
      setId(user.id);
    },
  }));

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        return putUserInfo(id, values);
      })
      .then(() => {
        return getUserInfo(id);
      })
      .then(({data}) => {
        const {username, email} = data.user;
        localStorage.setItem('user', JSON.stringify(data.user));
        props.userStore.modifyUser(username, email);
        handleCancel();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.setFieldsValue({
      username: '',
      email: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div ref={ref}>
      <Modal
        title='修改信息'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} autoComplete='off'>
          <Form.Item
            label='昵称'
            name='username'
            rules={[{required: true, message: '请输入用户名'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='邮箱' name='email' rules={emailRules}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default inject('userStore')(observer(InfoModal));
