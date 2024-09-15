import {Form, Input, Modal} from 'antd';
import useMessage from 'antd/es/message/useMessage';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {feedback} from '../../../apis/common';
import {getUserId} from '../../../utils/localStorage';

const FeedbackModal = forwardRef<HTMLDivElement>((props: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const [messageApi, holderContext] = useMessage();

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
    },
  }));

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        return feedback(userId, values.description);
      })
      .then((res) => {
        messageApi.success(res.data.message);
        handleCancel();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.setFieldsValue({
      description: '',
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  return (
    <div ref={ref}>
      {holderContext}
      <Modal
        title='反馈'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical' form={form} autoComplete='off'>
          <Form.Item
            name='description'
            label='描述'
            rules={[{required: true, message: '不可为空'}]}
          >
            <Input.TextArea
              placeholder='反馈点啥呢，宝'
              autoSize={{minRows: 5, maxRows: 10}}
              maxLength={100}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default FeedbackModal;
