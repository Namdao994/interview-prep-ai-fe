import type React from 'react';
import {LuSparkles as LuSparklesIcon} from 'react-icons/lu';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const LuSparkles: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={LuSparklesIcon} {...props} />
);

export default LuSparkles;
