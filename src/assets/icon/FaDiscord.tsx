import type React from 'react';
import {FaDiscord as FaDiscordIcon} from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const FaDiscord: React.FC<Partial<CustomIconComponentProps>> = (props) => <Icon component={FaDiscordIcon} {...props} />;

export default FaDiscord;
