import type React from 'react';
import {FaStopCircle as FaStopCircleIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaStopCircle: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={FaStopCircleIcon} {...props} />
);

export default FaStopCircle;
