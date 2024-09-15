import {ArrowRightOutlined} from '@ant-design/icons';
import {inject, observer} from 'mobx-react';
import {useRef} from 'react';
import FeedbackModal from './FeedbackModal';

function About(props: any) {
  const {themeStore} = props;

  const feedbackModalRef = useRef<HTMLDivElement>(null);

  return (
    <div className='about-container'>
      <div
        onClick={() => (feedbackModalRef.current as any).open()}
        className='white-block pointer item'
        style={{color: themeStore.primaryColor}}
      >
        产品反馈
        <ArrowRightOutlined />
      </div>

      <FeedbackModal ref={feedbackModalRef} />
    </div>
  );
}

export default inject('themeStore')(observer(About));
