import type React from 'react';
import {FaCalendarAlt as FaCalendarAltIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaCalendarAlt: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaCalendarAltIcon} {...props} />
);

export default FaCalendarAlt;
