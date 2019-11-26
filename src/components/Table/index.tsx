import React, { useState, useEffect } from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';
import Axios from 'axios';
import { match, Router, Link } from 'react-router-dom';
import * as Moment from 'moment';
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
let current = 1;
export default (props: { match: Match }) => {
  // const { target, haveTime } = props;
  const [data, setData] = useState<DataType>({ size: 0, content: [] });
  const { target } = props.match.params;
  const haveTime = ['product_specification', 'product_center'].indexOf(target) === -1;
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
      render(id: string, record: never, index: number) {
        return (
          <>
            <Link to={`/${target}/${id}?sequence=${(current - 1) * 10 + index + 1}`}>编辑</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="您确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                console.log('ojbk');
                Axios.delete(`${props.match.params.target}/${id}`, {
                  params: { is_from_api: true }
                }).then(res => {
                  if (res.data !== 'success') return;
                  Axios.get(props.match.params.target, {
                    params: { is_from_api: true, current }
                  }).then(res => setData(res.data));
                });
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
    columns.splice(1, 0, {
      title: '时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render(date) {
        return <span>{Moment(date).format('YYYY年M月D日')}</span>;
      }
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
          Axios.get(props.match.params.target, {
            params: { is_from_api: true, current: page }
          }).then(res => setData(res.data));
        }
      }}
    />
  );
};
