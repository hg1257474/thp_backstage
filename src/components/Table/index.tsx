import React, { useState, useEffect } from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import Axios from 'axios';
import { match, Router, Link } from 'react-router-dom';
import './index.css';
type Target =
  | 'product_center'
  | 'news_center'
  | 'product_specification'
  | 'honorary_qualification'
  | 'general_knowledge_encyclopedia';
interface DataType {
  size: number;
  content: any[];
}
interface Match extends match {
  params: { target: Target };
}
export default (props: { match: Match }) => {
  // const { target, haveTime } = props;
  const [data, setData] = useState<DataType>({ size: 0, content: [] });
  const { target } = props.match.params;
  const haveTime = ['product_specification', 'product_center'].indexOf(target) === -1;
  let current = 1;
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
            <Link to={`/${target}/${id}`}>编辑</Link>
            <Divider type="vertical" />
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
  useEffect(() => {
    Axios.get(props.match.params.target, {
      params: { is_from_api: true, current }
    }).then(res => setData(res.data));
    setData(data);
  }, [props.match.params.target]);
  return (
    <Table
      rowKey="id"
      className="table-center"
      columns={columns}
      dataSource={data.content}
      footer={() => (
        <Button block>
          <Link to={`/${target}/new_item`}>添加</Link>
        </Button>
      )}
      pagination={{
        total: data.size,
        onChange(page) {
          current = page;
        }
      }}
    />
  );
};
