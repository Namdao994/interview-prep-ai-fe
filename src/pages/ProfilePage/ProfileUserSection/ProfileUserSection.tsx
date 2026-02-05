import FaPlus from '@/assets/icon/FaPlus';
import PreviewAvatar from '@/components/PreviewAvatar/PreviewAvatar';
import {useChangeAvatarMutation, useDeleteAvatarMutation} from '@/store/apis/userApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {changeProfileImageUrl, deleteProfileImageUrl} from '@/store/slices/authSlice';
import {Flex, Image, Modal, theme, Typography, Upload} from 'antd';
import {useState} from 'react';
const {Paragraph} = Typography;
const ProfileUserSection = () => {
  const [isConfirmDeleteAvatarModalOpen, setIsConfirmDeleteAvatarModalOpen] = useState(false);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>();
  const [isPreviewAvatarModalOpen, setIsPreviewAvatarModalOpen] = useState(false);
  const [changeAvatar, {isLoading: isChangeAvatarLoading}] = useChangeAvatarMutation();
  const [deleteAvatar, {isLoading: isDeleteAvatarLoading}] = useDeleteAvatarMutation();
  const dispatch = useAppDispatch();
  const {
    token: {fontSizeHeading4, marginSM},
  } = theme.useToken();
  const handleDeleteAvatar = async () => {
    await deleteAvatar();
    dispatch(deleteProfileImageUrl());
    setIsConfirmDeleteAvatarModalOpen(false);
  };

  const handleChangeAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append('profileImageFile', avatarFile);
    const res = await changeAvatar(formData).unwrap();
    dispatch(changeProfileImageUrl(res.profileImageUrl || ''));
    setIsPreviewAvatarModalOpen(false);
    setAvatarFile(null);
    setPreviewAvatarUrl(null);
  };
  const beforeUploadAvatar = (file: File) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setIsPreviewAvatarModalOpen(true);
    return false;
  };
  const {user} = useAppSelector((state) => state.auth);
  return (
    <div
      style={{
        display: 'flex',
        height: 102,
        marginBottom: marginSM,
        alignItems: 'center',
        gap: marginSM,
      }}
    >
      {user?.profileImageUrl ? (
        <PreviewAvatar
          previewAvatarUrl={user?.profileImageUrl}
          onDeletePreviewAvatar={() => setIsConfirmDeleteAvatarModalOpen(true)}
        />
      ) : (
        <Upload
          listType='picture-circle'
          accept='image/*'
          showUploadList={false}
          maxCount={1}
          beforeUpload={beforeUploadAvatar}
        >
          <button type='button' style={{border: 0, background: 'none', cursor: 'pointer'}}>
            <FaPlus />
            <div style={{marginTop: 8}}>Upload</div>
          </button>
        </Upload>
      )}
      <Flex vertical gap='small'>
        <Paragraph
          style={{
            fontSize: fontSizeHeading4,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {user?.name}
        </Paragraph>
        <Paragraph
          style={{
            margin: 0,
          }}
        >
          {user?.email}
        </Paragraph>
      </Flex>
      <Modal
        title='Delete avatar'
        open={isConfirmDeleteAvatarModalOpen}
        confirmLoading={isDeleteAvatarLoading}
        onOk={handleDeleteAvatar}
        onCancel={() => setIsConfirmDeleteAvatarModalOpen(false)}
        okText='Delete'
        okButtonProps={{
          type: 'primary',
          danger: true,
        }}
      >
        <p>Are you sure you want to delete this avatar?</p>
      </Modal>
      <Modal
        title='Preview Avatar'
        open={isPreviewAvatarModalOpen}
        confirmLoading={isChangeAvatarLoading}
        onOk={handleChangeAvatar}
        onCancel={() => {
          setIsPreviewAvatarModalOpen(false);
          setAvatarFile(null);
          setPreviewAvatarUrl(null);
        }}
        okText='Save'
        okButtonProps={{
          type: 'primary',
        }}
      >
        {previewAvatarUrl && <Image src={previewAvatarUrl} alt='avatar preview' preview={false} />}
      </Modal>
    </div>
  );
};

export default ProfileUserSection;
