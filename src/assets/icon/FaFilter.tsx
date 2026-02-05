import type React from 'react';
import {FaFilter as FaFilterIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaFilter: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaFilterIcon} {...props} />;

export default FaFilter;
