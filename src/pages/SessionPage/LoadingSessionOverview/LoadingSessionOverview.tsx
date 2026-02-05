import SkeletonNode from '@/components/SkeletonNode/SkeletonNode';
import {Flex, Skeleton, theme} from 'antd';

const LoadingSessionOverview = () => {
  const {
    token: {fontSizeHeading3, fontSizeSM, fontSizeXL, marginMD, marginXXS, marginXS},
  } = theme.useToken();
  return (
    <Flex justify='space-between' wrap gap='middle'>
      <Flex vertical>
        <SkeletonNode
          styles={{
            root: {
              width: '100%',
              height: fontSizeHeading3,
            },
          }}
          active
        />
        <SkeletonNode
          styles={{
            root: {
              marginTop: marginXXS,
              width: '25%',
              height: fontSizeSM,
            },
          }}
          active
        />
        <Flex
          gap='middle'
          style={{
            marginTop: marginMD,
          }}
        >
          {Array.from({length: 3}).map((_, index) => (
            <SkeletonNode
              key={index}
              styles={{
                root: {
                  width: 102,
                  height: fontSizeXL,
                },
              }}
              active
            />
          ))}
        </Flex>
        <SkeletonNode
          styles={{
            root: {
              marginTop: marginXS,
              width: '100%',
              height: fontSizeSM,
            },
          }}
          active
        />
      </Flex>
      <Flex gap='small'>
        <Skeleton.Button active />
        <Skeleton.Button active />
      </Flex>
    </Flex>
  );
};

export default LoadingSessionOverview;
