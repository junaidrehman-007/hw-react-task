import React, { useState, useEffect } from 'react';
import { Button, Table, Input ,message} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Search } = Input;
  const [searchQuery, setSearchQuery] = useState('');
  const authToken = localStorage.getItem('authToken');
  console.log(authToken, 'authToken');
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = 'http://127.0.0.1:8000/api/products/list';
      const headers = {
        Authorization: `Bearer ${authToken}`, // Include the authentication token
      };
      if (searchQuery) {
        url = `http://127.0.0.1:8000/api/products/search`;
        const response = await axios.post(url, { query: searchQuery }, { headers });
        setData(response.data.data);
      } else {
        const response = await axios.get(url, { headers });
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
        message.error('Please Login.');
      } else {
        message.error('Error fetching data.');
      }
     
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-between mb-3">
        <span className="ml-2">{data.length > 0 ? `Total Items: ${data.length}` : ''}</span>
        <Search placeholder="Search" style={{ width: 200 }} onSearch={handleSearch} />
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default App;
