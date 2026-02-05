import type React from 'react';
import {FaEllipsis as FaEllipsisIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaEllipsis: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaEllipsisIcon} {...props} />
);

export default FaEllipsis;
