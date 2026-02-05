import type React from 'react';
import {FaChevronRight as FaChevronRightIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaChevronRight: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaChevronRightIcon} {...props} />
);

export default FaChevronRight;
