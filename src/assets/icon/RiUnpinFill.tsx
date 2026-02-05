import type React from 'react';
import {RiUnpinFill as RiUnpinFillIcon} from 'react-icons/ri';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const RiUnpinFill: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={RiUnpinFillIcon} {...props} />
);

export default RiUnpinFill;
