import type React from 'react';
import {AiOutlineSun as AiOutlineSunIcon} from 'react-icons/ai';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const AiOutlineSun: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={AiOutlineSunIcon} {...props} />
);

export default AiOutlineSun;
