import type React from 'react';
import {MdOutlineLogout as MdOutlineLogoutIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlineLogout: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlineLogoutIcon} {...props} />
);

export default MdOutlineLogout;
