import type React from 'react';
import {RiGoogleFill as RiGoogleFillIcon} from 'react-icons/ri';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const RiGoogleFill: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={RiGoogleFillIcon} {...props} />
);

export default RiGoogleFill;
