import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import NavigationBar from './NavigationBar';
import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import ProductList from './product/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (
    <div className="container-fluid ">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         HW TASK <code>Junaid Ur Rehman</code> 
        </p>
       
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar /> 
        <div className="container-fluid m-0 p-0">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
