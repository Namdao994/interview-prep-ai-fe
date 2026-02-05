import {Skeleton} from 'antd';
import type {SkeletonNodeProps as SkeletonNodePropsAnt} from 'antd/es/skeleton/Node';
import type React from 'react';

type SkeletonNodeProps = {
  style?: React.CSSProperties;
} & SkeletonNodePropsAnt;
const SkeletonNode: React.FC<SkeletonNodeProps> = ({style, ...props}) => (
  <Skeleton.Node {...props} style={{height: '100%', width: '100%', ...style}} />
);

export default SkeletonNode;
