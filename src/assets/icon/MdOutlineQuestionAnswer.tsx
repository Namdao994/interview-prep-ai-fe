import type React from 'react';
import {MdOutlineQuestionAnswer as MdOutlineQuestionAnswerIcon} from 'react-icons/md';
import Icon from '@ant-design/icons';
import type {GetProps} from 'antd';
type CustomIconComponentProps = GetProps<typeof Icon>;

const MdOutlineQuestionAnswer: React.FC<Partial<CustomIconComponentProps>> = (props) => (
  <Icon component={MdOutlineQuestionAnswerIcon} {...props} />
);

export default MdOutlineQuestionAnswer;
