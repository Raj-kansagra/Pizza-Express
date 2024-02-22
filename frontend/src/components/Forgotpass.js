import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpass = () => {
    const navigate = useNavigate();
  const [postData, setPostData] = useState({
    email: '',
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
      const response = await fetch('http://localhost:5000/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json();
      if(data.message==true){
        toast.success("Reset link sent", {
            autoClose: 1000,
        });
        navigate('/')
      }else{
        alert("Email is not registered");
      }
      
      //console.log('Response from server:', data);
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
      <div className="container">
        <section className="row mt-5 text-center">
          <div className="col-md-6 m-auto">
            
            <p className="lead">A reset password link will be sent to your registered email</p>
            <form onSubmit={handleSubmit}>
            
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
              <button type="submit" className="btn btn-primary btn-block">
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Forgotpass;
