import type React from 'react';
import {AiOutlineUser as AiOutlineUserIcon} from 'react-icons/ai';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const AiOutlineUser: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={AiOutlineUserIcon} {...props} />
);

export default AiOutlineUser;
