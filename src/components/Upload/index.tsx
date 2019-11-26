import React, { useState, useEffect } from 'react';
import { Upload, Button, Icon } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
export default ({ value, onChange }: { value?: string; onChange?: (x: string) => void }) => {
  console.log(value);
  console.log('Ffffffffffffffff');
  const [fileList, setFileList] = useState(
    value
      ? ([
          {
            size: 12,
            name: value,
            uid: value,
            type: 'png', //value.match(/^.+\.(.+)$/)[1],
            url: `/image/${value}`,
            thumbUrl: `/image/${value}`
          }
        ] as Array<UploadFile<any>>)
      : ([] as Array<UploadFile<any>>)
  );
  return (
    <Upload
      accept=".jpg,.png,.gif,.jpeg,.bmp,.webp"
      action="image"
      fileList={fileList}
      listType="picture"
      onChange={({ fileList }) => {
        setFileList([fileList[fileList.length - 1]]);
        onChange(fileList[fileList.length - 1].response);
      }}
    >
      <Button>
        <Icon type="upload" /> {!!!value ? '上传' : '修改'}
      </Button>
    </Upload>
  );
};
