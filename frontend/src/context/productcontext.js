import React, { useEffect, createContext, useState, useContext } from 'react';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [allproduct, setproduct] = useState('');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/productdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const responseData = await response.json();
        console.log(responseData)
        setproduct(responseData);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    
    fetchDataFromBackend();
    //console.log(allproduct);
  }, []);

  return (
    <ProductContext.Provider value={{ allproduct, setproduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const Useproduct = () => {
  return useContext(ProductContext);
};

export { ProductContextProvider, Useproduct };
