import React, { useEffect, createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [alluser, setuser] = useState('');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const token = localStorage.getItem('uid');
        const decoded = jwtDecode(token);
        const email1 = {
          email : decoded.email
        };
        //console.log(decoded)
        const response = await fetch('http://localhost:5000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(email1),
        });
        const responseData = await response.json();
        
        if (responseData[0].cart.length === 0) {
          for (let i = 0; i < 110; i++) {
            responseData[0].cart[i] = 0;
          }
        }
       // console.log(typeof(responseData[0].cart))
        setuser(responseData);

      } catch (error) {
        console.error('Error decoding data', error.message);
      }
    };
    
    fetchDataFromBackend();
  }, []);

  return (
    <UserContext.Provider value={{ alluser, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

const Useuser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, Useuser };
