import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = () => {
    const {id} = useParams();
    const navigate = useNavigate();
  const [postData, setPostData] = useState({
    password: '',
    token : ''
  });

  const handleInputChange = (e) => {
    setPostData({ ...postData, password : e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    sendDataToServer();
  }

  const sendDataToServer = async () => {
    console.log(id)
    postData.token = id;
    setPostData(postData);
    try {
      const response = await fetch('http://localhost:5000/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json();
      if(data.message==true){
        navigate('/login')
        toast.success("Password updated", {
            autoClose: 1000,
        });
      }else{
        alert("Something went wronge");
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
      <title> Reset Password</title>
      <div className="container">
        <section className="row mt-5 text-center">
          <div className="col-md-6 m-auto">
            
            <h1 className="display-4">Reset Password</h1>
            <p className="lead">Enter your new password</p>
            <form onSubmit={handleSubmit}>
                
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="New password"
                  required
                  value={postData.password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Save
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Reset;
