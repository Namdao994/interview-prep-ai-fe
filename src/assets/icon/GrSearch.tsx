import type React from 'react';
import {GrSearch as GrSearchIcon} from 'react-icons/gr';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const GrSearch: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={GrSearchIcon} {...props} />;

export default GrSearch;
