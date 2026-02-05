import FaPlus from '@/assets/icon/FaPlus';
import {Upload} from 'antd';

const UploadButton = () => {
  return (
    <Upload listType='picture-circle' accept='image/*'>
      <button style={{border: 0, background: 'none', cursor: 'pointer'}} type='button'>
        <FaPlus />
        <div style={{marginTop: 8}}>Upload</div>
      </button>
    </Upload>
  );
};

export default UploadButton;
