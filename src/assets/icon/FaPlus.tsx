import type React from 'react';
import {FaPlus as FaPlusIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaPlus: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaPlusIcon} {...props} />;

export default FaPlus;
