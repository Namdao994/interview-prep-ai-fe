import type React from 'react';
import {FcGoogle as FcGoogleIcon} from 'react-icons/fc';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FcGoogle: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FcGoogleIcon} {...props} />;

export default FcGoogle;
