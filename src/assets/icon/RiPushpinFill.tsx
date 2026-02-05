import type React from 'react';
import {RiPushpinFill as RiPushpinFillIcon} from 'react-icons/ri';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const RiPushpinFill: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={RiPushpinFillIcon} {...props} />
);

export default RiPushpinFill;
