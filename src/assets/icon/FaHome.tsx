import type React from 'react';
import {FaHome as FaHomeIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaHome: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaHomeIcon} {...props} />;

export default FaHome;
