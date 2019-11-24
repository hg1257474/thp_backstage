import React from 'react';
import { Upload, Button, Icon } from 'antd';
export default ({ value, onChange }: { value?: any; onChange?: (x: any) => void }) => {
  return (
    <Upload accept=".jpg,.png,.gif,.jpeg,.bmp,.webp" action="/image">
      <Button>
        <Icon type="upload" /> 上传
      </Button>
    </Upload>
  );
};
