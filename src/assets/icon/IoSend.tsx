import type React from 'react';
import {IoSend as IoSendIcon} from 'react-icons/io5';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const IoSend: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={IoSendIcon} {...props} />;

export default IoSend;
