import type React from 'react';
import {FaBoxArchive as FaBoxArchiveIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaBoxArchive: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaBoxArchiveIcon} {...props} />
);

export default FaBoxArchive;
