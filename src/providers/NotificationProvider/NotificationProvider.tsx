import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {hideNotification} from '@/store/slices/notificationSlice';
import {message} from 'antd';
import {useEffect} from 'react';

const NotificationProvider = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const {content, type} = useAppSelector((state) => state.notification);
  useEffect(() => {
    if (type) {
      messageApi[type](content);
      dispatch(hideNotification());
    }
  }, [messageApi, type, content, dispatch]);
  return contextHolder;
};

export default NotificationProvider;
