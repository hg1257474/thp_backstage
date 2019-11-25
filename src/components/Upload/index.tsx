import React, { useState } from 'react';
import { Upload, Button, Icon } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
export default ({ value, onChange }: { value?: string; onChange?: (x: string) => void }) => {
  return (
    <Upload
      accept=".jpg,.png,.gif,.jpeg,.bmp,.webp"
      action="image"
      defaultFileList={
        value
          ? [
              {
                size: 1,
                name: value,
                uid: value,
                type: value.match(/^.+\.(.+)$/)[1],
                url: `/image/${value}`
              }
            ]
          : []
      }
      listType="picture"
      onChange={({ fileList }) => onChange(fileList[0].response)}
    >
      {!!!value && (
        <Button>
          <Icon type="upload" /> 上传
        </Button>
      )}
    </Upload>
  );
};
