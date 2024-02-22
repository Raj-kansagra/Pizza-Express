import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    sendDataToServer();
  }

  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      })
      console.log(postData);

      const data = await response.json();
      if(data.message==true){
        localStorage.setItem('uid', data.uid);
        navigate('/');
        window.location.reload();
      }else{
        alert("Email is already registered");
        navigate('/register');
      }
    
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
    
  };
  
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://bootswatch.com/4/slate/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      />
      <title> Register</title>
      <div className="container">
        <section className="row mt-5 text-center ">
          <div className="col-md-6 m-auto border border-light shadow-lg rounded p-5">
      
            <h1 className="display-4">Register</h1>
            <p className="lead">Enter your details</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="name"
                  required
                  value={postData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="email"
                  required
                  value={postData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  required
                  value={postData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex justify-content-center'><button type="submit" className="btn btn-primary btn-block w-25">
                Sign Up
              </button></div>
              
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;