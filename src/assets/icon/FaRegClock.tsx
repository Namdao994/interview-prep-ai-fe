import type React from 'react';
import {FaRegClock as FaRegClockIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaRegClock: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaRegClockIcon} {...props} />
);

export default FaRegClock;
