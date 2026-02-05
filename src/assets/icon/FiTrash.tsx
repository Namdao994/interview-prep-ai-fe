import type React from 'react';
import {FiTrash as FiTrashIcon} from 'react-icons/fi';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FiTrash: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FiTrashIcon} {...props} />;

export default FiTrash;
