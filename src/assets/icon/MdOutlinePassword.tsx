import type React from 'react';
import {MdOutlinePassword as MdOutlinePasswordIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlinePassword: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlinePasswordIcon} {...props} />
);

export default MdOutlinePassword;
