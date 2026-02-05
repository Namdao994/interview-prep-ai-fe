import type React from 'react';
import {MdOutlineAttachEmail as MdOutlineAttachEmailIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlineAttachEmail: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlineAttachEmailIcon} {...props} />
);

export default MdOutlineAttachEmail;
