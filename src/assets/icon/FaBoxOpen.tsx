import type React from 'react';
import {FaBoxOpen as FaBoxOpenIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaBoxOpen: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaBoxOpenIcon} {...props} />;

export default FaBoxOpen;
