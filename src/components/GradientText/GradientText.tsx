import type React from 'react';
import './GradientText.css';

interface GradientTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  styleText?: React.CSSProperties;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  style,
  styleText,
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 20,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className='animated-gradient-text' style={style}>
      {showBorder && <div className='gradient-overlay' style={gradientStyle}></div>}
      <span className='text-content' style={{...gradientStyle, ...styleText}}>
        {children}
      </span>
    </div>
  );
}
