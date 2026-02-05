import type React from 'react';
import {FaGithub as FaGithubIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaGithub: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaGithubIcon} {...props} />;

export default FaGithub;
