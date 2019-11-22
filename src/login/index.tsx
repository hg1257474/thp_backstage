import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { render } from 'react-dom';
import 'core-js/stable';
import '@babel/runtime/regenerator';
import Axios from 'axios';
import './index.css';
const NormalLoginForm = (props: any) => {
  console.log(props);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        try {
          await Axios.post('login', values);
          location.href = 'product_center';
          // console.log(res);
        } catch (e) {
          alert('账号或密码错误');
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h1>登陆</h1>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const App = Form.create({ name: 'normal_login' })(NormalLoginForm);

render(<App />, document.querySelector('#root'));
