import ReactQuill from 'react-quill';
import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
import { Form, Icon, Input, Button, Checkbox, InputNumber, DatePicker, Modal } from 'antd';
import Upload from '../Upload';
import Axios from 'axios';
import * as Moment from 'moment';
import './index.css';
import { withRouter } from 'react-router';
interface Data {
  image_uri?: string;
  name: string;
  description: string;
  created_at?: string;
  sequence?: number;
  max?: number;
}
let hasInitialized = false;
const Editor = (props: any) => {
  console.log(hasInitialized);
  console.log(props);
  const { target, id } = props.match.params;
  const isListItem = ['product_specification', 'product_center'].indexOf(target) === -1;
  const [data, setData] = useState({} as Data);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        try {
          await Axios.request({
            url: location.pathname,
            data: values,
            params: { is_from_api: true },
            method: props.match.params.id === 'new_item' ? 'post' : 'put'
          });
          Modal.success({
            content: '提交成功',
            okText: '知道了',
            onOk: () => {
              hi;
            }
          });

          // console.log(res);
        } catch (e) {
          alert('账号或密码错误');
        }
      }
    });
  };
  const isLoading = !!!Object.keys(data).length;
  const { getFieldDecorator } = props.form;
  const my_modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link' /*, 'image'*/],
      ['clean']
    ]
  };

  const my_formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link'
    // 'image'
  ];
  useEffect(() => {
    if (true || !hasInitialized)
      Axios.get(`${location.pathname}`, { params: { is_from_api: true } }).then(res => {
        hasInitialized = true;
        setData(res.data);
      });
  }, [target, id]);
  console.log('isLoading', isLoading);
  console.log(Moment());
  return (
    <Form onSubmit={handleSubmit} className="editor-center">
      {!isLoading && (
        <>
          {!isListItem && (
            <Form.Item label="次序">
              {getFieldDecorator('sequence', {
                rules: [{ required: true, message: '请输入次序!' }],
                initialValue:
                  id === 'new_item' ? data.max + 1 : location.search.match(/sequence=(.+)$/)[1]
              })(<InputNumber min={1} max={id == 'new_item' ? data.max + 1 : data.max} />)}
            </Form.Item>
          )}
          {isListItem && (
            <Form.Item label="创建时间">
              {getFieldDecorator('created_at', {
                initialValue: Moment(data.created_at),
                rules: [{ required: true, message: '请输入创建时间!' }]
              })(<DatePicker />)}
            </Form.Item>
          )}
          {!isListItem && (
            <Form.Item label="列表图片">
              {getFieldDecorator('image_uri', {
                rules: [{ required: true, message: '请上传列表图片!' }],
                initialValue: data.image_uri
              })(<Upload />)}
            </Form.Item>
          )}
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              initialValue: data.name || '',
              rules: [{ required: true, message: '请输入名称!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="内容">
            {getFieldDecorator('description', {
              initialValue: data.description || '',
              rules: [{ required: true, message: '请输入内容!' }]
            })(<ReactQuill modules={my_modules} formats={my_formats} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" size="large">
              提交
            </Button>

            <Button style={{ display: 'none' }} type="primary" className="login-form-button">
              删除
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default Form.create()(withRouter(Editor));
