import React, { useState } from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import Axios from 'axios';
export default (props: { target: string; haveTime: boolean }) => {
  const { target, haveTime } = props;
  const { data, setData } = useState([]);
  console.log(props);
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },

    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render(id: string) {
        return (
          <>
            <a href={`${target}/${id}`}>编辑</a>
            <Divider />
            <Popconfirm
              title="您确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                console.log(props);
              }}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        );
      }
    }
  ];
  if (haveTime)
    columns.push({
      title: '时间',
      dataIndex: 'time',
      key: 'time'
    });
  return <Table columns={columns} dataSource={data} />;
};
