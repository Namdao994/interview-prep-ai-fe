import type React from 'react';
import {FiUpload as FiUploadIcon} from 'react-icons/fi';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FiUpload: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FiUploadIcon} {...props} />;

export default FiUpload;
