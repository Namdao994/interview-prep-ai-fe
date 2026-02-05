import type React from 'react';
import {FaSquare as FaSquareIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaSquare: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaSquareIcon} {...props} />;

export default FaSquare;
