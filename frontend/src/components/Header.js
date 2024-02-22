import React from 'react';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./header1.css";
import logo from '../images/logo-header.png'
import { Useuser } from '../context/usercontext';
const Header = () => {
  const [islogin,setlogin] = useState(1);
  
  useEffect(() => {
    const token = localStorage.getItem("uid");
    if (token == null) setlogin(0);
  }, []);

  const handleClick = (event) => {
    localStorage.removeItem('uid');
    setlogin(0);
    event.preventDefault();
  };
  return (
    <div>
  <div className="header flex sm:justify-between">
    <div className='sm:w-16'><NavLink to="/" className="logo"><img src={logo}/></NavLink></div>
    <div className="header-right">
      <NavLink className="active" to="/">Home</NavLink>
      {
        islogin ? (
          <>
          <NavLink to="/" onClick={handleClick} >logout</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">login</NavLink>
          </>
        )
      }
    </div>
  </div>
  </div>

  )
}

export default Header