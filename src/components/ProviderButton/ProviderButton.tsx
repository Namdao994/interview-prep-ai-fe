import React from 'react';
import {Button} from 'antd';
import type {ButtonProps} from 'antd';
import {FaDiscord} from 'react-icons/fa';
import './ProviderButton.css';
import FaGithub from '@/assets/icon/FaGithub';
import FcGoogle from '@/assets/icon/FcGoogle';
import RiGoogleFill from '@/assets/icon/RiGoogleFill';
type ProviderButtonProps = ButtonProps & {
  provider: 'google' | 'discord' | 'github';
};

const ProviderButton: React.FC<ProviderButtonProps> = ({
  style,
  className,
  children,
  provider,
  disabled = false,
  ...buttonProps
}) => {
  // default colors (brand)
  let backgroundColor = '';
  let borderColor = '';
  let textColor = '';

  let backgroundHover = '';
  let borderHover = '';
  let textHover = '';

  let backgroundActive = '';
  let borderActive = '';
  let textActive = '';

  // default icon per provider (can be overridden by icon prop)
  let defaultIcon: React.ReactNode = null;
  switch (provider) {
    case 'discord':
      backgroundColor = '#5865F2';
      borderColor = '#5865F2';
      textColor = '#FFFFFF';

      backgroundHover = '#4752c4';
      borderHover = '#4752c4';
      textHover = '#FFFFFF';

      backgroundActive = '#3d47a8';
      borderActive = '#3d47a8';
      textActive = '#FFFFFF';

      defaultIcon = <FaDiscord style={{fontSize: 24}} />;
      break;

    case 'github':
      backgroundColor = '#24292e'; // GitHub black
      borderColor = '#24292e';
      textColor = '#FFFFFF';

      backgroundHover = '#1b1f23';
      borderHover = '#1b1f23';
      textHover = '#FFFFFF';

      backgroundActive = '#0f1112';
      borderActive = '#0f1112';
      textActive = '#FFFFFF';

      defaultIcon = <FaGithub style={{fontSize: 24}} />;
      break;

    case 'google':
      // Google buttons often use white background with colored icon and subtle border.
      backgroundColor = '#FFFFFF';
      borderColor = '#dadce0';
      textColor = '#000000';

      backgroundHover = '#f7f7f7';
      borderHover = '#cfcfd3';
      textHover = '#000000';

      backgroundActive = '#efefef';
      borderActive = '#c1c1c4';
      textActive = '#000000';

      // use colored Google icon
      defaultIcon = disabled ? <RiGoogleFill style={{fontSize: 24}} /> : <FcGoogle style={{fontSize: 24}} />;
      break;

    default:
      // fallback
      backgroundColor = '#1890ff';
      borderColor = '#1890ff';
      textColor = '#fff';
      backgroundHover = '#40a9ff';
      borderHover = '#40a9ff';
      backgroundActive = '#096dd9';
      borderActive = '#096dd9';
      defaultIcon = null;
  }
  const providerBtnStyle = {
    // base
    '--background-color-provider-btn': backgroundColor,
    '--border-color-provider-btn': borderColor,
    '--color-text-provider-btn': textColor,
    // hover
    '--background-color-hover-provider-btn': backgroundHover,
    '--border-color-hover-provider-btn': borderHover,
    '--color-text-hover-provider-btn': textHover,
    // active
    '--background-color-active-provider-btn': backgroundActive,
    '--border-color-active-provider-btn': borderActive,
    '--color-text-active-provider-btn': textActive,
  } as React.CSSProperties;
  return (
    <Button
      icon={defaultIcon}
      className={`${!disabled && 'btn-provider'} ${className ?? ''}`}
      style={{...providerBtnStyle, ...style}}
      {...buttonProps}
      disabled={disabled}
    >
      {children ??
        (provider === 'google'
          ? 'Continue with Google'
          : provider === 'github'
          ? 'Continue with GitHub'
          : provider === 'discord'
          ? 'Continue with Discord'
          : 'Continue')}
    </Button>
  );
};

export default ProviderButton;
