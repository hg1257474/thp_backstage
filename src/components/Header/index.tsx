import React from 'react';
import { useHistory } from 'react-router-dom';
// import './index.css';
import { Menu } from 'antd';
export default () => {
  const history = useHistory();
  return (
    <header>
      <Menu
        style={{ textAlign: 'center', background: 'white' }}
        mode="horizontal"
        onClick={e => history.push(e.key)}
      >
        <Menu.Item key="product_center">产品中心</Menu.Item>
        <Menu.Item key="product_specification">产品规格</Menu.Item>
        <Menu.Item key="news_center">新闻中心</Menu.Item>
        <Menu.Item key="honorary_qualification">荣誉资质</Menu.Item>
        <Menu.Item key="general_knowledge_encyclopedia">常识百科</Menu.Item>
      </Menu>
    </header>
  );
};
