import type React from 'react';
// import {MdOutlinePassword as MdOutlinePasswordIcon} from 'react-icons/md';
import {MdOutlineLogin as MdOutlineLoginIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlineLogin: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlineLoginIcon} {...props} />
);

export default MdOutlineLogin;
