import {Card, theme, Typography} from 'antd';
const {Title, Paragraph} = Typography;
import './FeatureCard.css';
import type React from 'react';
type AppFeature = {
  id: string;
  title: string;
  description: string;
};
type FeatureCardProps = {
  feature: AppFeature;
};
const FeatureCard = ({feature}: FeatureCardProps) => {
  const {
    token: {colorPrimaryBorder, fontSizeLG, colorPrimaryHover},
  } = theme.useToken();
  return (
    <Card
      hoverable
      style={
        {
          borderColor: colorPrimaryBorder,
          '--shadow-color-card-hover': colorPrimaryHover,
        } as React.CSSProperties
      }
      className='feature-card'
    >
      <Title
        level={4}
        style={{
          textAlign: 'start',
        }}
      >
        {feature.title}
      </Title>
      <Paragraph
        style={{
          fontSize: fontSizeLG,
          fontWeight: 'normal',
          textAlign: 'start',
          margin: 0,
        }}
      >
        {feature.description}
      </Paragraph>
    </Card>
  );
};

export default FeatureCard;
