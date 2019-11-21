import React, { useState } from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import Axios from 'axios';
export default (props: { target: string }) => {
  const { target } = props;
  console.log(props);
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time'
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
  return <Table columns={columns} />;
};
