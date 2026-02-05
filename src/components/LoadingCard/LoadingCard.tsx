import FaChevronRight from '@/assets/icon/FaChevronRight';
import {Card, Flex, Skeleton, theme} from 'antd';
import SkeletonNode from '../SkeletonNode/SkeletonNode';

const LoadingCard = () => {
  const {
    token: {
      fontSizeLG,
      fontSize,
      paddingSM,
      colorPrimaryBg,
      colorBgBlur,
      colorBgContainer,
      fontSizeXL,
      marginSM,
      marginXS,
      borderRadius,
      colorTextDisabled,
    },
  } = theme.useToken();
  return (
    <Card
      styles={{
        header: {
          paddingTop: paddingSM,
          paddingBottom: paddingSM,
          background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
        },
      }}
      title={
        <Flex gap='small'>
          <Skeleton.Avatar
            active
            size={48}
            shape='square'
            style={{
              borderRadius: borderRadius,
            }}
          />
          <Flex
            vertical
            style={{
              width: '100%',
            }}
            gap='small'
          >
            <SkeletonNode
              active
              styles={{
                root: {
                  width: '60%',
                  height: fontSizeLG,
                },
              }}
            />
            <SkeletonNode
              active
              styles={{
                root: {
                  marginTop: 2,
                  width: '60%',
                  height: fontSize,
                },
              }}
            />
          </Flex>
        </Flex>
      }
      extra={<FaChevronRight style={{color: colorTextDisabled}} />}
    >
      <Flex
        gap='small'
        wrap
        style={{
          width: '100%',
        }}
      >
        <SkeletonNode
          active
          styles={{
            root: {width: '25%', height: fontSizeXL},
          }}
        />
        <SkeletonNode
          active
          styles={{
            root: {width: '15%', height: fontSizeXL},
          }}
        />
        <SkeletonNode
          active
          styles={{
            root: {width: '30%', height: fontSizeXL},
          }}
        />
      </Flex>
      <SkeletonNode
        active
        styles={{
          root: {width: '100%', height: fontSizeXL, marginTop: marginSM},
        }}
      />
      <SkeletonNode
        active
        styles={{
          root: {width: '100%', height: fontSizeXL, marginTop: marginXS},
        }}
      />
      <SkeletonNode
        style={{
          marginTop: marginSM,
        }}
        active
        styles={{
          root: {width: '25%', height: fontSizeXL},
        }}
      />
    </Card>
  );
};

export default LoadingCard;
