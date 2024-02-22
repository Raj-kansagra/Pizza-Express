import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { UserContextProvider } from './context/usercontext';
import { ProductContextProvider } from './context/productcontext';
import Profile from './components/Profile';
import Forgotpass from './components/Forgotpass';
import Reset from './components/Reset';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ProductContextProvider>
      <BrowserRouter>
        <div className="origin">
          <Header></Header>
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/login" Component={Login}></Route>
            <Route exact path="/forgotpassword" Component={Forgotpass}></Route>
            <Route exact path="/forgotpassword/:id" Component={Reset}></Route>
            <Route exact path="/register" Component={Register}></Route>
            <Route exact path="/cart" Component={Cart}></Route>
            <Route exact path="/profile" Component={Profile}></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer />
    </ProductContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
