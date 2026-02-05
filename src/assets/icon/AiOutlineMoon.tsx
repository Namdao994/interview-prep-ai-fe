import type React from 'react';
import {AiOutlineMoon as AiOutlineMoonIcon} from 'react-icons/ai';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const AiOutlineMoon: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={AiOutlineMoonIcon} {...props} />
);

export default AiOutlineMoon;
