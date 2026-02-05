import type React from 'react';
import {FaListUl as FaListUIIcon} from 'react-icons/fa';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaListUl: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaListUIIcon} {...props} />;

export default FaListUl;
