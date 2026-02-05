import type React from 'react';
import {MdOutlineEmail as MdOutlineEmailIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlineEmail: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlineEmailIcon} {...props} />
);

export default MdOutlineEmail;
