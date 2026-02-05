import type React from 'react';
import {GoDotFill as GoDotFillIcon} from 'react-icons/go';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const GoDotFill: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={GoDotFillIcon} {...props} />;

export default GoDotFill;
