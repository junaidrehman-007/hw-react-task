import React, { useState,useEffect } from 'react';
import { Menu, message } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined,LogoutOutlined   } from '@ant-design/icons';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
    path: '/',
  },
  {
    label: 'Products',
    key: 'products',
    icon: <ShoppingCartOutlined />,
    path: '/products',
  },
];

const App = ({ isAuthenticated, setAuthenticated }) => {
  const [current, setCurrent] = useState('home');
  
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  
  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout');

      localStorage.removeItem('authToken'); 
      
      message.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Failed to logout');
    }
  };

  return (
    
    <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map((item) => (
        <Menu.Item key={item.key}>
          {item.icon}
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
     
        <>
          <Menu.Item style={{ marginLeft: 'auto' }} key="login">
            <UserOutlined />
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <UserOutlined />
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
    
        
        <Menu.Item key="logout" onClick={logout}>
          <LogoutOutlined   />
          
        </Menu.Item>
     
    
    </Menu>
  );
};

export default App;
