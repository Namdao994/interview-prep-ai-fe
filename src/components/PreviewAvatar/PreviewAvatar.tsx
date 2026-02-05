import FiTrash from '@/assets/icon/FiTrash';
import {Image, theme, type ImageProps} from 'antd';
import './PreviewAvatar.css';
import type React from 'react';
const AvatarImageStyles: ImageProps['styles'] = (info) => {
  if (info.props.preview) {
    return {
      root: {
        borderRadius: '50%',
        overflow: 'hidden',
        border: 'dashed 1px #ccc',
      },
      image: {
        objectFit: 'cover',
      },
      popup: {
        body: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    } satisfies ImageProps['styles'];
  }
  return {};
};

type PreviewAvatarProps = {
  previewAvatarUrl: string;
  onDeletePreviewAvatar: () => void;
  isLoadingForm?: boolean;
};
const PreviewAvatar: React.FC<PreviewAvatarProps> = ({previewAvatarUrl, onDeletePreviewAvatar, isLoadingForm}) => {
  const {
    token: {colorError},
  } = theme.useToken();
  return (
    <div className='preview-avatar'>
      <Image
        src={previewAvatarUrl}
        height={102}
        width={102}
        styles={AvatarImageStyles}
        alt='avatar'
        style={{
          borderRadius: '50%',
        }}
        preview={!isLoadingForm}
      />
      <button
        type='button'
        className='preview-avatar__delete-btn'
        onClick={onDeletePreviewAvatar}
        disabled={isLoadingForm}
      >
        <FiTrash
          style={{
            color: colorError,
          }}
        />
      </button>
    </div>
  );
};

export default PreviewAvatar;
