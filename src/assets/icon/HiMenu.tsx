import type React from 'react';
import {HiMenu as HiMenuIcon} from 'react-icons/hi';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const HiMenu: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={HiMenuIcon} {...props} />;

export default HiMenu;
